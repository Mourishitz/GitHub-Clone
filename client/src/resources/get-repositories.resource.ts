import RepositoryResource from "./repository.resource"

interface GetRepositoriesResource {
    data: RepositoryResource[]
    next: string | undefined
    previous: string | undefined
}
  
export default GetRepositoriesResource
  