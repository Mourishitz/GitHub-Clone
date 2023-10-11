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
        Accept: 'application/vnd.github+json'
      }
    });

    return response.data as UserResource[];
  }

  /**
   * Get a User object by username.
   * 
   * @param username 
   * @returns Promise<UserResource>
   * @throws HttpServiceException
   */
  public async getUser(username: string): Promise<UserResource>{
    try {
      const response = await this.get(`/users/${username}`, {
        headers: {
          Accept: 'application/vnd.github+json'
        }
      });

      if(response.status === 404){
        throw new HttpServiceException('User not found.');
      } 

      return response.data as UserResource;
    } catch (error) {
      console.error(error);
    }
  }

  public async getRepositoriesForUser(username: string): Promise<RepositoryResource[]> {
    try {
      const user: UserResource = await this.getUser(username);

      if(!user){
        throw new HttpServiceException('User not found');
      }

      const repository = await this.get(`/users/${username}/repos`);

      return repository.data as RepositoryResource[]

    } catch (error) {
      console.error(error);
    }
  }
};

export default new GitHubService()
