import {Component, OnDestroy, OnInit} from '@angular/core';
import * as echarts from 'echarts';
import 'echarts/theme/infographic';

import EChartOption = echarts.EChartOption;
import ECharts = echarts.ECharts;
import {CurrentService} from '../../../providers/current.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-current-repo-lang',
  templateUrl: './current-repo-lang.component.html',
  styleUrls: ['./current-repo-lang.component.scss']
})
export class CurrentRepoLangComponent implements OnInit, OnDestroy {

  chart: ECharts;

  constructor(
    private readonly currentService: CurrentService,
    private readonly translator: TranslateService) {
  }

  async ngOnInit() {
    const data = await this.currentService.getRepoLang();

    const option = {
      title: {
        text: this.translator
          .instant('FUNCTION.CURRENT.REPO.LANG.TITLE.TEXT'),
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: data.legendData,
        selected: data.selected
      },
      series: [
        {
          name: this.translator.instant('COMMON.LANG'),
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: data.seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    const chart = echarts.init(
      document.getElementById('current-repo-lang-chart') as HTMLDivElement,
      'infographic'
    );
    chart.setOption(option as EChartOption);
    this.chart = chart;
  }

  ngOnDestroy(): void {
    this.chart.dispose();
  }
}
