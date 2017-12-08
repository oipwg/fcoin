/* eslint-env mocha */
/* eslint prefer-arrow-callback: "off" */

'use strict';

const assert = require('./util/assert');
const KeyRing = require('../lib/primitives/keyring');

const uncompressed = KeyRing.fromSecret(
  '6vrJ6bnKwaSuimkkRLpNNziSjqwZCG59kfFC9P2kjbUUs5Y6Cw9');

const compressed = KeyRing.fromSecret(
  'TAgaTiX4btdMhNY6eSU5N5jvc71o6hXKdhoeBzEk31AHykGDou8i');

describe('KeyRing', function() {
  it('should get uncompressed public key', () => {
    assert.strictEqual(
      '04a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd5b'
      + '8dec5235a0fa8722476c7709c02559e3aa73aa03918ba2d492eea75abea235',
      uncompressed.getPublicKey('hex'));
  });

  it('should get uncompressed public key address', () => {
    assert.strictEqual(
      'Lbnu1x4UfToiiFGU8MvPrLpj2GSrtUrxFH',
      uncompressed.getKeyAddress('base58'));
  });

  it('should get uncompressed WIF', () => {
    assert.strictEqual(
      '6vrJ6bnKwaSuimkkRLpNNziSjqwZCG59kfFC9P2kjbUUs5Y6Cw9',
      uncompressed.toSecret());
  });

  it('should get compressed public key', () => {
    assert.strictEqual(
      '03a34b99f22c790c4e36b2b3c2c35a36db06226e41c692fc82b8b56ac1c540c5bd',
      compressed.getPublicKey('hex'));
  });

  it('should get compressed public key address', () => {
    assert.strictEqual(
      'LZGpRyQPybaDjbRGoB87YH2ebFnmKYmRui',
      compressed.getKeyAddress('base58'));
  });

  it('should get compressed WIF', () => {
    assert.strictEqual(
      'TAgaTiX4btdMhNY6eSU5N5jvc71o6hXKdhoeBzEk31AHykGDou8i',
      compressed.toSecret());
  });
});
