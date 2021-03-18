import { ready, exportFunction } from '@intlify/worker-dom/dist/lib/worker.mjs'

let counter = 0

function addElement(msg: string) {
  console.log('call addElement', msg)
  const el = document.createElement('p')
  el.textContent = `${msg} ${counter++}`
  document.body.appendChild(el)
  return counter
}

[addElement].map(fn => {
  exportFunction(fn.name, fn)
})

async function run() {
  await ready

  // dom mutation
  const el = document.createElement('h2')
  el.textContent = 'hello from worker'
  document.body.appendChild(el)

  // handler
  const button = document.querySelector('button')
  button.onclick = (ev) => {
    console.log('button:onclick', ev)
  }
}

run()
