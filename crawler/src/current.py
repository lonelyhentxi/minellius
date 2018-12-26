# -*- coding: utf-8 -*-
# @Time      : 2018/12/21 20:05
# @Author    : cwh
import os
import urllib.error
import json
import re
from urllib import parse
import requests
import datetime
import psycopg2
import time
from apscheduler.schedulers.blocking import BlockingScheduler


def LOGGER_PATH():
    now = datetime.datetime.now()
    return os.path.join(os.path.dirname(__file__), '..','log', f'log-{now.year}-{now.month}-{now.day}.txt')


NATION_PATH = os.path.join(os.path.dirname(__file__), './nation.txt');
LANG_PATH = os.path.join(os.path.dirname(__file__), './lang.txt');

def common_log(info: str):
    print(info)
    with open(LOGGER_PATH(), 'a', encoding='utf-8') as f:
        f.write(f"{info}\n")


def crawler(href, dic, val):
    common_log(href)
    text = requests.get(href).text
    num = json.loads(text)['total_count']
    dic[val] = num
    with open(LOGGER_PATH(), 'a', encoding='utf-8') as f:
        f.write(f"{val} : {str(num)}\n")
    time.sleep(7)


def main():
    # 所在地
    country_dic = {}
    country = [['USA', 'US', 'U.S', 'America', '"United+States"', 'U.S.A'], ['China', '中国'], ['India'],
               ['U.K.', 'England'],
               ['Germany'], ['Canada'], ['Brazil'], ['Japan'], ['Russia'], ['France']]

    for coun in country:
        number = 0
        for cou in coun:
            href = 'https://api.github.com/search/users?q=location:%s' % (cou)
            common_log(href)
            text = requests.get(href).text
            # print(text)
            num = re.findall('(\d+)', text)[0]
            number += int(num)

            time.sleep(7)
        country_dic[coun[0]] = number
        with open(LOGGER_PATH(), 'a', encoding='utf-8') as f:
            f.write(f"{coun} : {str(number)}\n")
        # print(country_dic[coun[0]])

    with open(NATION_PATH, 'r', encoding='utf-8') as load_f:
        load_f = json.load(load_f)
    for coun in load_f.keys():
        href = 'https://api.github.com/search/users?q=location:%s' % (coun)
        crawler(href, country_dic, coun)

    # 创库时间
    create_time = {}
    for year in range(2008, datetime.date.today().year):
        for month in range(1, 13):
            starttime = str(year) + '-' + '%02d' % month + '-01'
            if month != 12:
                endtime = str(year) + '-' + '%02d' % (month + 1) + '-01'
            else:
                endtime = str(year + 1) + '-' + '01-01'
            # time.sleep(3)
            href = 'https://api.github.com/search/repositories?q=created:%s..%s' % (
                starttime, endtime)
            crawler(href, create_time, starttime[:7])

    for month in range(1, datetime.date.today().month + 1):
        starttime = str(datetime.date.today().year) + '-' + '%02d' % month + '-01'
        if month != 12:
            endtime = str(datetime.date.today().year) + \
                      '-' + '%02d' % (month + 1) + '-01'
        else:
            endtime = str(datetime.date.today().year + 1) + '-' + '01-01'
        # time.sleep(3)
        href = 'https://api.github.com/search/repositories?q=created:%s..%s' % (
            starttime, endtime)
        # print(starttime, endtime)
        crawler(href, create_time, starttime[:7])
    # 最后活跃
    pushed_time = {}
    for year in range(2008, datetime.date.today().year):
        for month in range(1, 13):
            starttime = str(year) + '-' + '%02d' % month + '-01'
            if month != 12:
                endtime = str(year) + '-' + '%02d' % (month + 1) + '-01'
            else:
                endtime = str(year + 1) + '-' + '01-01'
            # time.sleep(3)
            href = 'https://api.github.com/search/repositories?q=pushed:%s..%s' % (
                starttime, endtime)
            crawler(href, pushed_time, starttime[:7])
    for month in range(1, datetime.date.today().month + 1):
        starttime = str(datetime.date.today().year) + '-' + '%02d' % month + '-01'
        if month != 12:
            endtime = str(datetime.date.today().year) + \
                      '-' + '%02d' % (month + 1) + '-01'
        else:
            endtime = str(datetime.date.today().year + 1) + '-' + '01-01'
        # time.sleep(3)
        href = 'https://api.github.com/search/repositories?q=pushed:%s..%s' % (
            starttime, endtime)
        # print(starttime, endtime)
        crawler(href, pushed_time, starttime[:7])

    with open(LANG_PATH, 'r', encoding='utf-8') as load:
        load = json.load(load)
    lang_list = load['language']
    license_list = load['license']
    # 库语言
    repo_lang_dic = {}
    for lang in lang_list:
        href = 'https://api.github.com/search/repositories?q=language:%s' % (
            urllib.parse.quote(lang))
        crawler(href, repo_lang_dic, lang)

    # 许可证
    license_dic = {}
    for license in license_list:
        href = 'https://api.github.com/search/repositories?q=license:%s' % (
            urllib.parse.quote(license))
        crawler(href, license_dic, license)

    # 用户语言
    user_lang_dic = {}
    for lang in lang_list:
        href = 'https://api.github.com/search/users?q=language:%s' % (
            urllib.parse.quote(lang))
        crawler(href, user_lang_dic, lang)

    # forks数量
    forks_dic = {}
    forks_list = ['0', '1..2', '2..5', '5..10', '10..100', '>100']
    for forks in forks_list:
        href = 'https://api.github.com/search/repositories?q=forks:%s' % (
            urllib.parse.quote(forks))
        crawler(href, forks_dic, forks)

    # stars数量
    star_dic = {}
    stars_list = ['<10', '10..100', '100..1000',
                  '1000..10000', '10000..100000', '>100000']
    for stars in stars_list:
        href = 'https://api.github.com/search/repositories?q=stars:%s' % (
            urllib.parse.quote(stars))
        crawler(href, star_dic, stars)

    # 库体量
    size_dic = {}
    size_list = ['<10', '10..100', '100..1000',
                 '1000..10000', '10000..100000', '>100000']
    for size in size_list:
        href = 'https://api.github.com/search/repositories?q=size:%s' % (
            urllib.parse.quote(size))
        crawler(href, size_dic, size)

    # 问题热度
    comments_dic = {}
    comments_list = ['0', '1..5', '5..10', '10..100', '100.1000', '>1000']
    for comments in comments_list:
        href = 'https://api.github.com/search/issues?q=comments:%s' % (
            urllib.parse.quote(comments))
        crawler(href, comments_dic, comments)

    # 所有库
    repos_dic = {}
    repos_list = ['0', '1..10', '10..100', '100..1000', '1000.10000', '>10000']
    for repos in repos_list:
        href = 'https://api.github.com/search/users?q=repos:%s' % (
            urllib.parse.quote(repos))
        crawler(href, repos_dic, repos)

    # 关注度
    followers_dic = {}
    followers_list = ['0', '1..10', '10..100',
                      '100.1000', '1000..10000', '>10000']
    for followers in followers_list:
        href = 'https://api.github.com/search/users?q=followers:%s' % (
            urllib.parse.quote(followers))
        crawler(href, followers_dic, followers)
    all_info = [country_dic, create_time, pushed_time, repo_lang_dic, license_dic, user_lang_dic,
                forks_dic, star_dic, size_dic, comments_dic, repos_dic, followers_dic]
    keyword = ['country_dic', 'create_time', 'pushed_time', 'repo_lang_dic', 'license_dic',
               'user_lang_dic', 'forks_dic', 'star_dic', 'size_dic', 'comments_dic', 'repos_dic', 'followers_dic']
    connect = psycopg2.connect(
        host='',
        port=5432,
        user='',
        password='',
        database=''
    )
    cursor = connect.cursor()
    common_log('drop old table')
    cursor.execute("DROP TABLE IF EXISTS public.current")
    common_log('create new table')
    sql = """CREATE TABLE public.current
	(
		id serial PRIMARY KEY NOT NULL,
		keyword varchar(255) NOT NULL,
		dict text NOT NULL
	);
	CREATE UNIQUE INDEX current_keyword_uindex ON public.current (keyword);"""
    cursor.execute(sql)
    for i in range(len(keyword)):
        dic = json.dumps(all_info[i])
        k = str(keyword[i])
        sql = f"""INSERT INTO current(keyword, dict)
			   VALUES ('{k}','{dic}');"""
        common_log(f"insert {k}")
        try:
            # 执行sql语句
            cursor.execute(sql)
            # 执行sql语句
            connect.commit()
        except Exception as e:
            # 发生错误时回滚
            common_log(str(e))
            connect.rollback()
    connect.close()


if __name__ == "__main__":
    sched = BlockingScheduler()
    main()
    sched.add_job(main, 'interval', hours=24)
    sched.start()
