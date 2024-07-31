#!/bin/sh
echo 'Writing config files...'
rm /data/fcoin.conf
cp /app/fcoin.conf.default /data/fcoin.conf

# Set Env Variables to Defaults if unset
if [ -z "$ADDNODE" ]
then
	ADDNODE="34.171.98.65"
fi

if [ -z "$LOG_LEVEL" ]
then
	LOG_LEVEL="info"
fi

# Add config parameters
if [ ! -z "$ADDNODE" ]
then
	echo "nodes: $ADDNODE" >> /data/fcoin.conf
fi

if [ ! -z "$RPC_PASSWORD" ]
then
  echo "http-host: 0.0.0.0" >> /data/fcoin.conf
  echo "api-key: $RPC_PASSWORD" >> /data/fcoin.conf
  echo "wallet-api-key: $RPC_PASSWORD" >> /data/fcoin.conf
  echo "wallet-no-auth: false" >> /data/fcoin.conf
  echo "wallet-wallet-auth: true" >> /data/fcoin.conf
fi

if [ ! -z "$NETWORK" ]
then
	echo "network: $NETWORK" >> /data/fcoin.conf
fi

if [ ! -z "$LOG_LEVEL" ]
then
	echo "log-level: $LOG_LEVEL" >> /data/fcoin.conf
fi

if [ ! -z "$CUSTOM_FCOIN_CONFIG" ]
then
	echo -e "${CUSTOM_FCOIN_CONFIG}" >> /data/fcoin.conf
fi

# Download and extract a Blockchain boostrap if set
if [ ! -z "$BLOCKCHAIN_BOOTSTRAP" ] && [ "$(cat /data/bootstrap-url.txt)" != "$BLOCKCHAIN_BOOTSTRAP" ]
then
  echo 'Downloading Blockchain Bootstrap...'
  RUNTIME="$(date +%s)"
  curl -L $BLOCKCHAIN_BOOTSTRAP -o /data/bootstrap.tar.gz --progress-bar | tee /dev/null
  RUNTIME="$(($(date +%s)-RUNTIME))"
  echo "Blockchain Bootstrap Download Complete (took ${RUNTIME} seconds)"
  echo 'Extracting Bootstrap...'
  RUNTIME="$(date +%s)"
  tar -xzf /data/bootstrap.tar.gz -C /data
  RUNTIME="$(($(date +%s)-RUNTIME))"
  echo "Blockchain Bootstrap Extraction Complete! (took ${RUNTIME} seconds)"
  rm -f /data/bootstrap.tar.gz
  echo 'Erased Blockchain Bootstrap `.tar.gz` file'
  echo "$BLOCKCHAIN_BOOTSTRAP" > /data/bootstrap-url.txt
  ls /data
fi

# Pregenerate directories
mkdir /data/blocks
mkdir /data/testnet
mkdir /data/testnet/blocks

# Start fcoin
/app/bin/fcoin --prefix=/data --wallet-http-host=0.0.0.0