import {Component, OnDestroy, OnInit} from '@angular/core';
import {PeriodService} from '../../../providers/period.service';
import {isNil, unzip} from 'lodash';
import {debounceTime, filter, first, map, tap, withLatestFrom} from 'rxjs/operators';
import {combineLatest, Subject, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {enumDestructe} from '../../../functools/enum.functool';
import {EventType} from '../../../constants/event-type.constant';
import {shell} from 'electron';
import {NzMessageService} from 'ng-zorro-antd';
import {errorPrompt} from '../../../functools/error-prompt.functool';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-period-detail',
  templateUrl: './period-detail.component.html',
  styleUrls: ['./period-detail.component.scss']
})
export class PeriodDetailComponent implements OnInit, OnDestroy {

  name: string;
  eventTypeList = unzip(enumDestructe(EventType, false)).map(val => ({text: val[0], name: val[1]}));
  eventType: number;
  currentPage: number;
  take: number;
  loading: boolean;
  count: number;

  get skip() {
    return (this.currentPage - 1) * this.take;
  }

  displayData = [];

  get data() {
    return this.displayData;
  }

  sortTrigger$: Subject<{ key: string, value: string }> = new Subject();
  searchTrigger$: Subject<string> = new Subject();
  filterTrigger$: Subject<number> = new Subject();
  pageTrigger$: Subject<number> = new Subject();


  period$ = new Subject();
  period$$: Subscription;
  routeData$ = new Subject();
  routeData$$: Subscription;

  reSearch$$: Subscription;
  reCount$$: Subscription;

  constructor(
    private readonly periodService: PeriodService,
    private readonly route: ActivatedRoute,
    private readonly messageService: NzMessageService,
    private readonly translator: TranslateService,
  ) {
    this.currentPage = 1;
    this.take = 12;
    this.displayData = [];
    this.loading = false;
    this.count = 0;
  }

  sort(sortEntity: { key: string, value: string }) {
    this.sortTrigger$.next(sortEntity);
  }

  filter(eventType: number): void {
    this.filterTrigger$.next(eventType);
  }


  searchName(name: string): void {
    this.searchTrigger$.next(name === '' ? undefined : name);
  }

  changPage(target: number) {
    this.currentPage = target;
    this.pageTrigger$.next(target);
  }

  reSearch(query) {
    const me = this;
    this.loading = true;
    const transformed = this.periodService.transformQuery(query.slice(1, query.length), this.skip, this.take);
    const searchRes$$ = this.periodService.find(transformed).pipe(first()).subscribe((data) => {
      me.displayData = data;
      me.loading = false;
      searchRes$$.unsubscribe();
    }, error => {
      me.messageService.warning(errorPrompt(me.translator, error));
      me.loading = false;
      searchRes$$.unsubscribe();
    });
  }


  reCount(query) {
    const me = this;
    this.loading = true;
    const transformed = this.periodService.transformQuery(query,this.skip,this.take);
    const countRes$$ = this.periodService.count(transformed).pipe(first()).subscribe((count) => {
      me.count = count;
      me.loading = false;
      countRes$$.unsubscribe();
    }, error => {
      me.messageService.warning(errorPrompt(me.translator, error));
      me.loading = false;
      countRes$$.unsubscribe();
    });
  }

  subjectsInit() {
    const snapshotData = this.route.snapshot.data;
    this.routeData$.next(snapshotData);
    this.period$.next(this.route.snapshot.queryParamMap);
    this.sortTrigger$.next({key: 'period', value: 'no'});
    this.searchTrigger$.next(undefined);
    this.filterTrigger$.next(undefined);
  }

  ngOnInit() {
    const me = this;
    this.routeData$$ = this.route.data.subscribe(this.routeData$);
    this.period$$ = this.route.queryParamMap.subscribe(this.period$);
    const period$ = this.period$.pipe(map(val => {
      return val['params']['period'];
    }));
    const entityType$ = this.routeData$.pipe(map(val => val['entityType']),
      withLatestFrom(me.routeData$.pipe(filter(val => !isNil(val['entityType'])))), map((lst) => lst[1]['entityType'])
    );
    this.reCount$$ = combineLatest(period$, entityType$, me.sortTrigger$, me.searchTrigger$, me.filterTrigger$)
      .pipe(debounceTime(300), tap((query) => me.reCount(query)))
      .subscribe(() => me.changPage(1));
    this.reSearch$$ = me.pageTrigger$
      .pipe(withLatestFrom(period$, entityType$, me.sortTrigger$, me.searchTrigger$, me.filterTrigger$), debounceTime(100))
      .subscribe((query) => me.reSearch(query));
    this.subjectsInit();
  }

  ngOnDestroy(): void {
    this.routeData$$.unsubscribe();
    this.reSearch$$.unsubscribe();
    this.reCount$$.unsubscribe();
    this.period$$.unsubscribe();
  }

  openExternal(url: string): void {
    shell.openExternal(url);
  }

}
