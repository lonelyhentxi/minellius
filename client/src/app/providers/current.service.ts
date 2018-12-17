import {Injectable} from '@angular/core';
import * as lodash from 'lodash';
import {type} from 'os';

@Injectable({
  providedIn: 'root'
})
export class CurrentService {

  constructor() {
  }

  private transformFormatDateMap(dateMap: { [key: string]: number }): (number[])[] {
    return Object.values(lodash.groupBy(Object.entries(dateMap), val => val[0].slice(0, 4)))
      .map((year: [string, number][]) => year.map(month => month[1])
      );
  }

  getRepoCreateAtList(): (number[])[] {
    const createatMap = {
      '2008-01-01': 54,
      '2008-02-01': 336,
      '2008-03-01': 764,
      '2008-04-01': 1329,
      '2008-05-01': 1527,
      '2008-06-01': 1680,
      '2008-07-01': 1793,
      '2008-08-01': 2122,
      '2008-09-01': 2449,
      '2008-10-01': 2825,
      '2008-11-01': 3202,
      '2008-12-01': 4169,
      '2009-01-01': 5261,
      '2009-02-01': 5663,
      '2009-03-01': 6305,
      '2009-04-01': 6428,
      '2009-05-01': 6890,
      '2009-06-01': 6359,
      '2009-07-01': 6749,
      '2009-08-01': 7028,
      '2009-09-01': 7635,
      '2009-10-01': 8521,
      '2009-11-01': 9235,
      '2009-12-01': 9387,
      '2010-01-01': 11181,
      '2010-02-01': 11823,
      '2010-03-01': 13883,
      '2010-04-01': 12971,
      '2010-05-01': 13415,
      '2010-06-01': 14144,
      '2010-07-01': 15037,
      '2010-08-01': 17113,
      '2010-09-01': 19171,
      '2010-10-01': 25420,
      '2010-11-01': 23945,
      '2010-12-01': 22570,
      '2011-01-01': 27931,
      '2011-02-01': 30278,
      '2011-03-01': 34324,
      '2011-04-01': 34642,
      '2011-05-01': 37283,
      '2011-06-01': 39286,
      '2011-07-01': 39340,
      '2011-08-01': 42330,
      '2011-09-01': 47175,
      '2011-10-01': 48263,
      '2011-11-01': 51998,
      '2011-12-01': 49112,
      '2012-01-01': 60420,
      '2012-02-01': 68581,
      '2012-03-01': 75915,
      '2012-04-01': 76452,
      '2012-05-01': 79829,
      '2012-06-01': 79913,
      '2012-07-01': 116324,
      '2012-08-01': 93077,
      '2012-09-01': 100129,
      '2012-10-01': 117656,
      '2012-11-01': 122422,
      '2012-12-01': 111166,
      '2013-01-01': 146169,
      '2013-02-01': 147689,
      '2013-03-01': 174804,
      '2013-04-01': 175704,
      '2013-05-01': 171440,
      '2013-06-01': 162135,
      '2013-07-01': 178352,
      '2013-08-01': 169402,
      '2013-09-01': 186062,
      '2013-10-01': 212632,
      '2013-11-01': 210788,
      '2013-12-01': 192565,
      '2014-01-01': 233798,
      '2014-02-01': 240056,
      '2014-03-01': 282718,
      '2014-04-01': 288285,
      '2014-05-01': 285629,
      '2014-06-01': 274983,
      '2014-07-01': 321652,
      '2014-08-01': 305658,
      '2014-09-01': 323147,
      '2014-10-01': 400059,
      '2014-11-01': 356243,
      '2014-12-01': 355551,
      '2015-01-01': 432145,
      '2015-02-01': 395219,
      '2015-03-01': 533098,
      '2015-04-01': 483736,
      '2015-05-01': 479612,
      '2015-06-01': 469854,
      '2015-07-01': 492764,
      '2015-08-01': 530879,
      '2015-09-01': 537251,
      '2015-10-01': 567512,
      '2015-11-01': 568695,
      '2015-12-01': 517140,
      '2016-01-01': 611273,
      '2016-02-01': 689660,
      '2016-03-01': 773429,
      '2016-04-01': 743311,
      '2016-05-01': 726493,
      '2016-06-01': 690709,
      '2016-07-01': 724652,
      '2016-08-01': 777049,
      '2016-09-01': 849871,
      '2016-10-01': 918274,
      '2016-11-01': 919462,
      '2016-12-01': 819345,
      '2017-01-01': 927276,
      '2017-02-01': 837350,
      '2017-03-01': 1159316,
      '2017-04-01': 1055287,
      '2017-05-01': 1092298,
      '2017-06-01': 1010676,
      '2017-07-01': 1063354,
      '2017-08-01': 1085220,
      '2017-09-01': 1168186,
      '2017-10-01': 1265535,
      '2017-11-01': 1279799,
      '2017-12-01': 1123901,
      '2018-01-01': 1336689,
      '2018-02-01': 1272519,
      '2018-03-01': 1531932,
      '2018-04-01': 1471784,
      '2018-05-01': 1480287,
      '2018-06-01': 1350906,
      '2018-07-01': 1405872,
      '2018-08-01': 1424380,
      '2018-09-01': 1568438,
      '2018-10-01': 1776140,
      '2018-11-01': 1706172,
      '2018-12-01': 827162
    };
    return this.transformFormatDateMap(createatMap);
  }

