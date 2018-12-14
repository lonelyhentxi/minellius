import {Component, OnDestroy, OnInit} from '@angular/core';
import * as echarts from 'echarts';
import ECharts = echarts.ECharts;
import EChartOption = echarts.EChartOption;
import 'echarts/theme/macarons';

@Component({
  selector: 'app-current-user-follower',
  templateUrl: './current-user-follower.component.html',
  styleUrls: ['./current-user-follower.component.scss']
})
export class CurrentUserFollowerComponent implements OnInit, OnDestroy {

  chart: ECharts;

  constructor() {
  }

  ngOnInit() {
    const option = {
      angleAxis: {
        interval: 1,
        type: 'category',
        data: ['喀什市',
          '疏附县',
          '疏勒县',
          '英吉沙县',
          '泽普县',
          '岳普湖县',
          '巴楚县',
          '伽师县',
          '叶城县',
          '莎车县 ',
        ],
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
        min: 0,
        max: 100,
        interval: 20,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#00c7ff',
            width: 1,
            type: 'solid'
          },
        },
        axisLabel: {
          formatter: '{value} %',
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
      polar: {},
      series: [{
        type: 'bar',
        data: [{
          value: 87,
          itemStyle: {
            normal: {
              color: '#f54d4d'
            }
          }
        },
          {
            value: 80,
            itemStyle: {
              normal: {
                color: '#f87544'
              }
            }
          },
          {
            value: 75,
            itemStyle: {
              normal: {
                color: '#ffae00'
              }
            }
          },
          {
            value: 69,
            itemStyle: {
              normal: {
                color: '#dcff00'
              }
            }
          },
          {
            value: 63,
            itemStyle: {
              normal: {
                color: '#25d053'
              }
            }
          },
          {
            value: 54,
            itemStyle: {
              normal: {
                color: '#01fff5'
              }
            }
          },
          {
            value: 47,
            itemStyle: {
              normal: {
                color: '#007cff'
              }
            }
          },
          {
            value: 40,
            itemStyle: {
              normal: {
                color: '#4245ff'
              }
            }
          },
          {
            value: 35,
            itemStyle: {
              normal: {
                color: '#c32eff'
              }
            }
          },
          {
            value: 33,
            itemStyle: {
              normal: {
                color: '#ff62e8'
              }
            }
          }
        ],
        coordinateSystem: 'polar',
      }],
    };
    const chart = echarts.init(document.getElementById('current-user-follower-chart') as HTMLDivElement,'macarons');
    chart.setOption(option as EChartOption);
    this.chart = chart;
  }

  ngOnDestroy(): void {
    this.chart.dispose();
  }
}
