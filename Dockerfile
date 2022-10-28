FROM node:latest
WORKDIR /usr
RUN mkdir mblabs
COPY ./ ./mblabs
RUN cd ./mblabs
RUN ls -ll
RUN npm install
RUN npm run build
## this is stage two , where the app actually runs
FROM node:latest
WORKDIR /usr
RUN mkdir mblabs
COPY ./ ./mblabs
RUN cd ./mblabs
RUN npm install --only=production
COPY --from=0 /usr/mblabs/dist .
RUN cd ./mblabs
RUN npm install pm2 -g
EXPOSE 3333
CMD ["pm2-runtime","dist/app.js"]