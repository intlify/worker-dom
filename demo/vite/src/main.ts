import { attachWorker } from '@intlify/worker-dom/dist/lib/main.mjs'
import Worker from './worker?worker'

;(async () => {
  const el = document.getElementById('app')
  const worker = new Worker()
  const exportedWorker = await attachWorker(el, worker)

  const button = document.querySelector('button')
  button.onclick = async (ev) => {
    const val = await exportedWorker.callFunction('addElement', 'hello wokrer-dom')
    console.log('result', val)
  }
})();
