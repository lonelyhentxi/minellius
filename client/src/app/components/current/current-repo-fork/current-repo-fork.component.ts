import {Component, OnDestroy, OnInit} from '@angular/core';
import * as echarts from 'echarts';
import ECharts = echarts.ECharts;
import EChartOption = echarts.EChartOption;
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-current-repo-fork',
  templateUrl: './current-repo-fork.component.html',
  styleUrls: ['./current-repo-fork.component.scss']
})
export class CurrentRepoForkComponent implements OnInit, OnDestroy {

  chart: ECharts;

  constructor(private readonly translator: TranslateService) { }

  ngOnInit() {
    const dataAxis = ['0', '1-2', '2-5', '5-10', '10-10^2', '10^2+'];
    const data = [220, 182, 191, 234, 290, 330];
    const yMax = 500;
    const dataShadow = [];

    for (let i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }

    const option = {
      title: {
        text: this.translator.instant('FUNCTION.CURRENT.REPO.FORK.TITLE.TEXT'),
        textStyle: {
          color: '#666'
        }
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: false,
          textStyle: {
            color: '#666'
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
      series: [
        { // For shadow
          type: 'bar',
          itemStyle: {
            normal: {color: 'rgba(0,0,0,0.05)'}
          },
          barGap:'-100%',
          barCategoryGap:'40%',
          data: dataShadow,
          animation: false
        },
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
          data: data
        }
      ]
    };
    const chart = echarts.init(document.getElementById('current-repo-fork-chart') as HTMLDivElement,'light');
    chart.setOption(option as EChartOption);
    this.chart = chart;
  }

  ngOnDestroy(): void {
    this.chart.dispose();
  }

}
