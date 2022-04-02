# SWIFT MT940 bank file injest

## Description

MT940-injest retrieve and parse SWIFT mt940 bank file types from a listener on a specific directory

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run with docker-compose

```bash
$ docker-compose up --build
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Env variable

Here is a list of available environment variables:

| Name               | Description                             |
| ------------------ | --------------------------------------- |
| APP_PORT           | Application port                        |
| DATABASE_URL       | Database URI (PostgreSQL, MySQL etc...) |
| FILE_REGEX_PATTERN | File validation regex                   |
| FILE_REGEX_FLAG    | Regex flag (i, g) default to g          |
| PATH_TO_FOLDER     | Folder application should looking for   |
| LOG_LEVEL          | App log level                           |

## Contributing 🤝

> Feel free to follow the procedure to make it even more awesome!

1. Create an `issue` so we `get the discussion started`
2. Fork it!
3. Create your feature branch: `git checkout -b my-new-feature`
4. Commit your changes: `git commit -am 'Add some feature'`
5. Push to the branch: `git push origin my-new-feature`
6. Submit a pull request

## Standard references

- https://www2.swift.com/knowledgecentre/publications/us9m_20180720/2.0
- https://www.paiementor.com/payment-messages/
- https://www.paiementor.com/swift-mt-message-structure-blocks-1-to-5/
- https://www.nordea.se/Images/39-16149/MT940-file-description.pdf
