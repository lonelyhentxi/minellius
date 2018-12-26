# -*- coding: utf-8 -*-
import datetime
import time
import pandas as pd
from pandas.tseries.offsets import Day
import psycopg2
import csv
import json
import os
event_dic = {'ProjectColumnEvent': 28,
 'GistEvent': 13, 
 'RepositoryVulnerabilityAlertEvent': 38, 
 'SecurityAdvisoryEvent': 39, 
 'MarketplacePurchaseEvent': 20, 
 'WatchEvent': 43, 
 'DeploymentStatusEvent': 7, 'MembershipEvent': 22, 'DownloadEvent': 8, 'CreateEvent': 4, 'CheckRunEvent': 0, 'OrganizationEvent': 24, 'CommitCommentEvent': 2, 'PushEvent': 34, 'InstallationEvent': 15, 'ProjectCardEvent': 27, 'TeamEvent': 41, 'PullRequestEvent': 31, 'PullRequestReviewEvent': 32, 'IssuesEvent': 18, 'DeleteEvent': 5, 'ProjectEvent': 29, 'TeamAddEvent': 42, 'StatusEvent': 40, 'CheckSuiteEvent': 1, 'MemberEvent': 21, 'InstallationRepositoriesEvent': 16, 'MilestoneEvent': 23, 'RepositoryImportEvent': 37, 'ForkEvent': 10, 'ForkApplyEvent': 11, 'ContentReferenceEvent': 3, 'IssueCommentEvent': 17, 'PublicEvent': 30, 'GollumEvent': 14, 'ReleaseEvent': 35, 'DeploymentEvent': 6, 'FollowEvent': 9, 'RepositoryEvent': 36, 'LabelEvent': 19, 'OrgBlockEvent': 25, 'PullRequestReviewCommentEvent': 33, 'PageBuildEvent': 26, 'GitHubAppAuthorizationEvent': 12}
def return_time_pre():
    now_time = datetime.datetime.utcnow()#获取当前时间
    yes_time = (now_time -1*Day()).strftime('%Y-%m-%d')#格式化
    return yes_time
def msg_time_pre():
    now_time = datetime.datetime.utcnow()#获取当前时间
    yes_time = now_time -1*Day()#格式化
    return yes_time
def get_target_value(key, dic, tmp_list):
    """
    :param key: 目标key值
    :param dic: JSON数据
    :param tmp_list: 用于存储获取的数据
    :return: list
    """
    if not isinstance(dic, dict) or not isinstance(tmp_list, list):  # 对传入数据进行格式校验
        return 'argv[1] not an dict or argv[-1] not an list '

    if key in dic.keys():
        tmp_list.append(dic[key])  # 传入数据存在则存入tmp_list
    else:
        for value in dic.values():  # 传入数据不符合则对其value值进行遍历
            if isinstance(value, dict):
                get_target_value(key, value, tmp_list)  # 传入数据的value值是字典，则直接调用自身
            elif isinstance(value, (list, tuple)):
                _get_value(key, value, tmp_list)  # 传入数据的value值是列表或者元组，则调用_get_value
    return tmp_list

def _get_value(key, val, tmp_list):
    for val_ in val:
        if isinstance(val_, dict):  
            get_target_value(key, val_, tmp_list)  # 传入数据的value值是字典，则调用get_target_value
        elif isinstance(val_, (list, tuple)):
            _get_value(key, val_, tmp_list)   # 传入数据的value值是列表或者元组，则调用自身

