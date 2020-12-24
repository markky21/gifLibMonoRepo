FROM rickydunlop/nodejs-ffmpeg as base-container
LABEL maintainer="Kuba Kocięba" Description="Base docker conainer for development"
ENV NODE_ENV develop
USER node
WORKDIR /home/node/
COPY . /home/node
RUN yarn install --frozen-lockfile \
  && yarn build:frontend \
  && yarn build:api

FROM rickydunlop/nodejs-ffmpeg as production-container
LABEL maintainer="Kuba Kocięba" Description="Docker conainer for production"
ENV NODE_ENV production
USER node
WORKDIR /home/node/
COPY --from=base-container /home/node/dist/apps ./dist
