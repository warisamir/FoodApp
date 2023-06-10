FROM node:latest

COPY . ./

CMD npm i 
CMD npm start
