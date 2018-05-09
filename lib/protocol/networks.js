/*!
 * network.js - bitcoin networks for bcoin
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

/**
 * @module protocol/networks
 */

const BN = require('../crypto/bn');

const network = exports;

/**
 * Network type list.
 * @memberof module:protocol/networks
 * @const {String[]}
 * @default
 */

network.types = ['main', 'testnet', 'regtest', 'simnet'];

/**
 * Mainnet
 * @static
 * @lends module:protocol/networks
 * @type {Object}
 */

const main = {};

/**
 * Symbolic network type.
 * @const {String}
 * @default
 */

main.type = 'main';

/**
 * Default DNS seeds.
 * @const {String[]}
 * @default
 */

main.seeds = [
  'seed1.florincoin.org',
  'node.oip.fun',
  'flodns.oip.li',
  'flodns.oip.fun',
  'flodns.seednode.net'
];

/**
 * Packet magic number.
 * @const {Number}
 * @default
 */

main.magic = 0xf1a5c0fd;

/**
 * Default network port.
 * @const {Number}
 * @default
 */

main.port = 7312;

/**
 * Checkpoint block list.
 * @const {Object}
 */

main.checkpointMap = {
  0: '09c7781c9df90708e278c35d38ea5c9041d7ecfcdd1c56ba67274b7cff3e1cea',
  8002: '34927375cbedc5fb2ede80423021bb733b0cf832956c397f79bf9bd9163bbc73',
  18001: '821503f14c4ec624b69ce762678c1a994dfae919832fea3deec74faa21487a5a',
  38002: '401e79b77fd0abf129137e51f12a12f820f28fd30ce4c1440f450a6d7c436249',
  160002: '8f0f6ad2e82c8b3e9bbafb3e575b3e4dfcffa434b95fa0c3148629921c388d47',
  208001: '4c6da540dc63cd2174aa78bfee895d3ad72be48d5d9fafa0ef1a08d5b2f8b32b',
  270001: '6008f82de8ee151033d9e4072b50025285fcba713fe68659bc6bae79318a9874',
  290036: 'a32d3c456604c850b6d66b2f793808673ba0e9acc1ad74560e4f5e1e38945914',
  344665: 'adc1b951a715cd45330e5a067b8ced379a98b2991d6b9b52aa57c3ded836fe40',
  400236: '38efd4e7f4a5d12dd05fc4ffede76d96e8de281cf1f35fe43905411de2b8a4f9',
  415000: 'a8c041eac4438f92f70f441c2f9ddada310ec0bdd555579a0300738ab98aef16',
  420937: '44849bb5c21c135d18a1e1a497e13319b650de391403a2ddc01e0287465ea748',
  425606: '5ea87477099b6cb9afd836d78d6f8dc9b148dc04d7deffda6f9fa4b111d8c862',
  508694: '6ada39770e22aa56fdce69d505e60d8cafcf6fdcdcdcc464518e11e997e1cd65',
  696454: '76196ffe698f548038b15df2378e7506521e1fc12e52698f2fe205446875fb8c',
  955000: '26751e49ab4b2e30d3cd01932b67f6f3babc6232eeb40aeb59afe6ae507a51b5',
  1505017: 'a7bfc5d33e06509bc70de2959e354ebb91437d74df0084c9a526bb5068308bd3',
  1678879: 'fc7666e28fc8a3255d3831faef97569f0ef7dc026c0e3f55b3dfe852284e871e',
  1678909: '8a05c5eddc23cfb5f7df90c334fc5121d76b34c8047971e642a537e340105a4c',
  1679162: '0fc11f48af54fed1b5f00ec027cdd7e12906b13d88bee1f36f19a480fb642cb3',
  1796633: '45d4272fb6600e5b945a255586d7ba1e973d5fc4c6a02ae00d2c7f6a938bdac2',
  2094558: '813fe41c83461eb89465b5f9e111866fa8876d456858c1fa2bf38682c8166694',
  2532181: '791c9359312f180f1204613541e925050b2141a797b91dae8810edaa4951cdca',
};

/**
 * Last checkpoint height.
 * @const {Number}
 * @default
 */

main.lastCheckpoint = 2532181;

/**
 * @const {Number}
 * @default
 */

