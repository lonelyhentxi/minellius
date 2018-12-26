FROM python:3.6
ADD . /home/minellius/crawler
WORKDIR /home/minellius/crawler
RUN pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
CMD ["python","collect_data.py"]