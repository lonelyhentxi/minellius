import {Component, OnDestroy, OnInit} from '@angular/core';
import * as echarts from 'echarts';
import ECharts = echarts.ECharts;
import EChartOption = echarts.EChartOption;
import 'echarts/theme/macarons';
import {CurrentService} from '../../../providers/current.service';
import * as lodash from 'lodash';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-current-user-follower',
  templateUrl: './current-user-follower.component.html',
  styleUrls: ['./current-user-follower.component.scss']
})
export class CurrentUserFollowerComponent implements OnInit, OnDestroy {

  chart: ECharts;

  constructor(
    private readonly currentService: CurrentService,
    private readonly translator: TranslateService
  ) {
  }

  async ngOnInit() {
    const followerList = await this.currentService.getUserFollowerList();
    const labels = followerList.map(val => val.name);
    const dataSeries = followerList.map(val => ({
      value: val.value
    }));
    const option = {
      title: {
        text: this.translator.instant('FUNCTION.CURRENT.USER.FOLLOWER.TITLE.TEXT')
      },
      angleAxis: {
        interval: 1,
        type: 'category',
        data: labels,
        z: 10,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#00c7ff',
            width: 1,
            type: 'solid'
          },
        },
        axisLabel: {
          interval: 0,
          show: true,
          color: '#00c7ff',
          margin: 8,
          fontSize: 16
        },
      },
      radiusAxis: {
        name: this.translator.instant('FUNCTION.CURRENT.USER.FOLLOWER.RADIUSAXIS.TEXT'),
        axisLine: {
          show: true,
          lineStyle: {
            color: '#00c7ff',
            width: 1,
            type: 'solid'
          },
        },
        type: 'log',
        axisLabel: {
          formatter: '{value}',
          show: true,
          padding: [0, 0, 20, 0],
          color: '#00c7ff',
          fontSize: 16
        },
        splitLine: {
          lineStyle: {
            color: '#00c7ff',
            width: 1,
            type: 'solid'
          }
        }
      },
      tooltip: {
        formatter: '{b}: {c}'
      },
      polar: {},
      series: [{
        type: 'bar',
        data: dataSeries,
        coordinateSystem: 'polar',
      }],
    };
    const chart = echarts.init(document.getElementById('current-user-follower-chart') as HTMLDivElement, 'macarons');
    chart.setOption(option as EChartOption);
    this.chart = chart;
  }

  ngOnDestroy(): void {
    this.chart.dispose();
  }
}
