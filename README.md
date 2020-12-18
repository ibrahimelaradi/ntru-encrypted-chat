# NTRU Encrypted Chat

A minimal chat system that encrypts messages sent over the socket using NTRUEncrypt

## Scripts

### `yarn build:ntru`

Build the NTRU package and store built files into [./ntru/dist](./ntru/dist)
`yarn fullbuild:ntru` also installs the node modules before building

### `yarn build:server`

Build the server and store built files into [./ntru/dist](./server/dist)
`yarn fullbuild:server` also installs the node modules before building

### `yarn build:app`

Build the chat app and store built files into [./ntru/dist](./app/dist)
`yarn fullbuild:app` also installs the node modules before building

### `yarn buildall`

Recommended, builds all projects starting with `ntru`, then `server`, then `app`

### `yarn fullbuildall`

Recommended on fresh clone, installs all node modules and builds all projects

### `yarn start:`[`server`/`app`]

Starts the execution of the corresponding project

## Why?

Implemented as a term project for CMSE491 - Selected Topics by [Samer El Chami](https://github.com/samerelchami) and [Ibrahim Elaradi](https://github.com/ibrahimelaradi)

## License

Copyright © 2020 [Ibrahim Elaradi](https://github.com/ibrahimelaradi), [Samer El Chami](https://github.com/samerelchami)
