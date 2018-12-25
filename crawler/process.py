import csv
import pandas as pd 
"""
df:pd.DataFrame = pd.read_csv('2018-11-table1-new.csv',names=['event_type','orgname','num'])
df.loc[:,'period']='2018-11'
df.loc[:,['period','event_type','orgname','num']].to_csv('2018-11-table1-new1.csv',index=False,header=False,quoting=csv.QUOTE_NONNUMERIC)

df:pd.DataFrame = pd.read_csv('2018-12-table1-new.csv',names=['event_type','orgname','num'])
df.loc[:,'period']='2018-12'
df.loc[:,['period','event_type','orgname','num']].to_csv('2018-12-table1-new1.csv',index=False,header=False,quoting=csv.QUOTE_NONNUMERIC)

df:pd.DataFrame = pd.read_csv('2018-11-table2-new.csv',names=['event_type','orgname','num'])
df.loc[:,'period']='2018-11'
df.loc[:,['period','event_type','orgname','num']].to_csv('2018-11-table2-new1.csv',index=False,header=False,quoting=csv.QUOTE_NONNUMERIC)

df:pd.DataFrame = pd.read_csv('2018-12-table2-new.csv',names=['event_type','orgname','num'])
df.loc[:,'period']='2018-12'
df.loc[:,['period','event_type','orgname','num']].to_csv('2018-12-table2-new1.csv',index=False,header=False,quoting=csv.QUOTE_NONNUMERIC)

df:pd.DataFrame = pd.read_csv('2018-11-table3-new.csv',names=['event_type','orgname','num'])
df.loc[:,'period']='2018-11'
df.loc[:,['period','event_type','orgname','num']].to_csv('2018-11-table3-new1.csv',index=False,header=False,quoting=csv.QUOTE_NONNUMERIC)
"""
df:pd.DataFrame = pd.read_csv('2018-12-table3-new.csv',names=['event_type','orgname','num'])
df.loc[:,'period']='2018-12'
df.loc[:,['period','event_type','orgname','num']].to_csv('2018-12-table3-new1.csv',index=False,header=False,quoting=csv.QUOTE_NONNUMERIC)