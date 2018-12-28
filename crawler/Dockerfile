FROM centos/python-36-centos7
ADD . /home/minellius/crawler
WORKDIR /home/minellius/crawler
RUN pip install -r requirements.txt
CMD ["python","src/current.py"]