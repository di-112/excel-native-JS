import './test_module'
import './scss/index.scss'

console.log('project start')

async function start() {
  return await Promise.resolve('propmise resolve')
}

start().then(console.log)
