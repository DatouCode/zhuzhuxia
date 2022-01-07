import express from 'express'
import {Tedis} from "tedis";

const app = express()
const PORT = 8000

const tedis = new Tedis({
  port: 6379,
  host: '146.56.104.130',
  password: 'zhuzhuxia'
});

app.get('/', (req, res) => {
  res.send({path: "/"})
})

app.get('/signDays', (req, res) => {
  tedis.smembers('zsw').then(record => {
    res.send(record)
  })
})

app.get('/sign', (req, res) => {
  console.log(req.query.today)
  console.log(typeof req.query.today)
  tedis.sadd('zsw', req.query.today as string).then(record => {
    res.send(record)
  })
})

app.get('/danger', (req, res) => {
  tedis.srem('zsw', String(req.query.today)).then(_ => {
    res.sendStatus(200)
  })
})

app.listen(PORT, () => {
  console.log(`Listening http://localhost:${PORT}`)
})