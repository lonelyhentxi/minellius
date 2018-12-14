import {Component, OnDestroy, OnInit} from '@angular/core';
import * as echarts from 'echarts';
import ECharts = echarts.ECharts;
import EChartOption = echarts.EChartOption;

@Component({
  selector: 'app-current-repo-license',
  templateUrl: './current-repo-license.component.html',
  styleUrls: ['./current-repo-license.component.scss']
})
export class CurrentRepoLicenseComponent implements OnInit, OnDestroy {

  chart: ECharts;

  constructor() {
  }

  ngOnInit() {
    const option = {
      title: {
        text: '三国演义中人名出现次数排名',
        subtext: 'ZBH',
        top: 'top',
        left: 'center'
      },
      tooltip: {},
      legend: [{
        formatter: function (name) {
          return (echarts as any).format.truncateText(name, 40, '14px Microsoft Yahei', '…');
        },
        tooltip: {
          show: true
        },
        selectedMode: 'false',
        bottom: 20,
        data: ['刘备2239', '诸葛亮1892', '曹操979', '关羽948', '张飞408', '赵云393', '孙权390', '吕布384', '周瑜328', '魏延327']
      }],
      toolbox: {
        show: true,
        feature: {
          dataView: {
            show: true,
            readOnly: true
          },
          restore: {
            show: true
          },
          saveAsImage: {
            show: true
          }
        }
      },
      animationDuration: 3000,
      animationEasingUpdate: 'quinticInOut',
      series: [{
        name: '三国演义',
        type: 'graph',
        layout: 'force',

        force: {
          repulsion: 300
        },
        data: [{
          'name': '三国演义',
          // "x": 0,
          // y: 0,
          'symbolSize': 150,
          'draggable': 'true',
          'value': 27

        }, {
          'name': '刘备2239',
          'value': 15,
          'symbolSize': 80,
          'category': '刘备2239',
          'draggable': 'true'
        }, {
          'name': '使君70',
          'symbolSize': 3,
          'category': '刘备2239',
          'draggable': 'true',
          'value': 1
        }, {
          'name': '玄德1770',
          'symbolSize': 60,
          'category': '刘备2239',
          'draggable': 'true',
          'value': 1
        }, {
          'name': '皇叔112',
          'symbolSize': 15,
          'category': '刘备2239',
          'draggable': 'true',
          'value': 1
        }, {
          'name': '诸葛亮1892',
          'value': 60,
          'symbolSize': 60,
          'category': '诸葛亮1892',
          'draggable': 'true'
        }, {
          'name': '孔明1643',
          'symbolSize': 50,
          'category': '诸葛亮1892',
          'draggable': 'true',
          'value': 1
        }, {
          'name': '卧龙40',
          'symbolSize': 3,
          'category': '诸葛亮1892',
          'draggable': 'true',
          'value': 1
        }, {
          'name': '曹操979',
          'value': 5,
          'symbolSize': 40,
          'category': '曹操979',
          'draggable': 'true'
        }, {
          'name': '孟德29',
          'symbolSize': 3,
          'category': '曹操979',
          'draggable': 'true',
          'value': 1
        }, {
          'name': '曹公44',
          'symbolSize': 7,
          'category': '曹操979',
          'draggable': 'true',
          'value': 1
        }, {
          'name': '关羽948',
          'value': 40,
          'symbolSize': 18,
          'category': '关羽948',
          'draggable': 'true'
        }, {
          'name': '云长431',
          'symbolSize': 20,
          'category': '关羽948',
          'draggable': 'true',
          'value': 1
        }, {
          'name': '关公508',
          'symbolSize': 25,
          'category': '关羽948',
          'draggable': 'true',
          'value': 1
        }, {
          'name': '张飞408',
          'value': 8,
          'symbolSize': 25,
          'category': '张飞408',
          'draggable': 'true'
        }, {
          'name': '翼德55',
          'symbolSize': 5,
          'category': '张飞408',
          'draggable': 'true',
          'value': 1
        }, {
          'name': '赵云393',
          'value': 5,
          'symbolSize': 30,
          'category': '赵云393',
          'draggable': 'true'
        }, {
          'name': '子龙95',
          'symbolSize': 7,
          'category': '赵云393',
          'draggable': 'true',
          'value': 1
        }, {
          'name': '孙权390',
          'value': 30,
          'symbolSize': 30,
          'category': '孙权390',
          'draggable': 'true'
        }, {
          'name': '仲谋10',
          'symbolSize': 3,
          'category': '孙权390',
          'draggable': 'true',
          'value': 1
        }, {
          'name': '吴侯72',
          'symbolSize': 10,
          'category': '孙权390',
          'draggable': 'true',
          'value': 1
        }, {
          'name': '吕布384',
          'value': 20,
          'symbolSize': 30,
          'category': '吕布384',
          'draggable': 'true'
        }, {
          'name': '奉先15',
          'symbolSize': 3,
          'category': '吕布384',
          'draggable': 'true',
          'value': 1
        }, {
          'name': '温侯12',
          'symbolSize': 3,
          'category': '吕布384',
          'draggable': 'true',
          'value': 1
        }, {
          'name': '周瑜328',
          'value': 6,
          'symbolSize': 18,
          'category': '周瑜328',
          'draggable': 'true'
        }, {
          'name': '公瑾60',
          'symbolSize': 5,
          'category': '周瑜328',
          'draggable': 'true',
          'value': 1
        }, {
          'name': '周郎35',
          'symbolSize': 3,
          'category': '周瑜328',
          'draggable': 'true',
          'value': 1
        }, {
          'name': '魏延327',
          'value': 6,
          'symbolSize': 18,
          'category': '魏延327',
          'draggable': 'true'
        }, {
          'name': '文长12',
          'symbolSize': 3,
          'category': '魏延327',
          'draggable': 'true',
          'value': 1

        }],
        links: [{
          'source': '三国演义',
          'target': '刘备2239'
        }, {
          'source': '刘备2239',
          'target': '使君70'
        }, {
          'source': '刘备2239',
          'target': '玄德1770'
        }, {
          'source': '刘备2239',
          'target': '皇叔112'
        }, {
          'source': '三国演义',
          'target': '诸葛亮1892'
        }, {
          'source': '诸葛亮1892',
          'target': '孔明1643'
        }, {
          'source': '诸葛亮1892',
          'target': '卧龙40'
        }, {
          'source': '三国演义',
          'target': '曹操979'
        }, {
          'source': '曹操979',
          'target': '孟德29'
        }, {
          'source': '曹操979',
          'target': '曹公44'
        }, {
          'source': '三国演义',
          'target': '关羽948'
        }, {
          'source': '关羽948',
          'target': '云长431'
        }, {
          'source': '关羽948',
          'target': '关公508'
        }, {
          'source': '三国演义',
          'target': '张飞408'
        }, {
          'source': '张飞408',
          'target': '翼德55'
        }, {
          'source': '三国演义',
          'target': '赵云393'
        }, {
          'source': '赵云393',
          'target': '子龙95'
        }, {
          'source': '三国演义',
          'target': '孙权390'
        }, {
          'source': '孙权390',
          'target': '仲谋10'
        }, {
          'source': '孙权390',
          'target': '吴侯72'
        }, {
          'source': '三国演义',
          'target': '吕布384'
        }, {
          'source': '吕布384',
          'target': '奉先15'
        }, {
          'source': '吕布384',
          'target': '温侯12'
        }, {
          'source': '三国演义',
          'target': '周瑜328'
        }, {
          'source': '周瑜328',
          'target': '公瑾60'
        }, {
          'source': '周瑜328',
          'target': '周郎35'
        }, {
          'source': '三国演义',
          'target': '魏延327'
        }, {
          'source': '魏延327',
          'target': '文长12'
        }, {
          'source': '三国演义',
          'target': '法学院'

        }],
        categories: [{
          'name': '刘备2239'
        }, {
          'name': '诸葛亮1892'
        }, {
          'name': '曹操979'
        }, {
          'name': '关羽948'
        }, {
          'name': '张飞408'
        }, {
          'name': '赵云393'
        }, {
          'name': '孙权390'
        }, {
          'name': '吕布384'
        }, {
          'name': '周瑜328'
        }, {
          'name': '魏延327'
        }, {}],
        focusNodeAdjacency: true,
        roam: true,
        label: {
          normal: {

            show: true,
            position: 'top',

          }
        },
        lineStyle: {
          normal: {
            color: 'source',
            curveness: 0,
            type: 'solid'
          }
        }
      }]
    };
    const chart = echarts.init(document.getElementById('current-repo-license-chart') as HTMLDivElement,'light');
    chart.setOption(option as EChartOption);
    this.chart = chart;
  }

  ngOnDestroy(): void {
    this.chart.dispose();
  }

}