  getRepoPushAtList(): (number[])[] {
    const pushAtMap = {
      '2008-01-01': 0,
      '2008-02-01': 9,
      '2008-03-01': 363,
      '2008-04-01': 529,
      '2008-05-01': 702,
      '2008-06-01': 844,
      '2008-07-01': 1005,
      '2008-08-01': 1199,
      '2008-09-01': 1545,
      '2008-10-01': 1764,
      '2008-11-01': 1874,
      '2008-12-01': 2561,
      '2009-01-01': 3237,
      '2009-02-01': 3559,
      '2009-03-01': 4237,
      '2009-04-01': 4226,
      '2009-05-01': 4748,
      '2009-06-01': 4352,
      '2009-07-01': 4579,
      '2009-08-01': 4967,
      '2009-09-01': 5194,
      '2009-10-01': 5937,
      '2009-11-01': 6476,
      '2009-12-01': 6816,
      '2010-01-01': 7835,
      '2010-02-01': 8044,
      '2010-03-01': 10224,
      '2010-04-01': 9436,
      '2010-05-01': 10010,
      '2010-06-01': 10488,
      '2010-07-01': 11155,
      '2010-08-01': 12583,
      '2010-09-01': 13869,
      '2010-10-01': 18572,
      '2010-11-01': 17964,
      '2010-12-01': 17207,
      '2011-01-01': 20446,
      '2011-02-01': 21926,
      '2011-03-01': 25507,
      '2011-04-01': 26046,
      '2011-05-01': 29038,
      '2011-06-01': 31028,
      '2011-07-01': 30415,
      '2011-08-01': 32539,
      '2011-09-01': 35490,
      '2011-10-01': 37640,
      '2011-11-01': 39732,
      '2011-12-01': 39788,
      '2012-01-01': 46736,
      '2012-02-01': 52257,
      '2012-03-01': 59013,
      '2012-04-01': 62010,
      '2012-05-01': 66481,
      '2012-06-01': 65727,
      '2012-07-01': 90913,
      '2012-08-01': 75867,
      '2012-09-01': 80110,
      '2012-10-01': 93754,
      '2012-11-01': 100598,
      '2012-12-01': 95546,
      '2013-01-01': 120773,
      '2013-02-01': 121589,
      '2013-03-01': 147950,
      '2013-04-01': 151773,
      '2013-05-01': 149354,
      '2013-06-01': 142008,
      '2013-07-01': 153662,
      '2013-08-01': 145499,
      '2013-09-01': 155564,
      '2013-10-01': 179353,
      '2013-11-01': 181090,
      '2013-12-01': 174548,
      '2014-01-01': 196079,
      '2014-02-01': 203772,
      '2014-03-01': 239602,
      '2014-04-01': 256620,
      '2014-05-01': 259826,
      '2014-06-01': 250932,
      '2014-07-01': 254697,
      '2014-08-01': 251638,
      '2014-09-01': 279485,
      '2014-10-01': 350081,
      '2014-11-01': 316523,
      '2014-12-01': 328589,
      '2015-01-01': 383135,
      '2015-02-01': 346665,
      '2015-03-01': 474482,
      '2015-04-01': 446097,
      '2015-05-01': 452823,
      '2015-06-01': 446019,
      '2015-07-01': 437544,
      '2015-08-01': 492797,
      '2015-09-01': 470527,
      '2015-10-01': 504248,
      '2015-11-01': 520076,
      '2015-12-01': 496846,
      '2016-01-01': 553338,
      '2016-02-01': 621395,
      '2016-03-01': 707584,
      '2016-04-01': 697201,
      '2016-05-01': 710856,
      '2016-06-01': 675537,
      '2016-07-01': 683150,
      '2016-08-01': 726013,
      '2016-09-01': 804203,
      '2016-10-01': 848015,
      '2016-11-01': 870180,
      '2016-12-01': 818471,
      '2017-01-01': 871356,
      '2017-02-01': 937990,
      '2017-03-01': 1108821,
      '2017-04-01': 1037716,
      '2017-05-01': 1103524,
      '2017-06-01': 1021978,
      '2017-07-01': 1052079,
      '2017-08-01': 1068287,
      '2017-09-01': 1124009,
      '2017-10-01': 1233006,
      '2017-11-01': 1273387,
      '2017-12-01': 1183039,
      '2018-01-01': 1343984,
      '2018-02-01': 1280411,
      '2018-03-01': 1583542,
      '2018-04-01': 1521866,
      '2018-05-01': 1592805,
      '2018-06-01': 1487702,
      '2018-07-01': 1526735,
      '2018-08-01': 1568988,
      '2018-09-01': 1630885,
      '2018-10-01': 2117240,
      '2018-11-01': 2241208,
      '2018-12-01': 1610731
    };
    return this.transformFormatDateMap(pushAtMap);
  }


