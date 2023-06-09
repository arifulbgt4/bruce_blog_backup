FROM node:12-slim

# where our app will live in container
WORKDIR /app

#  api
COPY  ./packages/api/package.json ./packages/api/package.json
#  dashboard
COPY  ./packages/dashboard/package.json ./packages/dashboard/package.json
#  client
COPY  ./packages/client/package.json ./packages/client/package.json

# root package file
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY lerna.json lerna.json
RUN yarn --network-timeout 100000

# copy whatever is here into container
# copy everything except packages
COPY . .
