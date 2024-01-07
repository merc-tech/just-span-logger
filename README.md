# Just Span Logger
For collect and get count per time report

## Features

### Event
- [x] Create event
- [ ] List all event with total count
- [ ] List all event logs
- [x] Generate event report per time unit (Minute, Hour, Day, Month and Year)


## Backend

### How to run

1. Change current directory to `backend`
2. Install dependencies `yarn install`
3. Run with `yarn run start:dev`

### API document

**Require**
- Vscode
- Extension REST Client

Try and view in file `request.http`

### Environments
| Key | Example | Description |
| -- | -- | --|
| PORT | 8080 | Application listen port |
| DATABASE_URL | postgresql://postgres:super_secrure@localhost:5432/just-span-logger?schema=public | Postgres Connection String|