# Use a specific version of node on Alpine for better predictability
FROM node:22-alpine

# Install build dependencies necessary for native modules
# Python and make are required for node-gyp, alpine-sdk includes build essentials
RUN apk --no-cache add \
    python3 \
    make \
    g++ \
    git

WORKDIR /app

# Copy yarn.lock first for better cache utilization
COPY package.json ./
COPY yarn.lock ./
RUN yarn

RUN mkdir /data

# Copy the rest of the application
COPY . .

EXPOSE 7318

CMD [ "/app/bin/fcoin", "--prefix", "/data", "--index-tx=true", "--index-address=true", "--http-port=7318", "--bip37=true", "--max-outbound=100", "--max-inbound=100", "--listen=true" ]
