import express, { type Request, type Response, type Router } from 'express'
import GitHubService from '../services/github.service'
import UserResource from '../resources/user.resource'
import RepositoryResource from '../resources/repository.resource'
import UserDetails from 'src/resources/user-details.resource'

const userController: Router = express.Router()

userController.get('/', async (request: Request, response: Response) => {
  const [since, limit] = [request.query['since'], request.query['limit']];

  const users: UserResource[] = await GitHubService.getUsers(+since, +limit);

  const next = `${process.env.BASE_URL}/api/users/?since=${users.at(-1).id}&limit=${limit}`

  const previous = `${process.env.BASE_URL}/api/users/?since=${(users.at(0).id - (+limit)) - 1}&limit=${limit}`

  response.json({
    'data': users,
    'next': next,
    'previous': previous
  })
})

userController.get('/:username/details', async(request: Request, response: Response) => {
  const user: UserDetails = await GitHubService.getUser(request.params['username']);

  if(!user){
    response.status(404);
    response.json({
      'message': 'User not found.'
    });
    return;
  }

  response.json({
    'data': user
  })
})

userController.get('/:username/repos', async(request: Request, response: Response) => {
  const user: UserDetails = await GitHubService.getUser(request.params['username']);
  const amount: number = +(request.query['amount'])
  const page: number = +(request.query['page'] ?? 1)

  if(!user){
    response.status(404);
    response.json({
      'message': 'User not found.'
    });
    return;
  }

  const repositories: RepositoryResource[] = await GitHubService.getRepositoriesForUser(user.login, amount, page);

  const next = (amount * page >= user.public_repos) 
    ? null 
    : `${process.env.BASE_URL}/api/users/${user.login}/repos?amount=${amount}&page=${page + 1}`;

  const previous = page > 1 
    ? `${process.env.BASE_URL}/api/users/${user.login}/repos?amount=${amount}&page=${page - 1}` 
    : null;

  response.json({
    'data': repositories,
    'next': next,
    'previous': previous
  })
})

export { userController }