def main(h=19,m=40):
    os.chdir(os.getcwd())
    while True:
        now = datetime.datetime.utcnow()
        # print(now.hour, now.minute)
        if now.day == 2:
            os.system("rm ./tmp/*.csv")
        if now.hour == h and now.minute == m:
            conn = psycopg2.connect(host='', port=5432, user='', password='', database='')#SQL parameters
            conn.set_client_encoding('UTF8')
            cursor = conn.cursor()
            date_msg = str(msg_time_pre().year)+"-"+str(msg_time_pre().month)
            sql1 = "DELETE FROM period_user_event1 WHERE period = '%s'" % str(date_msg)
            sql2 = "DELETE FROM period_repo_event1 WHERE period = '%s'" % str(date_msg)
            sql3 = "DELETE FROM period_org_event1 WHERE period = '%s'" % str(date_msg)
            print(date_msg)
            try:
                cursor.execute(sql1)
                conn.commit()
                cursor.execute(sql2)
                conn.commit()
                cursor.execute(sql3)
                conn.commit()
            except Exception as e:
                print (e)
            os.chdir("./tmp")
            for j in range(24):
                dst_url = "http://data.gharchive.org/"+return_time_pre()+"-"+ str(j) +".json.gz"
                os.system("wget " + dst_url)
                os.system("gzip -d " + return_time_pre() + "-" + str(j) + ".json.gz")
            os.chdir("..")
            with open('./tmp/updated-table1.csv','a',newline='') as table1:
                with open('./tmp/updated-table2.csv','a',newline='') as table2:
                    with open('./tmp/updated-table3.csv','a',newline='') as table3:
                        t1_write = csv.writer(table1)
                        t2_write = csv.writer(table2)
                        t3_write = csv.writer(table3)
                        for i in range(24):
                            with open(r"./tmp/" + return_time_pre() + "-" + str(i) + ".json" , 'r',encoding='UTF-8') as f1:
                                list1 = f1.readlines()
                                for lines in list1:
                                    lines = json.loads(lines)
                                    repo_json = get_target_value('repo',lines,[])[0]
                                    repo = get_target_value('name',repo_json,[])[0]
                                    name = get_target_value('login',lines,[])[0]
                                    event_type = get_target_value('type',lines,[])[0]
                                    try:
                                        r = get_target_value('org',lines,[])[0]
                                        b = get_target_value('login',r,[])[0]
                                        t3_write.writerow([event_dic[event_type],b])
                                    except:
                                        pass
                                    t1_write.writerow([event_dic[event_type],name])
                                    t2_write.writerow([event_dic[event_type],repo])
            t1 = pd.read_csv("./tmp/updated-table1.csv")
            t2 = pd.read_csv("./tmp/updated-table2.csv")
            t3 = pd.read_csv("./tmp/updated-table3.csv")
            print('read finish')
            for i in range(44):
                print(i)
                t1_tmp = t1[t1[list(t1.columns.values)[0]]==i]
                t1_tmpcounts = t1_tmp.loc[:,[list(t1.columns.values)[1]]]            
                t1_tmpcounts = pd.Series(t1_tmpcounts[list(t1.columns.values)[1]].values,)
                if t1_tmpcounts.value_counts().size != 0:
                    t1_dict = t1_tmpcounts.value_counts().to_dict()
                    for k,v in t1_dict.items():
                        v = int(v)
                        sql4 = f"INSERT INTO period_user_event1 (period,event_type,username,num) VALUES ('{date_msg}',{i},'{k}',{v})"
                        try:
                            cursor.execute(sql4)
                            conn.commit()
                        except Exception as e:
                            print (e)
                t2_tmp = t2[t2[list(t2.columns.values)[0]]==i]
                t2_tmpcounts = t2_tmp.loc[:,[list(t2.columns.values)[1]]]            
                t2_tmpcounts = pd.Series(t2_tmpcounts[list(t2.columns.values)[1]].values,)
                if t2_tmpcounts.value_counts().size != 0:
                    t2_dict = t2_tmpcounts.value_counts().to_dict()
                    for k,v in t2_dict.items():
                        v = int(v)

                        sql5 = f"INSERT INTO period_repo_event1 (period,event_type,reponame,num) VALUES ('{date_msg}',{i},'{k}',{v})"
                        try:
                            cursor.execute(sql5)
                            conn.commit()
                        except Exception as e:
                            print (e)
                t3_tmp = t3[t3[list(t3.columns.values)[0]]==i]
                t3_tmpcounts = t3_tmp.loc[:,[list(t3.columns.values)[1]]]            
                t3_tmpcounts = pd.Series(t3_tmpcounts[list(t3.columns.values)[1]].values,)
                if t3_tmpcounts.value_counts().size != 0:
                    t3_dict = t3_tmpcounts.value_counts().to_dict()
                    for k,v in t3_dict.items():
                        #print(date_msg)
                        v = int(v)
                        sql6 = f"INSERT INTO period_org_event1 (period,event_type,orgname,num)  VALUES ('{date_msg}',{i},'{k}',{v})"
                        try:
                            cursor.execute(sql6)
                            conn.commit()
                        except Exception as e:
                            print (e)
            print("Complete")
            conn.close()
            cursor.close()
            os.system("rm ./tmp/*.json")
        time.sleep(10) 
main()
