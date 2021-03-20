# WorkerDOM

## What's difference from Original?

- Modify & Inspire useful APIs from [@mizchi/worker-dom](https://github.com/mizchi/worker-dom)
- Your Web Wroker can be used as the WorkerDOM

### Installation

```sh
npm install @intlify/worker-dom --save
```

### APIs
- `attachWorker(element: HTMLElement, worker: Worker): Promise<ExportedWoker>`
  - Attach your web worker on main-thread
- `ready` on worker to connect `attachWorker`
  - Wait for the WorkerDOM to be ready by `attachWorker`
- `exportFunctions(functions: Function[] | Record<string, Function>): void`
  - Export functions in the WorkerDOM that can be called from the main-thread

### Example for Vite

```js
// worker.js
import { ready, exportFunctions } from '@intlify/worker-dom/dist/lib/worker'

// define your functions on worker
function add(a, b) {
  const ret = a + b
  const el = document.createElement('p')
  el.textContent = ret.toString()
  document.body.appendChild(el)
  return ret
}

// export worker functions
exportFunctions([add])

// wait for ready
await ready

// should keep same content with main-thread on init.
document.body.firstChild.textContent = 'hello from worker mutate'
```

```js
// main.js
import { attachWorker } from '@intlify/worker-dom/dist/lib/main'
import Worker from './woker?worker';

// attach worker to dom
const worker = await attachWorker(document.querySelector('#root'), new Worker())

// call function that is exported from worker
const result = await woker.callFunction('add', 1, 1)
```


### Example for Webpack

```js
// webpack.config.js
const WorkerPlugin = require("worker-plugin");
module.exports = {
  // ...
  plugins: [new WorkerPlugin()]
}
```

```js
// worker.js
import { ready } from "@intlify/worker-dom/dist/lib/worker";

ready.then(() =>{ 
  // should keep same content with main-thread on init.
  document.body.firstChild.textContent = 'hello from worker mutate';
});
```

```js
// main.js
import { attachWorker } from "@intlify/worker-dom/dist/lib/main";

// Create worker by your own way
const worker = new Worker("./worker.js", { type: "module" });

// attach worker to dom
attachWorker(document.querySelector('#root'), worker);
```

## LICENSE

worker-dom is licensed under the [Apache License, Version 2.0](LICENSE).
