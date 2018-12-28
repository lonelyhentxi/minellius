import {Component, OnDestroy, OnInit} from '@angular/core';
import * as echarts from 'echarts';
import ECharts = echarts.ECharts;
import EChartOption = echarts.EChartOption;
import {CurrentService} from '../../../providers/current.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-current-user-repo',
  templateUrl: './current-user-repo.component.html',
  styleUrls: ['./current-user-repo.component.scss']
})
export class CurrentUserRepoComponent implements OnInit, OnDestroy {

  chart: ECharts;

  constructor(
    private readonly currentService: CurrentService,
    private readonly translator: TranslateService
  ) {
  }

  async ngOnInit() {
    const title = this.translator.instant('FUNCTION.CURRENT.USER.REPO.TITLE.TEXT');
    const [labels,dataSeries] = await this.currentService.getUserRepoList();
    const option = {
      title: {
        text: title
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: [title]
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        data: labels
      },
      yAxis: {
        name: [this.translator.instant('COMMON.USER'), this.translator.instant('COMMON.NUMBER')]
          .join(this.translator.instant('COMMON.WORDSEP')),
      },
      series: [
        {
          name: title,
          type: 'line',
          data: dataSeries
        }
      ]
    };

    const chart = echarts.init(document.getElementById('current-user-repo-chart') as HTMLDivElement, 'light');
    chart.setOption(option as EChartOption);
    this.chart = chart;
  }

  ngOnDestroy(): void {
    this.chart.dispose();
  }
}
