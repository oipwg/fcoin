# Fcoin (Bcoin ported to Lcoin ported to Flo)

## Differences between this repo and [bcoin-org/bcoin](https://github.com/bcoin-org/bcoin)

* Based on latest bcoin repo, pick flo related commits from bcoin-org/fcoin, applied some modifications and fixed more tests.
* **May rebase and `push --force` frequently, to catch up with bcoin and make repo easy to maintain.**

## TODO

* [ ] Fix tests:
    * [ ] block-test
    * [ ] tx-test

## Fcoin

__NOTE__: The latest release of fcoin contains a non-backward compatible change
to the rest API. Please read the [changelog]'s "migrating" section for more
details.

---

**Fcoin** is an alternative implementation of the flo protocol, written in
node.js.

Bcoin, the parent project, is well tested and aware of all known consensus rules. It is currently
used in production as the consensus backend and wallet system for
[purse.io][purse].

## Uses

- Full Node
- SPV Node
- Wallet Backend (bip44 derivation)
- Mining Backend (getblocktemplate support)
- Layer 2 Backend (lightning)
- General Purpose Bitcoin Library

Try it in the browser: [https://bcoin.io/browser/](https://bcoin.io/browser/)

## Install

```
$ git clone git://github.com/oipwg/fcoin.git
$ cd fcoin
$ docker build -t fcoin:dev .
$ docker run fcoin:dev
```

See the [Getting started][guide] guide for more in-depth installation
instructions, including verifying releases.

## Documentation

- General docs: [docs/](docs/README.md)
- Wallet and node API docs: https://bcoin.io/api-docs/
- Library API docs: https://bcoin.io/docs/

## Support

Join us on [freenode][freenode] in the [#bcoin][irc] channel.

## Development
Use the docker container for development, it will offer quick reloading and a consistent development environment. If you try to run `npm install` locally you might run into version issues with node-gyp

## Disclaimer

Fcoin does not guarantee you against theft or lost funds due to bugs, mishaps,
or your own incompetence. You and you alone are responsible for securing your
money.

## Contribution and License Agreement

If you contribute code to this project, you are implicitly allowing your code
to be distributed under the MIT license. You are also implicitly verifying that
all code is your original work. `</legalese>`

## License

- Copyright (c) 2014-2015, Fedor Indutny (MIT License).
- Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).

See LICENSE for more info.

[purse]: https://purse.io
[guide]: docs/getting-started.md
[freenode]: https://freenode.net/
[irc]: irc://irc.freenode.net/bcoin
[changelog]: CHANGELOG.md

[coverage-status-img]: https://codecov.io/gh/bcoin-org/bcoin/badge.svg?branch=master
[coverage-status-url]: https://codecov.io/gh/bcoin-org/bcoin?branch=master
[circleci-status-img]: https://circleci.com/gh/bcoin-org/bcoin/tree/master.svg?style=shield
[circleci-status-url]: https://circleci.com/gh/bcoin-org/bcoin/tree/master
