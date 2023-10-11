import express, { type Express } from 'express'
import { userController } from './controllers'
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

const api: Express = express()
const port: number = 3000

api.use('/api/users', userController)

api.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
