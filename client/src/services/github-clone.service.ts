import UserResource from '../resources/user.resource';
import { AxiosHttpService } from './http/axios-http.service'

type GetUsersResponse = {
  data: UserResource[]
  next: string
}

class GitHubCloneService extends AxiosHttpService {

  constructor(){
    super('http://localhost:3000/api');
  }

  public async getUsers(since: number, limit: number): Promise<GetUsersResponse>{
    const response = await this.get(`/users?since=${since}&limit=${limit}`);

    return response.data;
  }
};

export default new GitHubCloneService()
