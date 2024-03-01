## bunny.net(.js)

### Setup

#### Deno

```ts
import { Client } from 'https://esm.sh/bunny.net'
```

#### Node.js

```bash
npm i bunny.net
```

```ts
import { Client } from 'bunny.net'
```

### Usage

> [!IMPORTANT]
> You need to open a [bunny.net](https://bunny.net) account first to use this module. After you have signed up, you can get your API token [here](https://dash.bunny.net/account/settings).

```ts
const bunny = new Client({
  token: '...'
})
```

### Guide

#### Error Handling

All functions return an object with the `data` and `error` properties. The `error` property is either `true` or `false`, depending on the status code of the response.

If the `error` property is `false`, you can access the response data in the `data` property.

```ts
const { data, error } = await bunny.method()

if (!error) {
  // do smth with response data
} else {
  // handle error
}
```

#### Debugging

If you encounter issues, you should enable **debug mode**.

```ts
new Client({
  debug: true
})
```

If the response from the API is erroneous, the response body is printed out on the console in addition to the behavior described above.
