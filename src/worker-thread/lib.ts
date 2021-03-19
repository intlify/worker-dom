/**
 * Copyright 2021 The Intlify Project Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Useful library By mizchi
 * Modified by kazuya kawaguchi
 * https://github.com/mizchi/worker-dom/blob/main/src/worker-thread/lib.ts
 */

import { hydrate, workerDOM } from './index';
import { TransferrableKeys } from '../transfer/TransferrableKeys';
import { HydrateableNode } from '../transfer/TransferrableNodes';
import { callFunctionMessageHandler, exportFunction } from './function';

// @ts-ignore
self.window = self;

export function exportFunctions(fns: Function[]): void {
  fns.map(fn => exportFunction(fn.name, fn));
}

let _resolve: Function | null = null;
export const ready = new Promise((resolve) => {
  _resolve = resolve;
});

function onMessageInit(ev: MessageEvent) {
  if ('__init__' in ev.data) {
    const args = ev.data.__init__ as [
      string[],
      HydrateableNode,
      string[],
      string[],
      [number, number],
      { [key: string]: string },
      { [key: string]: string },
    ];
    // @ts-ignore
    hydrate(workerDOM.document, ...args);

    workerDOM.document[TransferrableKeys.observe]();
    Object.keys(workerDOM).forEach((k) => {
      // @ts-ignore
      self[k] = workerDOM[k];
    });
    _resolve && _resolve();
  } else {
    callFunctionMessageHandler(ev, workerDOM.document);
  }
}

self.addEventListener('message', onMessageInit);
