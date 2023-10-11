import { GetUsersResponse } from '../resources/get-users.resource';
import UserDetails from '../resources/user-details.resource';
import { AxiosHttpService } from './http/axios-http.service'

class GitHubCloneService extends AxiosHttpService {
  public host: string;

  constructor(host: string){
    super(host);
    this.host = host;
  }

  public async getUsers(since: number, limit: number): Promise<GetUsersResponse>{
    const response = await this.get(`/users?since=${since}&limit=${limit}`);

    return response.data;
  }

  public async getUser(username: string): Promise<UserDetails>{
    const response = await this.get(`/users/${username}/details`);

    return response.data.data;
  }
};

export default new GitHubCloneService('http://localhost:3000/api')
