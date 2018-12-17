import {Component, OnDestroy, OnInit} from '@angular/core';
import * as echarts from 'echarts';
import ECharts = echarts.ECharts;
import EChartOption = echarts.EChartOption;
import {CurrentService} from '../../../providers/current.service';
import * as lodash from 'lodash';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-current-repo-license',
  templateUrl: './current-repo-license.component.html',
  styleUrls: ['./current-repo-license.component.scss']
})
export class CurrentRepoLicenseComponent implements OnInit, OnDestroy {

  chart: ECharts;

  constructor(
    private readonly currentService: CurrentService,
    private readonly translator: TranslateService) {
  }

  ngOnInit() {
    const licenseList = this.currentService.getRepoLicenseGraph();
    const licenseAndLicenseFamilyNames: string[] = licenseList.map(val => val.name);
    const licenseFamilies: { name: string }[] = licenseList.filter(val => !val.isLicense).map(val => ({name: val.name}));
    const licenseLinks: { source: string, target: string }[] = [...licenseList.filter(val => !val.isLicense).map(val => ({
      source: 'license',
      target: val.name
    })), ...licenseList.filter(val => val.isLicense).map(val => ({source: val.category, target: val.name}))];
    const licenseValueSum = lodash.sum(licenseList.filter(val => !val.isLicense).map(val => val.value));
    const safeLog = (value: number) => Math.log2(value >= 1 ? value : 1);
    const licenseData = [{
      'name': 'license',
      'symbolSize': safeLog(licenseValueSum),
      'draggable': 'true',
      'value': licenseValueSum
    }, ...licenseList.map(val => ({
      'name': val.name,
      'symbolSize': safeLog(val.value),
      'category': val.category,
      'draggable': 'true',
      'value': val.value
    }))];
    const option = {
      title: {
        text: this.translator.instant('FUNCTION.CURRENT.REPO.LICENSE.TITLE.TEXT'),
        top: 'top',
        left: 'center',
        textStyle: {
          color:'#666'
        }
      },
      tooltip: {},
      legend: [{
        formatter: function (name) {
          return (echarts as any).format.truncateText(name, 200, '14px Microsoft Yahei', '…');
        },
        orient: 'vertical',
        textStyle: {
          color: '#666',
        },
        tooltip: {
          show: true
        },
        selectedMode: 'false',
        left: '0',
        top: '0',
        data: licenseAndLicenseFamilyNames,
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
        name: 'license',
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 150
        },
        data: licenseData,
        links: licenseLinks,
        categories: licenseFamilies,
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
    console.log(option);
    const chart = echarts.init(document.getElementById('current-repo-license-chart') as HTMLDivElement, 'light');
    chart.setOption(option as EChartOption);
    this.chart = chart;
  }

  ngOnDestroy(): void {
    this.chart.dispose();
  }

}
