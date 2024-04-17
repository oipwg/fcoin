# Use a specific version of node on Alpine for better predictability
FROM node:10.24.1-alpine3.11

# Install build dependencies necessary for native modules
# Python and make are required for node-gyp, alpine-sdk includes build essentials
RUN apk --no-cache add \
    python \
    make \
    g++ \
    git \
    && npm install -g node-gyp@latest

WORKDIR /app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json) first for better cache utilization
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

EXPOSE 7318

CMD [ "/app/bin/fcoin", "--prefix", "/data", "--index-tx=true", "--index-address=true", "--log-level=debug", "--http-port=7318", "--bip37=true", "--max-outbound=100", "--max-inbound=100", "--listen=true" ]
