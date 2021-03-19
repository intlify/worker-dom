import { attachWorker } from '@intlify/worker-dom/dist/lib/main.mjs'
import Worker from './worker?worker'

;(async () => {
  const worker = await attachWorker(document.body, new Worker())

  const button = document.querySelector('button')
  button!.onclick = async () => {
    const val = await worker.callFunction('addElement', 'hello wokrer-dom')
    console.log('result', val)
  }
})();
