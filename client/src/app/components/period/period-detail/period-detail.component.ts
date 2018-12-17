import {Component, OnDestroy, OnInit} from '@angular/core';
import {PeriodService} from '../../../providers/period.service';
import {isNil, unzip} from 'lodash';
import {debounceTime, filter, map, tap, withLatestFrom} from 'rxjs/operators';
import {combineLatest, Subject, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {enumDestructe} from '../../../functools/enum.functool';
import {EventType} from '../../../constants/event-type.constant';

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
  knownPages: number;

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

  routeData$ = new Subject();

  routeData$$: Subscription;

  reSearch$$: Subscription;
  reCount$$: Subscription;
  searchRes$$: Subscription;

  constructor(
    private readonly periodService: PeriodService,
    private readonly route: ActivatedRoute,
  ) {
    this.currentPage = 1;
    this.take = 12;
    this.displayData = [];
    this.loading = false;
    this.knownPages = 1;
  }

  sort(sortEntity: { key: string, value: string }) {
    this.sortTrigger$.next(sortEntity);
  }

  filter(eventType: number): void {
    this.filterTrigger$.next(eventType);
  }


  searchName(name: string): void {
    this.searchTrigger$.next(name);
  }

  changPage(target: number) {
    this.loading = true;
    this.currentPage = target;
    this.pageTrigger$.next(target);
  }

  maybePages() {
    if (this.currentPage === this.knownPages && this.displayData.length === this.take) {
      return this.knownPages + 1;
    } else {
      return this.knownPages;
    }
  }

  reSearch(query) {
    if (this.searchRes$$) {
      this.searchRes$$.unsubscribe();
    }
    const me = this;
    const transformed = this.periodService.transformQuery(query.slice(1, query.length), this.skip, this.take);
    this.searchRes$$ = this.periodService.find(transformed).subscribe((data) => {
      me.displayData = data;
      if (me.maybePages() > me.knownPages) {
        me.knownPages += 1;
      }
      this.loading = false;
    });
  }

  changeAspect() {
    this.knownPages = 1;
  }

  subjectsInit() {
    const snapshotData = this.route.snapshot.data;
    this.routeData$.next(snapshotData);
    this.sortTrigger$.next({key: 'period', value: 'descend'});
    this.searchTrigger$.next(undefined);
    this.filterTrigger$.next(undefined);
  }

  ngOnInit() {
    const me = this;
    this.routeData$$ = this.route.data.subscribe(this.routeData$);
    const period$ = this.routeData$.pipe(
      map(data => {
        console.log(data);
        return data['period'];
      }));
    const entityType$ = this.routeData$.pipe(map(val => val['entityType']),
      withLatestFrom(this.routeData$.pipe(filter(val => !isNil(val['entityType'])))), map((lst) => lst[1]['entityType'])
    );
    this.reCount$$ = combineLatest(period$, entityType$, me.sortTrigger$, me.searchTrigger$, me.filterTrigger$)
      .pipe(debounceTime(300), tap((opt) => me.changeAspect()))
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
    if (this.searchRes$$) {
      this.searchRes$$.unsubscribe();
    }
  }

}