main.halvingInterval = 800000;

/**
 * Genesis block header.
 * @const {NakedBlock}
 */

main.genesis = {
  version: 1,
  hash: '09c7781c9df90708e278c35d38ea5c9041d7ecfcdd1c56ba67274b7cff3e1cea',
  prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
  merkleRoot: '730f0c8ddc5a592d5512566890e2a73e45feaa6748b24b849d1c29a7ab2b2300',
  time: 1371488396,
  bits: 504365040, // 0x1e0ffff0
  nonce: 1000112548,
  height: 0
};

/**
 * The network's genesis block in a hex string.
 * @const {String}
 */

main.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '0000232baba7291c9d844bb24867aafe453ea7e290685612552d595adc8d0c0f738c40'
  + 'bf51f0ff0f1ea4819c3b01020000000100000000000000000000000000000000000000'
  + '00000000000000000000000000ffffffff4904ffff001d010441536c617368646f7420'
  + '2d203137204a756e652032303133202d20536175646920417261626961205365742054'
  + '6f2042616e2057686174734170702c20536b797065ffffffff0100e40b540200000043'
  + '41040184710fa689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d3eb4b10'
  + 'f4d4604fa08dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9ac000000'
  + '001d746578743a466c6f72696e636f696e2067656e6573697320626c6f636b';

/**
 * POW-related constants.
 * @enum {Number}
 * @default
 */

