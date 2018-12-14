import {Component, OnDestroy, OnInit} from '@angular/core';
import * as echarts from 'echarts';
import EChartOption = echarts.EChartOption;
import ECharts = echarts.ECharts;
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-current-issue-comment',
  templateUrl: './current-issue-comment.component.html',
  styleUrls: ['./current-issue-comment.component.scss']
})
export class CurrentIssueCommentComponent implements OnInit, OnDestroy {

  chart: ECharts;

  constructor(private readonly translator: TranslateService) {
  }

  ngOnInit() {
    const issueComment = this.translator.instant('FUNCTION.CURRENT.ISSUE.COMMENT.PROMPT');
    const dataSeries = [['=0', 10, issueComment], ['=1', 15, issueComment], ['=2', 35, issueComment],
      ['=3', 38, issueComment], ['=4', 22, issueComment], ['=5', 16, issueComment],
      ['5-10', 7, issueComment], ['10-20', 2, issueComment], ['20-50', 17, issueComment],
      ['50+', 33, issueComment]];
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: 'rgba(0,0,0,0.2)',
            width: 1,
            type: 'solid'
          }
        }
      },
      singleAxis: {
        type: 'category',
        data:  dataSeries.map((val) => `${val[0]}`),
        top: 50,
        bottom: 50,
        axisPointer: {
          animation: true,
          label: {
            show: true
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            opacity: 0.2
          }
        }
      },
      series: [
        {
          type: 'themeRiver',
          itemStyle: {
            emphasis: {
              shadowBlur: 20,
              shadowColor: 'rgba(0, 0, 0, 0.8)'
            }
          },
          data: dataSeries.map((val,index)=>[index,val[1],val[2]])
        }
      ]
    };
    const chart = echarts.init(document.getElementById('current-issue-comment-chart') as HTMLDivElement, 'light');
    chart.setOption(option as EChartOption);
    this.chart = chart;
  }

  ngOnDestroy(): void {
    this.chart.dispose();
  }
}
