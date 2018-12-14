import {Component, OnDestroy, OnInit} from '@angular/core';
import * as echarts from 'echarts';
import ECharts = echarts.ECharts;
import EChartOption = echarts.EChartOption;

@Component({
  selector: 'app-current-user-repo',
  templateUrl: './current-user-repo.component.html',
  styleUrls: ['./current-user-repo.component.scss']
})
export class CurrentUserRepoComponent implements OnInit, OnDestroy {

  chart: ECharts;

  constructor() { }

  ngOnInit() {
    const option = {
      title: {
        text: 'Step Line'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data:['Step Start']
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
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name:'Step Start',
          type:'line',
          step: 'start',
          data:[120, 132, 101, 134, 90, 230, 210]
        }
      ]
    };

    const chart = echarts.init(document.getElementById('current-user-repo-chart') as HTMLDivElement,'light');
    chart.setOption(option as EChartOption);
    this.chart = chart;
  }

  ngOnDestroy(): void {
    this.chart.dispose();
  }
}