main.pow = {
  /**
   * Default target.
   * @const {BN}
   */

  limit: new BN(
    '00000fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),

  /**
   * Compact pow limit.
   * @const {Number}
   * @default
   */

  bits: 504365055,

  /**
   * Minimum chainwork for best chain.
   * @const {BN}
   */

  chainwork: new BN(
    '00000000000000000000000000000000000000000000000011f1db4843f05806',
    'hex'
  ),

  /**
   * Desired retarget period in seconds.
   * @const {Number}
   * @default
   */

  targetTimespan: 3.5 * 24 * 60 * 60,

  /**
   * Average block time.
   * @const {Number}
   * @default
   */

  targetSpacing: 40,

  /**
   * Retarget interval in blocks.
   * @const {Number}
   * @default
   */

  retargetInterval: 2016,

  /**
   * Whether to reset target if a block
   * has not been mined recently.
   * @const {Boolean}
   * @default
   */

  targetReset: false,

  /**
   * Do not allow retargetting.
   * @const {Boolean}
   * @default
   */

  noRetargeting: false
};

/**
 * Block constants.
 * @enum {Number}
 * @default
 */

main.block = {
  /**
   * Height at which bip34 was activated.
   * Used for avoiding bip30 checks.
   */

  bip34height: 1679161,

  /**
   * Hash of the block that activated bip34.
   */

  bip34hash: '490a10507efe42b89104408787088b7c43310cc230310201b5f57dac6f513b8b',

  /**
   * Height at which bip65 was activated.
   */

  bip65height: 1679161,

  /**
   * Hash of the block that activated bip65.
   */

  bip65hash: '490a10507efe42b89104408787088b7c43310cc230310201b5f57dac6f513b8b',

  /**
   * Height at which bip66 was activated.
   */

  bip66height: 1679161,

  /**
   * Hash of the block that activated bip66.
   */

  bip66hash: '490a10507efe42b89104408787088b7c43310cc230310201b5f57dac6f513b8b',

  /**
   * Safe height to start pruning.
   */

  pruneAfterHeight: 1000,

  /**
   * Safe number of blocks to keep.
   */

  keepBlocks: 288,

  /**
   * Age used for the time delta to
   * determine whether the chain is synced.
   */

  maxTipAge: 24 * 60 * 60,

  /**
   * Height at which block processing is
   * slow enough that we can output
   * logs without spamming.
   */

  slowHeight: 900000
};

/**
 * Map of historical blocks which create duplicate transactions hashes.
 * @see https://github.com/bitcoin/bips/blob/master/bip-0030.mediawiki
 * @const {Object}
 * @default
 */

main.bip30 = {};

/**
 * For versionbits.
 * @const {Number}
 * @default
 */

main.activationThreshold = 6048; // 75% of 8064

/**
 * Confirmation window for versionbits.
 * @const {Number}
 * @default
 */

main.minerWindow = 8064; // nPowTargetTimespan / nPowTargetSpacing * 4

/**
 * Deployments for versionbits.
 * @const {Object}
 * @default
 */

main.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 1522562766, // April 1st, 2018
    timeout: 1554098766, // April 1st, 2019
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 1522562766, // April 1st, 2018
    timeout: 1554098766, // April 1st, 2019
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 1199145601, // January 1, 2008
    timeout: 1230767999, // December 31, 2008
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

/**
 * Deployments for versionbits (array form, sorted).
 * @const {Array}
 * @default
 */

main.deploys = [
  main.deployments.csv,
  main.deployments.segwit,
  main.deployments.testdummy
];

/**
 * Key prefixes.
 * @enum {Number}
 * @default
 */

main.keyPrefix = {
  privkey: 0xa3,
  xpubkey: 0x0134406b,
  xprivkey: 0x01343c31,
  xpubkey58: 'Fpub',
  xprivkey58: 'Fprv',
  coinType: 0
};

/**
 * {@link Address} prefixes.
 * @enum {Number}
 */

main.addressPrefix = {
  pubkeyhash: 0x23,
  scripthash: 0x08,
  scripthash2: 0x5e,
  witnesspubkeyhash: 0x06,
  witnessscripthash: 0x0a,
  bech32: 'flo'
};

/**
 * Default value for whether the mempool
 * accepts non-standard transactions.
 * @const {Boolean}
 * @default
 */

main.requireStandard = true;

/**
 * Default http port.
 * @const {Number}
 * @default
 */

main.rpcPort = 7313;

/**
 * Default min relay rate.
 * @const {Rate}
 * @default
 */

main.minRelay = 10000;

/**
 * Default normal relay rate.
 * @const {Rate}
 * @default
 */

main.feeRate = 1000000;

/**
 * Maximum normal relay rate.
 * @const {Rate}
 * @default
 */

main.maxFeeRate = 4000000;

/**
 * Whether to allow self-connection.
 * @const {Boolean}
 */

main.selfConnect = false;

/**
 * Whether to request mempool on sync.
 * @const {Boolean}
 */

main.requestMempool = false;

/*
 * Testnet (v3)
 * https://en.bitcoin.it/wiki/Testnet
 */

const testnet = {};

testnet.type = 'testnet';

testnet.seeds = [
  'testnet.oip.fun'
];

testnet.magic = 0xfdc05af2;

testnet.port = 17312;

testnet.checkpointMap = {
  2056: '8932a8789c96c516d8a1080a29c7e7e387d2397a83864f9adcaf97ba318a7417',
};

testnet.lastCheckpoint = 2056;

testnet.halvingInterval = 840000;

testnet.genesis = {
  version: 1,
  hash: '9b7bc86236c34b5e3a39367c036b7fe8807a966c22a7a1f0da2a198a27e03731',
  prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
  merkleRoot: '730f0c8ddc5a592d5512566890e2a73e45feaa6748b24b849d1c29a7ab2b2300',
  time: 1371387277,
  bits: 504365040,
  nonce: 1000580675,
  height: 0
};

testnet.genesisBlock =
  '010000000000000000000000000000000000000000000000000000000000000000000'
  + '00000232baba7291c9d844bb24867aafe453ea7e290685612552d595adc8d0c0f738d'
  + 'b5bd51f0ff0f1e43a6a33b01020000000100000000000000000000000000000000000'
  + '00000000000000000000000000000ffffffff4904ffff001d010441536c617368646f'
  + '74202d203137204a756e652032303133202d205361756469204172616269612053657'
  + '420546f2042616e2057686174734170702c20536b797065ffffffff0100e40b540200'
  + '00004341040184710fa689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d'
  + '3eb4b10f4d4604fa08dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9'
  + 'ac000000001d746578743a466c6f72696e636f696e2067656e6573697320626c6f636b';

testnet.pow = {
  limit: new BN(
    '00000fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),
  bits: 504365055,
  chainwork: new BN(
    '000000000000000000000000000000000000000000000000000000083540886d',
    'hex'
  ),
  targetTimespan: 3.5 * 24 * 60 * 60,
  targetSpacing: 40,
  retargetInterval: 1,
  targetReset: true,
  noRetargeting: false
};

testnet.block = {
  bip34height: 33600,
  bip34hash: '4ac31d938531317c065405a9b23478c8c99204ff17fc294cb09821e2c2b42e65',
  bip65height: 33600,
  bip65hash: '4ac31d938531317c065405a9b23478c8c99204ff17fc294cb09821e2c2b42e65',
  bip66height: 33600,
  bip66hash: '4ac31d938531317c065405a9b23478c8c99204ff17fc294cb09821e2c2b42e65',
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 24 * 60 * 60,
  slowHeight: 950000
};

testnet.bip30 = {};

testnet.activationThreshold = 1512; // 75% for testchains

testnet.minerWindow = 2016; // nPowTargetTimespan / nPowTargetSpacing

testnet.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 1483228800, // January 1, 2017
    timeout: 1530446401, // July 1, 2018
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 1483228800, // January 1, 2017
    timeout: 1530446401, // July 1, 2018
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 1199145601, // January 1, 2008
    timeout: 1230767999, // December 31, 2008
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

testnet.deploys = [
  testnet.deployments.csv,
  testnet.deployments.segwit,
  testnet.deployments.testdummy
];

testnet.keyPrefix = {
  privkey: 0xef,
  xpubkey: 0x013440e2,
  xprivkey: 0x01343c23,
  xpubkey58: 'Fput',
  xprivkey58: 'Fprt',
  coinType: 1
};

testnet.addressPrefix = {
  pubkeyhash: 0x73,
  scripthash: 0xc6,
  scripthash2: 0x3a,
  witnesspubkeyhash: 0x03,
  witnessscripthash: 0x28,
  bech32: 'tflo'
};

testnet.requireStandard = false;

testnet.rpcPort = 17312;

testnet.minRelay = 1000;

testnet.feeRate = 20000;

testnet.maxFeeRate = 60000;

testnet.selfConnect = false;

testnet.requestMempool = false;

/*
 * Regtest
 */

const regtest = {};

regtest.type = 'regtest';

regtest.seeds = [
  '127.0.0.1'
];

regtest.magic = 0xfabfb5da;

regtest.port = 17412;

regtest.checkpointMap = {};
regtest.lastCheckpoint = 0;

regtest.halvingInterval = 150;

regtest.genesis = {
  version: 1,
  hash: 'ec42fa26ca6dcb1103b59a1d24b161935ea4566f8d5736db8917d5b9a8dee0d7',
  prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
  merkleRoot: '730f0c8ddc5a592d5512566890e2a73e45feaa6748b24b849d1c29a7ab2b2300',
  time: 1371387277,
  bits: 545259519,
  nonce: 0,
  height: 0
};

// @TODO: Add Genesis Block hex for Flo Regtest
regtest.genesisBlock =
  '010000000000000000000000000000000000000000000000000000000000000000000'
  + '000d9ced4ed1130f7b7faad9be25323ffafa33232a17c3edf6cfd97bee6bafbdd97da'
  + 'e5494dffff7f200000000001010000000100000000000000000000000000000000000'
  + '00000000000000000000000000000ffffffff4804ffff001d0104404e592054696d65'
  + '732030352f4f63742f32303131205374657665204a6f62732c204170706c65e280997'
  + '320566973696f6e6172792c2044696573206174203536ffffffff0100f2052a010000'
  + '004341040184710fa689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d3e'
  + 'b4b10f4d4604fa08dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9ac'
  + '00000000';

regtest.pow = {
  limit: new BN(
    '7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),
  bits: 545259519,
  chainwork: new BN(
    '0000000000000000000000000000000000000000000000000000000000000000',
    'hex'
  ),
  targetTimespan: 3.5 * 24 * 60 * 60,
  targetSpacing: 40,
  retargetInterval: 2016,
  targetReset: true,
  noRetargeting: true
};

regtest.block = {
  bip34height: 0xffffffff,
  bip34hash: null,
  bip65height: 1351,
  bip65hash: null,
  bip66height: 1251,
  bip66hash: null,
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 0xffffffff,
  slowHeight: 0
};

regtest.bip30 = {};

regtest.activationThreshold = 108; // 75% for testchains

regtest.minerWindow = 144; // Faster than normal for regtest

regtest.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

regtest.deploys = [
  regtest.deployments.csv,
  regtest.deployments.segwit,
  regtest.deployments.testdummy
];

regtest.keyPrefix = {
  privkey: 0xef,
  xpubkey: 0x043587cf,
  xprivkey: 0x04358394,
  xpubkey58: 'xpub',
  xprivkey58: 'xprv',
  coinType: 1
};

regtest.addressPrefix = {
  pubkeyhash: 0x6f,
  scripthash: 0xc4,
  scripthash2: 0x3a,
  witnesspubkeyhash: 0x03,
  witnessscripthash: 0x28,
  bech32: 'rltc'
};

regtest.requireStandard = false;

regtest.rpcPort = 19445;

regtest.minRelay = 1000;

regtest.feeRate = 20000;

regtest.maxFeeRate = 60000;

regtest.selfConnect = true;

regtest.requestMempool = true;

/*
 * Simnet (btcd)
 */

const simnet = {};

simnet.type = 'simnet';

simnet.seeds = [
  '127.0.0.1'
];

simnet.magic = 0x12141c16;

simnet.port = 18555;

simnet.checkpointMap = {};

simnet.lastCheckpoint = 0;

simnet.halvingInterval = 210000;

simnet.genesis = {
  version: 1,
  hash: 'f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68',
  prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
  merkleRoot:
    '3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a',
  time: 1401292357,
  bits: 545259519,
  nonce: 2,
  height: 0
};

simnet.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a4506'
  + '8653ffff7f200200000001010000000100000000000000000000000000000000000000'
  + '00000000000000000000000000ffffffff4d04ffff001d0104455468652054696d6573'
  + '2030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66'
  + '207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01'
  + '000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f'
  + '61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f'
  + 'ac00000000';

simnet.pow = {
  limit: new BN(
    // High target of 0x207fffff (545259519)
    '7fffff0000000000000000000000000000000000000000000000000000000000',
    'hex'
  ),
  bits: 545259519,
  chainwork: new BN(
    '0000000000000000000000000000000000000000000000000000000000000002',
    'hex'
  ),
  targetTimespan: 3.5 * 24 * 60 * 60,
  targetSpacing: 2.5 * 60,
  retargetInterval: 2016,
  targetReset: true,
  noRetargeting: false
};

simnet.block = {
  bip34height: 0,
  bip34hash: 'f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68',
  bip65height: 0,
  bip65hash: 'f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68',
  bip66height: 0,
  bip66hash: 'f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68',
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 0xffffffff,
  slowHeight: 0
};

simnet.bip30 = {};

simnet.activationThreshold = 75; // 75% for testchains

simnet.minerWindow = 100; // nPowTargetTimespan / nPowTargetSpacing

simnet.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 0, // March 1st, 2016
    timeout: 0xffffffff, // May 1st, 2017
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 0, // May 1st 2016
    timeout: 0xffffffff, // May 1st 2017
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  segsignal: {
    name: 'segsignal',
    bit: 4,
    startTime: 0xffffffff,
    timeout: 0xffffffff,
    threshold: 269,
    window: 336,
    required: false,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 1199145601, // January 1, 2008
    timeout: 1230767999, // December 31, 2008
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

simnet.deploys = [
  simnet.deployments.csv,
  simnet.deployments.segwit,
  simnet.deployments.segsignal,
  simnet.deployments.testdummy
];

simnet.keyPrefix = {
  privkey: 0x64,
  xpubkey: 0x0420bd3a,
  xprivkey: 0x0420b900,
  xpubkey58: 'spub',
  xprivkey58: 'sprv',
  coinType: 115
};

simnet.addressPrefix = {
  pubkeyhash: 0x3f,
  scripthash: 0x7b,
  witnesspubkeyhash: 0x19,
  witnessscripthash: 0x28,
  bech32: 'sc'
};

simnet.requireStandard = false;

simnet.rpcPort = 18556;

simnet.minRelay = 1000;

simnet.feeRate = 20000;

simnet.maxFeeRate = 60000;

simnet.selfConnect = false;

simnet.requestMempool = false;

/*
 * Expose
 */

network.main = main;
network.testnet = testnet;
network.regtest = regtest;
network.simnet = simnet;
