import express, { type Request, type Response, type Router } from 'express'

const userController: Router = express.Router()

userController.get('/', (request: Request, response: Response) => {
  // TODO: Implement UserService calls to GitHub

  response.json({
    'message': 'hi mom!'
  })
})

export { userController }
