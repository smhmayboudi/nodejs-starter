FROM node:8.11-slim as source
COPY . /test
WORKDIR /test
ARG NODE_ENV
RUN npm install && npm run babel

FROM node:8.11-slim as package
COPY --from=source /root/.npm /root/.npm 
COPY package-lock.json /test/
COPY package.json /test/
WORKDIR /test
ARG NODE_ENV
RUN npm install --production

FROM node:8.11-slim as destination
COPY --from=source /test/dist /test/dist
COPY --from=package /test/node_modules /test/node_modules
COPY --from=package /test/package-lock.json /test
COPY --from=package /test/package.json /test
WORKDIR /test
ARG NODE_ENV
CMD ["npm", "run", "start"]
