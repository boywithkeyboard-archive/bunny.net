## bunny.net(.js)

### Setup

#### Deno

```ts
import { SMS } from 'https://esm.sh/bunny.net'
```

#### Node.js

```bash
npm i bunny.net
```

```ts
import { SMS } from 'bunny.net'
```

### Usage

> [!IMPORTANT]
> You need to open a [bunny.net](https://bunny.net) account first to use this module. After you have signed up, you can get your API token [here](https://dash.bunny.net/account/settings).

```ts
const bunny = new Client({
  token: '...'
})
```

### Roadmap

- [x] **DNS Zone** *(available as `dns`)*

  - [ ] `listZones()`
  - [x] `addZone()`
  - [x] `getZone()`
  - [ ] `updateZone()`
  - [x] `deleteZone()`
  - [ ] `exportRecords()`
  - [ ] `getQueryStatistics()`
  - [ ] `checkZoneAvailability()`
  - [x] `addRecord()`
  - [x] `updateRecord()`
  - [x] `deleteRecord()`
  - [ ] `importRecords()`
