import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentService {

  constructor() {
  }

  /**
   * TODO: Mock Data of locations.
   */
  getAreaInfo(): { name: string, value: number }[] {
    return [
      {name: 'Russia', value: 86.8},
      {name: 'China', value: 106.3},
      {name: 'Japan', value: 94.7},
      {name: 'Mongolia', value: 98},
      {name: 'Canada', value: 98.4},
      {name: 'United Kingdom', value: 97.2},
      {name: 'United States of America', value: 98.3},
      {name: 'Brazil', value: 96.7},
      {name: 'Argentina', value: 95.8},
      {name: 'Algeria', value: 101.3},
      {name: 'France', value: 94.8},
      {name: 'Germany', value: 96.6},
      {name: 'Ukraine', value: 86.3},
      {name: 'Egypt', value: 102.1},
      {name: 'South Africa', value: 101.3},
      {name: 'India', value: 107.6},
      {name: 'Australia', value: 99.9},
      {name: 'Saudi Arabia', value: 130.1},
      {name: 'Afghanistan', value: 106.5},
      {name: 'Kazakhstan', value: 93.4},
      {name: 'Indonesia', value: 101.4}
    ];
  }

  getRepoLang() {
    const seriesData = [{
      name: 'ActionScript',
      value: 20136,
    }, {
      name: 'C',
      value: 556037
    }, {
      name: 'C#',
      value: 747297
    }, {
      name: 'C++',
      value: 685144
    }, {
      name: 'Clojure',
      value: 41756
    }, {
      name: 'CoffeeScript',
      value: 50030
    }, {
      name: 'Haskell',
      value: 51863
    }, {
      name: 'HTML',
      value: 1309803
    }, {
      name: 'css',
      value: 956739
    }, {
      name: 'GO',
      value: 162324
    }, {
      name: 'JAVA',
      value: 2040326
    }, {
      name: 'JavaScript',
      value: 3150120
    }, {
      name: 'MATLAB',
      value: 76358
    }, {
      name: 'Python',
      value: 1656976
    }, {
      name: 'R',
      value: 183402
    }, {
      name: 'Ruby',
      value: 1039552
    }, {
      name: 'Scala',
      value: 66643
    }, {
      name: 'PHP',
      value: 1173212
    }, {
      name: 'Lua',
      value: 65747
    }, {
      name: 'Objective-C',
      value: 300059
    }, {
      name: 'Perl',
      value: 107172
    }, {
      name: 'Shell',
      value: 466976
    }, {
      name: 'Swift',
      value: 250352,
    }, {
      name: 'Tex',
      value: 63995,
    }, {
      name: 'Typescript',
      value: 117621
    },{
      name: 'Rust',
      value: 27512
    }, {
      name: 'other',
      value: 2139840
    }];
    return {
      seriesData: seriesData,
      legendData: seriesData.map(val=>val.name),
      selected: [seriesData.map(()=>true)],
    };
  }

  getUserLang() {
    const seriesData = [{
      name: 'ActionScript',
      value: 20136,
    }, {
      name: 'C',
      value: 556037
    }, {
      name: 'C#',
      value: 747297
    }, {
      name: 'C++',
      value: 685144
    }, {
      name: 'Clojure',
      value: 41756
    }, {
      name: 'CoffeeScript',
      value: 50030
    }, {
      name: 'Haskell',
      value: 51863
    }, {
      name: 'HTML',
      value: 1309803
    }, {
      name: 'css',
      value: 956739
    }, {
      name: 'GO',
      value: 162324
    }, {
      name: 'JAVA',
      value: 2040326
    }, {
      name: 'JavaScript',
      value: 3150120
    }, {
      name: 'MATLAB',
      value: 76358
    }, {
      name: 'Python',
      value: 1656976
    }, {
      name: 'R',
      value: 183402
    }, {
      name: 'Ruby',
      value: 1039552
    }, {
      name: 'Scala',
      value: 66643
    }, {
      name: 'PHP',
      value: 1173212
    }, {
      name: 'Lua',
      value: 65747
    }, {
      name: 'Objective-C',
      value: 300059
    }, {
      name: 'Perl',
      value: 107172
    }, {
      name: 'Shell',
      value: 466976
    }, {
      name: 'Swift',
      value: 250352,
    }, {
      name: 'Tex',
      value: 63995,
    }, {
      name: 'Typescript',
      value: 117621
    },{
      name: 'Rust',
      value: 27512
    }, {
      name: 'other',
      value: 2139840
    }];
    return {
      seriesData: seriesData,
      legendData: seriesData.map(val=>val.name),
      selected: [seriesData.map(()=>true)],
    };
  }
}
