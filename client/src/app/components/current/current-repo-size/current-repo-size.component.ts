import {Component, OnDestroy, OnInit} from '@angular/core';
import * as echarts from 'echarts';
import ECharts = echarts.ECharts;
import 'echarts/theme/macarons';
import EChartOption = echarts.EChartOption;
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-current-repo-size',
  templateUrl: './current-repo-size.component.html',
  styleUrls: ['./current-repo-size.component.scss']
})
export class CurrentRepoSizeComponent implements OnInit, OnDestroy {

  chart: ECharts;

  constructor(private readonly translator:TranslateService) {
  }

  ngOnInit() {
    const dataSeries = [{value: 59313181, name: '0-10kB'},
      {value: 7020712, name: '10KB-100KB'},
      {value: 58615764, name: '100KB-1MB'},
      {value: 30636791, name: '1MB-10MB'},
      {value: 33447169, name: '10MB-100MB'},
      {value: 5508258, name: '100MB+'}];
    const upper = Math.max(...dataSeries.map(val => val.value));
    const option = {
      title: {
        text: this.translator.instant('FUNCTION.CURRENT.REPO.SIZE.TITLE.TEXT'),
        left:'40%',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
      },
      toolbox: {
        feature: {
          dataView: {readOnly: false},
          restore: {},
          saveAsImage: {}
        }
      },
      legend: {
        bottom: '0%',
        data: dataSeries.map(val => val.name)
      },
      calculable: true,
      series: [
        {
          name: this.translator.instant('FUNCTION.CURRENT.REPO.SIZE.TITLE.TEXT'),
          type: 'funnel',
          left: '10%',
          top: 60,
          bottom: 60,
          width: '80%',
          min: 0,
          max: upper,
          minSize: '0%',
          maxSize: '100%',
          sort: 'none',
          gap: 2,
          label: {
            normal: {
              show: true,
              position: 'inside'
            },
            emphasis: {
              textStyle: {
                fontSize: 20
              }
            }
          },
          labelLine: {
            normal: {
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              },
              position: 'bottom'
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#fff',
              borderWidth: 1
            }
          },
          data: dataSeries
        }
      ]
    };
    const chart = echarts.init(document.getElementById('current-repo-size-chart') as HTMLDivElement, 'macarons');
    chart.setOption(option as EChartOption);
    this.chart = chart;
  }


  ngOnDestroy(): void {
    this.chart.dispose();
  }

}
