import express from 'express'
import {Tedis} from "tedis";

const app = express()
const PORT = 8000

const tedis = new Tedis({
  port: 6379,
  host: '146.56.104.130',
  password: 'zhuzhuxia'
});

app.get('/signDays', (req: any, res) => {
  tedis.smembers(req.query.user).then(record => {
    res.send(record)
  })
})

app.get('/sign', (req: any, res) => {
  tedis.sadd(req.query.user, req.query.today).then(_ => {
    res.sendStatus(200)
  })
})

app.get('/danger', (req: any, res) => {
  tedis.srem(req.query.user, req.query.today).then(_ => {
    res.sendStatus(200)
  })
})

app.listen(PORT, () => {
  console.log(`Listening http://localhost:${PORT}`)
})