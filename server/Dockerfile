FROM node:10
ADD . /home/minellius/server
WORKDIR /home/minellius/server
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
CMD ["npm","run","start:prod"]
