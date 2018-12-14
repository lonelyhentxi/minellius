import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrentService} from '../../../providers/current.service';
import {Chart, Frame, Stat} from 'g2';
import * as worldMap from 'assets/geo/world.geo.json';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-current-area',
  templateUrl: './current-user-location.component.html',
  styleUrls: ['./current-user-location.component.scss']
})
export class CurrentUserLocationComponent implements OnInit, OnDestroy {

  chart: Chart;

  constructor(private readonly currentService: CurrentService, private readonly translator: TranslateService) {

  }

  setWorldMapOption(chart: Chart) {
    /*
      create background layer
     */
    const nationTranslation = this.translator.instant('COMMON.NATION');
    const userTranslation = this.translator.instant('COMMON.USER');
    const worldMapData = (<any>worldMap).default;
    const map = [];
    (<{ properties: { name: string } }[]>worldMapData['features']).forEach(({properties: {name}}) => {
      map.push({name: name});
    });
    chart.tooltip({
      title: null,
    });
    chart.legend(false);
    const view = chart.createView();
    view.source(map);
    view.tooltip(false);
    view.polygon().position(Stat.map.region('name', worldMapData)).shape('stroke').style({
      fill: '#fff',
      stroke: '#ccc',
      lineWidth: 1
    });
    /*
      create custom layer
     */
    const frame = new Frame(this.currentService.getAreaInfo());
    frame.addCol('nation', obj => this.translator.instant('GEO.NATIONS.' + obj['name']));
    const userView = chart.createView();
    userView.source(frame, {
      'nation': {
        type: 'cat',
        alias: nationTranslation,
      },
      'value':{
        type: 'linear',
        alias: userTranslation,
      }
    });
    userView.polygon()
      .position(Stat.map.region('name*value', worldMapData))
      .color('value')
      .opacity('value')
      .tooltip('nation*value');
  }

  ngOnInit() {
    const chart = new Chart({
      id: 'current-user-location',
      width: 1020,
      height: 552,
      syncXYScales: true,
      margin: [0, 0]
    });
    this.setWorldMapOption(chart);
    chart.render();
    this.chart = chart;
  }

  ngOnDestroy(): void {
    this.chart.destroy();
  }
}