  getUserLocationList(): { name: string, value: number }[] {
    return [{'name': 'United States of America', 'value': 128400}, {'name': 'China', 'value': 121036}, {
      'name': 'India',
      'value': 107737
    }, {'name': 'United Kingdom', 'value': 7792}, {'name': 'Germany', 'value': 85198}, {
      'name': 'Canada',
      'value': 52444
    }, {'name': 'Brazil', 'value': 47002}, {'name': 'Japan', 'value': 39684}, {'name': 'Russia', 'value': 44452}, {
      'name': 'France',
      'value': 53910
    }, {'name': 'Afghanistan', 'value': 426}, {'name': 'Angola', 'value': 310}, {
      'name': 'Albania',
      'value': 570
    }, {'name': 'United Arab Emirates', 'value': 10}, {'name': 'Argentina', 'value': 16478}, {
      'name': 'Armenia',
      'value': 1311
    }, {'name': 'French Southern and Antarctic Lands', 'value': 3}, {'name': 'Australia', 'value': 42153}, {
      'name': 'Austria',
      'value': 8943
    }, {'name': 'Azerbaijan', 'value': 784}, {'name': 'Burundi', 'value': 26}, {'name': 'Belgium', 'value': 13022}, {
      'name': 'Benin',
      'value': 208
    }, {'name': 'Burkina Faso', 'value': 3}, {'name': 'Bangladesh', 'value': 14945}, {
      'name': 'Bulgaria',
      'value': 7641
    }, {'name': 'The Bahamas', 'value': 1}, {'name': 'Bosnia and Herzegovina', 'value': 15}, {
      'name': 'Belarus',
      'value': 8465
    }, {'name': 'Belize', 'value': 120}, {'name': 'Bermuda', 'value': 111}, {'name': 'Bolivia', 'value': 1349}, {
      'name': 'Brunei',
      'value': 88
    }, {'name': 'Bhutan', 'value': 83}, {'name': 'Botswana', 'value': 187}, {
      'name': 'Central African Republic',
      'value': 6
    }, {'name': 'Switzerland', 'value': 15954}, {'name': 'Chile', 'value': 9052}, {'name': 'Ivory Coast', 'value': 2}, {
      'name': 'Cameroon',
      'value': 58
    }, {'name': 'Democratic Republic of the Congo', 'value': 58}, {'name': 'Republic of the Congo', 'value': 1}, {
      'name': 'Colombia',
      'value': 11605
    }, {'name': 'Costa Rica', 'value': 213}, {'name': 'Cuba', 'value': 729}, {'name': 'Northern Cyprus', 'value': 1}, {
      'name': 'Cyprus',
      'value': 966
    }, {'name': 'Czech Republic', 'value': 89}, {'name': 'Djibouti', 'value': 12}, {
      'name': 'Denmark',
      'value': 13065
    }, {'name': 'Dominican Republic', 'value': 29}, {'name': 'Algeria', 'value': 1637}, {
      'name': 'Ecuador',
      'value': 2441
    }, {'name': 'Egypt', 'value': 8908}, {'name': 'Eritrea', 'value': 9}, {'name': 'Spain', 'value': 23712}, {
      'name': 'Estonia',
      'value': 2903
    }, {'name': 'Ethiopia', 'value': 767}, {'name': 'Finland', 'value': 12098}, {'name': 'Fiji', 'value': 91}, {
      'name': 'Falkland Islands',
      'value': 89
    }, {'name': 'Gabon', 'value': 46}, {'name': 'Georgia', 'value': 4423}, {'name': 'Ghana', 'value': 1831}, {
      'name': 'Guinea',
      'value': 105
    }, {'name': 'Gambia', 'value': 75}, {'name': 'Guinea Bissau', 'value': 23}, {
      'name': 'Equatorial Guinea',
      'value': 78
    }, {'name': 'Greece', 'value': 8317}, {'name': 'Greenland', 'value': 48}, {
      'name': 'Guatemala',
      'value': 1827
    }, {'name': 'French Guiana', 'value': 89}, {'name': 'Guyana', 'value': 75}, {'name': 'Honduras', 'value': 695}, {
      'name': 'Croatia',
      'value': 3586
    }, {'name': 'Haiti', 'value': 205}, {'name': 'Hungary', 'value': 6319}, {'name': 'Indonesia', 'value': 24459}, {
      'name': 'Ireland',
      'value': 12087
    }, {'name': 'Iran', 'value': 9738}, {'name': 'Iraq', 'value': 800}, {'name': 'Iceland', 'value': 1452}, {
      'name': 'Israel',
      'value': 8760
    }, {'name': 'Italy', 'value': 21439}, {'name': 'Jamaica', 'value': 730}, {'name': 'Jordan', 'value': 1502}, {
      'name': 'Kazakhstan',
      'value': 1599
    }, {'name': 'Kenya', 'value': 5149}, {'name': 'Kyrgyzstan', 'value': 362}, {'name': 'Cambodia', 'value': 940}, {
      'name': 'South Korea',
      'value': 259
    }, {'name': 'Kosovo', 'value': 327}, {'name': 'Kuwait', 'value': 599}, {'name': 'Laos', 'value': 90}, {
      'name': 'Lebanon',
      'value': 1059
    }, {'name': 'Liberia', 'value': 109}, {'name': 'Libya', 'value': 239}, {'name': 'Sri Lanka', 'value': 224}, {
      'name': 'Lesotho',
      'value': 51
    }, {'name': 'Lithuania', 'value': 3174}, {'name': 'Luxembourg', 'value': 1375}, {'name': 'Latvia', 'value': 2263}, {
      'name': 'Morocco',
      'value': 2440
    }, {'name': 'Moldova', 'value': 1081}, {'name': 'Madagascar', 'value': 336}, {'name': 'Mexico', 'value': 12762}, {
      'name': 'Macedonia',
      'value': 1067
    }, {'name': 'Mali', 'value': 54}, {'name': 'Myanmar', 'value': 1065}, {'name': 'Montenegro', 'value': 286}, {
      'name': 'Mongolia',
      'value': 585
    }, {'name': 'Mozambique', 'value': 247}, {'name': 'Mauritania', 'value': 34}, {'name': 'Malawi', 'value': 177}, {
      'name': 'Malaysia',
      'value': 6769
    }, {'name': 'Namibia', 'value': 218}, {'name': 'New Caledonia', 'value': 4}, {'name': 'Niger', 'value': 54}, {
      'name': 'Nigeria',
      'value': 9321
    }, {'name': 'Nicaragua', 'value': 675}, {'name': 'Netherlands', 'value': 29922}, {'name': 'Norway', 'value': 12179}, {
      'name': 'Nepal',
      'value': 3946
    }, {'name': 'New Zealand', 'value': 302}, {'name': 'Oman', 'value': 240}, {'name': 'Pakistan', 'value': 12408}, {
      'name': 'Panama',
      'value': 824
    }, {'name': 'Peru', 'value': 2564}, {'name': 'Philippines', 'value': 11827}, {
      'name': 'Papua New Guinea',
      'value': 5
    }, {'name': 'Poland', 'value': 26680}, {'name': 'Puerto Rico', 'value': 105}, {'name': 'North Korea', 'value': 4}, {
      'name': 'Portugal',
      'value': 11075
    }, {'name': 'Paraguay', 'value': 827}, {'name': 'Qatar', 'value': 525}, {'name': 'Romania', 'value': 8689}, {
      'name': 'Rwanda',
      'value': 424
    }, {'name': 'Western Sahara', 'value': 2}, {'name': 'Saudi Arabia', 'value': 33}, {
      'name': 'Sudan',
      'value': 371
    }, {'name': 'South Sudan', 'value': 4}, {'name': 'Senegal', 'value': 265}, {
      'name': 'Solomon Islands',
      'value': 3
    }, {'name': 'Sierra Leone', 'value': 7}, {'name': 'El Salvador', 'value': 36}, {'name': 'Somaliland', 'value': 27}, {
      'name': 'Somalia',
      'value': 124
    }, {'name': 'Republic of Serbia', 'value': 124}, {'name': 'Suriname', 'value': 64}, {
      'name': 'Slovakia',
      'value': 2922
    }, {'name': 'Slovenia', 'value': 2115}, {'name': 'Sweden', 'value': 25713}, {'name': 'Swaziland', 'value': 56}, {
      'name': 'Syria',
      'value': 485
    }, {'name': 'Chad', 'value': 10}, {'name': 'Togo', 'value': 113}, {'name': 'Thailand', 'value': 7752}, {
      'name': 'Tajikistan',
      'value': 80
    }, {'name': 'Turkmenistan', 'value': 42}, {'name': 'East Timor', 'value': 2}, {
      'name': 'Trinidad and Tobago',
      'value': 8
    }, {'name': 'Tunisia', 'value': 2140}, {'name': 'Turkey', 'value': 14256}, {
      'name': 'United Republic of Tanzania',
      'value': 12
    }, {'name': 'Uganda', 'value': 1339}, {'name': 'Ukraine', 'value': 32457}, {'name': 'Uruguay', 'value': 2590}, {
      'name': 'Uzbekistan',
      'value': 684
    }, {'name': 'Venezuela', 'value': 6089}, {'name': 'Vietnam', 'value': 8346}, {'name': 'Vanuatu', 'value': 28}, {
      'name': 'West Bank',
      'value': 4
    }, {'name': 'Yemen', 'value': 235}, {'name': 'South Africa', 'value': 380}, {'name': 'Zambia', 'value': 335}, {
      'name': 'Zimbabwe',
      'value': 691
    }];
  }

