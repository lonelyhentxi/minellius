import {Component, OnDestroy, OnInit} from '@angular/core';
import * as echarts from 'echarts';
import ECharts = echarts.ECharts;
import EChartOption = echarts.EChartOption;
import {TranslateService} from '@ngx-translate/core';
import {sum, max} from 'lodash';
import {CurrentService} from '../../../providers/current.service';

@Component({
  selector: 'app-current-repo-star',
  templateUrl: './current-repo-star.component.html',
  styleUrls: ['./current-repo-star.component.scss']
})
export class CurrentRepoStarComponent implements OnInit, OnDestroy {

  chart: ECharts;

  constructor(
    private readonly translator: TranslateService,
    private readonly currentService: CurrentService,
  ) {
  }

  async ngOnInit() {
    const {dataAxis, dataSeries} = await this.currentService.getRepoStarList();

    const option = {
      title: {
        text: this.translator.instant('FUNCTION.CURRENT.REPO.STAR.TITLE.TEXT'),
        textStyle: {
          color: '#666'
        }
      },
      xAxis: {
        data: dataAxis,
        name: [this.translator.instant('COMMON.STAR'), this.translator.instant('COMMON.NUMBER')]
          .join(this.translator.instant('COMMON.WORDSEP')),
        axisLabel: {
          inside: false,
          textStyle: {
            color: '#444'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      },
      yAxis: {
        type: 'log',
        name: 'log ' +
          [this.translator.instant('COMMON.REPO'), this.translator.instant('COMMON.NUMBER')]
            .join(this.translator.instant('COMMON.WORDSEP')),
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#999'
          }
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}'
      },
      series: [
        {
          type: 'bar',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#83bff6'},
                  {offset: 0.5, color: '#188df0'},
                  {offset: 1, color: '#188df0'}
                ]
              )
            },
            emphasis: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#2378f7'},
                  {offset: 0.7, color: '#2378f7'},
                  {offset: 1, color: '#83bff6'}
                ]
              )
            }
          },
          data: dataSeries
        }
      ]
    };
    const chart = echarts.init(document.getElementById('current-repo-star-chart') as HTMLDivElement, 'light');
    chart.setOption(option as EChartOption);
    this.chart = chart;
  }

  ngOnDestroy(): void {
    this.chart.dispose();
  }

}
