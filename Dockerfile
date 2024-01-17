FROM node:16.14.2

WORKDIR /app
COPY . .
RUN npm install

EXPOSE 7315

CMD [ "/app/bin/fcoin", "--prefix", "/data/fcoin_fullnode", "--index-tx=true", "--index-address=true", "--log-level=debug", "--http-port=7315", "--bip37=true", "--max-outbound=30", "--max-inbound=30", "--listen=true" ]