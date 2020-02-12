import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import driverController from './controller/driver.controller'
import { createFixtures } from './database/fixtures'
import http from 'http'
import WebSockets from './websockets'
import cors from 'koa-cors'
import Worker from './worker'
const PORT = process.env.PORT ? process.env.PORT : 3000
const FIXTURES = process.env.FIXTURES ? process.env.FIXTURES : false

const server = () => new Promise(async (resolve, reject) => {

  if(FIXTURES){
    await createFixtures()
  }
 
  const app = new Koa()
  const server = http.createServer(app.callback())
  const webSockets = new WebSockets({ server })
  const worker = new Worker()
  worker.start(1000)

  app.use(cors())
  app.use(bodyParser())
  app.use(driverController.routes())
  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
    resolve(server)
  })

})

export default server