  getRepoLang() {
    const seriesData = [{
      name: 'ActionScript',
      value: 17108,
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
      value: 204032
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
    }, {
      name: 'Rust',
      value: 27512
    }, {
      name: 'other',
      value: 2139840
    }];
    return {
      seriesData: seriesData,
      legendData: seriesData.map(val => val.name),
      selected: [seriesData.map(() => true)],
    };
  }

  getRepoStarList(): { dataAxis: string[], dataSeries: number[] } {
    const dataAxis = ['0-10', '10-10^2', '10^2-10^3', '10^3-10^4', '10^4-10^5', '10^5+'];
    const data = [29413739, 635863, 117111, 16548, 963, 6];
    return {
      dataAxis,
      dataSeries: data
    };
  }

  getRepoForkList(): { dataAxis: string[], dataSeries: number[] } {
    const dataAxis = ['0', '1-2', '2-5', '5-10', '10-10^2', '10^2+'];
    const data = [15996769, 2855785, 1198149, 391152, 386647, 46836];
    return {
      dataAxis,
      dataSeries: data
    };
  }

  getRepoLicenseGraph() {

    const dataSource: { [key: string]: { [key: string]: number } } = {
      'MIT Family': {
        'MIT License': 3557658
      },
      'Apache Family': {
        'Apache 2.0': 1004432,
      },
      'BSD Clause Family': {
        'BSD-2-Clause': 62031,
        'BSD-3-Clause': 132130,
        'BSD-3-Clause-Clear': 315,
      },
      'Creative Commons Family': {
        'Creative Commons Zero v1.0 Universal': 36722,
        'Creative Commons Attribution 4.0 International': 6649,
        'Creative Commons Attribution Share Alike 4.0 International': 5614
      },
      'GNU General Public Family': {
        'GNU General Public License 2.0': 373942,
        'GNU General Public License 3.0': 875627,
        'GNU Lesser General Public License 2.1': 24863,
        'GNU Lesser General Public License 3.0': 66898,
        'GNU Affero General Public License 3.0': 67951,
      },
      'Eclipse Public Family': {
        'Eclipse Public License 2.0': 4991,
        'Eclipse Public License 1.0': 37826,
      },
      'Other Family': {
        'Zlib License': 3048,
        'Do What The F*ck You Want To Public License': 13310,
        'Other': 2191,
        'The Unlicense': 101884,
        'Open Software License': 2337,
        'SIL Open Font License': 2718,
        'Microsoft Public License': 1451,
        'Mozilla Public License': 34986,
        'ISC License': 27506,
        'Boost Software License 1.0': 2774,
        'Artistic License 2.0': 9772,
      }
    };

    interface LicenseListItem {
      name: string;
      isLicense: boolean;
      category: string;
      value: number;
    }

    const licenses: LicenseListItem[] = [];
    for (const licenseFamily of Object.keys(dataSource)) {
      const family = dataSource[licenseFamily];
      let sum = 0;
      for (const license of Object.keys(family)) {
        const value = family[license];
        sum += value;
        licenses.push({
          name: license,
          isLicense: true,
          category: licenseFamily,
          value: value
        });
      }
      licenses.push({
        name: licenseFamily,
        isLicense: false,
        category: licenseFamily,
        value: sum
      });
    }
    return licenses;
  }

  getUserFollowerList(): { name: string, value: number }[] {
    return [{
      name: '0',
      value: 25808410
    }, {
      name: '1-10',
      value: 3557454
    }, {
      name: '10-10^2',
      value: 395770
    }, {
      name: '10^2-10^3',
      value: 26390
    }, {
      name: '10^3-10^4',
      value: 1466
    }, {
      name: '10^4+',
      value: 62
    }];
  }

  getIssueCommentList() {
    return [['=0', 42716642], ['1-5', 37888160], ['5-10', 8385260],
      ['10-10^2', 4193657], ['10^2-10^3', 32110], ['10^3+', 103]];
  }

  getUserRepoList() {
    return [['0', '1-10', '10-100', '100-1000', '1000-10000', '10000+'], [20078885, 14030422, 1891288, 54447, 808, 24]];
  }
}
