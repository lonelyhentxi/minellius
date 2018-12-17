import {Component, OnDestroy, OnInit} from '@angular/core';
import * as echarts from 'echarts';
import 'echarts/theme/macarons';
import * as dataTool from 'echarts/extension/dataTool';

import EChartOption = echarts.EChartOption;
import ECharts = echarts.ECharts;
import {TranslateService} from '@ngx-translate/core';
import {CurrentService} from '../../../providers/current.service';

@Component({
  selector: 'app-current-repo-last-push',
  templateUrl: './current-repo-last-push.component.html',
  styleUrls: ['./current-repo-last-push.component.scss']
})
export class CurrentRepoLastPushComponent implements OnInit, OnDestroy {

  chart: ECharts;
  constructor(private readonly translator: TranslateService,
              private readonly currentService: CurrentService) {
  }

  ngOnInit() {
    const group = this.currentService.getRepoPushAtList();

    const data = dataTool.prepareBoxplotData(group);

    const me = this;
    const option = {
      title: [
        {
          text: this.translator.instant('FUNCTION.CURRENT.REPO.PUSHAT.TITLE.TEXT'),
          left: 'center',
        },
        {
          text: this.translator.instant('FUNCTION.CURRENT.REPO.PUSHAT.PROMPT.TEXT'),
          borderColor: '#999',
          borderWidth: 1,
          textStyle: {
            fontSize: 14
          },
          left: '10%',
          top: '90%'
        }
      ],
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%'
      },
      xAxis: {
        type: 'category',
        data: data.axisData.map((val, index) => {
          return `${2008 + index}`;
        }),
        boundaryGap: true,
        nameGap: 30,
        splitArea: {
          show: false
        },
        axisLabel: {
          formatter: '{value}'
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        name: this.translator.instant('FUNCTION.CURRENT.REPO.PUSHAT.YAXIS.NAME'),
        splitArea: {
          show: true
        }
      },
      series: [
        {
          name: 'boxplot',
          type: 'boxplot',
          data: data.boxData,
          tooltip: {
            formatter: function (param) {
              return [
                param.name + ': ',
                me.translator.instant('FUNCTION.CURRENT.REPO.PUSHAT.TOOLTIP.UPPER') + ': ' + param.data[5],
                'Q3: ' + param.data[4],
                me.translator.instant('FUNCTION.CURRENT.REPO.PUSHAT.TOOLTIP.MEDIAN') + ': ' + param.data[3],
                'Q1: ' + param.data[2],
                me.translator.instant('FUNCTION.CURRENT.REPO.PUSHAT.TOOLTIP.LOWER') + ': ' + param.data[1]
              ].join('<br/>');
            }
          }
        },
        {
          name: 'outlier',
          type: 'scatter',
          data: data.outliers
        }
      ]
    };

    const chart = echarts.init(document.getElementById('current-repo-last-push-chart') as HTMLDivElement, 'macarons');
    chart.setOption(option as EChartOption);
    this.chart = chart;
  }

  ngOnDestroy(): void {
    this.chart.dispose();
  }
}
