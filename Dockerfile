FROM node:carbon
VOLUME ["/root"]
ADD setup-ffmpeg.sh /root
RUN /root/setup-ffmpeg.sh
# Create app directory
WORKDIR /
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install
# If you are building your code for production
# RUN npm install --only=production
# Bundle app source
COPY . .
EXPOSE 4200
EXPOSE 3333
CMD [ "ng", "serve ", "frontend" ]
CMD [ "ng", "serve ", "api" ]
