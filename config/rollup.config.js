/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
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
 * Modified by mizchi
 * https://github.com/mizchi/worker-dom/blob/7f8b0295b757f1988e853c79858af682e850c312/config/rollup.config.js#L19-L21
 */

import MainThreadBuilds from './rollup.main-thread.js';
import WorkerThreadBuilds from './rollup.worker-thread.js';
import LibBuilds from './rollup.lib.js';

export default [...MainThreadBuilds, ...WorkerThreadBuilds, ...LibBuilds];
