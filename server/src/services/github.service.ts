import UserDetails from 'src/resources/user-details.resource';
import RepositoryResource from '../resources/repository.resource';
import type UserResource from '../resources/user.resource'
import { AxiosHttpService } from './http/axios-http.service'
import { HttpServiceException } from './http/exceptions/HttpServiceException';

class GitHubService extends AxiosHttpService {

  constructor(){
    super('https://api.github.com');
  }

  /**
   * Get an array of Users based on parameters passed.
   * 
   * @param since 
   * @param limit 
   * @returns Promise<UserResource[]>
   */
  public async getUsers(since?: number, limit: number = 10): Promise<UserResource[]>{
    const response = await this.get(`/users?since=${since}&per_page=${limit}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      }
    });

    return response.data as UserResource[];
  }

  /**
   * Get a User object by username.
   * 
   * @param username 
   * @returns Promise<UserDetails>
   * @throws HttpServiceException
   */
  public async getUser(username: string): Promise<UserDetails>{
    try {
      const response = await this.get(`/users/${username}`, {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        }
      });

      if(response.status === 404){
        throw new HttpServiceException('User not found.');
      } 

      return response.data as UserDetails;
    } catch (error) {
      console.error(error);
    }
  }


  /**
   * Get a list of user's repositories. 
   * The amount of repositories returned may be controlled by the amount parameter.
   * 
   * @param username 
   * @param amount 
   * @returns Promise<RepositoryResource[]>
   * @throws HttpServiceException
   */
  public async getRepositoriesForUser(username: string, amount: number = 5, page: number = 1): Promise<RepositoryResource[]> {
    try {
      const user: UserDetails = await this.getUser(username);

      if(!user){
        throw new HttpServiceException('User not found');
      }

      const repository = await this.get(`/users/${username}/repos?per_page=${amount}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
        }
      });

      return repository.data as RepositoryResource[]

    } catch (error) {
      console.error(error);
    }
  }
};

export default new GitHubService()
