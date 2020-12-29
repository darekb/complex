FROM tishun/node-chromeheadless
WORKDIR '/home/app'
RUN npm install -g @angular/cli
COPY package.json ./
RUN npm install
COPY ./ ./
RUN npm run build --prod


FROM nginx:alpine
EXPOSE 4200
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /home/app/dist/client /usr/share/nginx/html