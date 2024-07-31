# Use a specific version of node on Alpine for better predictability
FROM --platform=linux/amd64 node:22-alpine

# Install build dependencies necessary for native modules
# Python and make are required for node-gyp, alpine-sdk includes build essentials
RUN apk --no-cache add \
    python3 \
    make \
    g++ \
    git \
    curl \
    tar

WORKDIR /app

# Copy yarn.lock first for better cache utilization
COPY package.json ./
COPY yarn.lock ./
RUN yarn

RUN mkdir /data

# Copy the rest of the application
COPY . .

EXPOSE 7312 7313 7314 7315 17312 17313 17314 17315 17412 17413 17414 17415

CMD ["/bin/sh", "start.sh"]