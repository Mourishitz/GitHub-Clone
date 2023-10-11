import { useState, useEffect } from "react"
import GitHubCloneService from "../../services/github-clone.service"
import { Link, useParams } from "react-router-dom";
import UserDetails from "../../resources/user-details.resource";
import TableComponent from "../../components/TableComponent";
import GetRepositoriesResource from "../../resources/get-repositories.resource";
import RepositoryResource from "../../resources/repository.resource";

export default function User() {
  let { username } = useParams();
  const [user, setUser] = useState<UserDetails>()
  const [repositories, setRepositories] = useState<GetRepositoriesResource>()
  const [previousRepositories, setPreviousRepositories] = useState<string | undefined>();
  const [nextRepositories, setNextRepositories] = useState<string | undefined>();
  const [loader, setLoader] = useState(true)
  const [buttonText, setButtonText] = useState("Repositories")
  const [view, setView] = useState("Profile")

  useEffect(()=>{
      getUser(username as string)
    }, []
  )

  const getUser = async (username: string): Promise<void> => {
    try {
      const response = await GitHubCloneService.getUser(username);
      setUser(response);
    } catch (error) {
      console.error(error)
    } finally {
      setLoader(false);
    }
  }

  const getRepositories = async (): Promise<void> => {
    const response: GetRepositoriesResource = await GitHubCloneService.getRepositoriesForUser(user!.login, 5, 1);

    setPreviousRepositories(response.previous);
    setNextRepositories(response.next);
    setRepositories(response)
  }

  const toggleInformations = () => {
    setLoader(true);

    switch (view) {
      case "Profile":
        setView("Repositories");
        getRepositories();
        setButtonText("Profile");
        break;
    
      case "Repositories":
        setView("Profile");
        setButtonText("Repositories");
        break;
    }

    setLoader(false);
  }

  return (
    <div className="mt-8">
      <div className="flex justify-center">
        {
          !user 
            ?
              loader
                ?                
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="loading loading-dots loading-lg"></span>
                  </div>
                :
                  <>User not found.</>
            :
              <>
                <div className="w-8/12 mb-8">  
                  <div className="mockup-browser border border-base-300">
                    <div className="mockup-browser-toolbar">
                      <div className="input border border-base-300">{user.html_url}</div>
                      <div className="badge badge-primary badge-outline">Created: {new Date(user.created_at).toLocaleString()}</div>
                    </div>
                    <div className="flex justify-center px-4 py-16 border-t border-base-300">
                      {
                        loader
                          ?                
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="loading loading-dots loading-lg"></span>
                            </div>
                          :
                            view === "Profile"
                              ?
                                <div className="card w-96 bg-base-100 shadow-xl">
                                  <figure><img src={user.avatar_url} alt="Profile picture"/></figure>
                                  <div className="card-body">
                                    <h2 className="card-title">{user.name}</h2>
                                    <p>{user.company}</p>
                                    <div className="divider m-0"></div> 
                                    <p>ID: {user.id}</p>
                                    <p>{user.bio}</p>
                                    <div className="card-actions justify-center">
                                      <a className="btn btn-primary" href={`${user.html_url}`} target="_blank">See on GitHub</a>
                                      {
                                        user.blog
                                          ? <a className="btn btn-secondary" href={`${user.blog}`} target="_blank">See Blog</a>
                                          : <></>
                                      }
                                    </div>
                                  </div>
                                </div>
                              :
                                !repositories 
                                  ?
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="loading loading-dots loading-lg"></span>
                                    </div>
                                  :
                                    <div className="w-full flex justify-center">
                                      <TableComponent 
                                        collumns={['ID', 'Name', 'URL']} 
                                        data={repositories.data} 
                                        next={nextRepositories} 
                                        previous={previousRepositories} 
                                        body={(repository: RepositoryResource, index: number) => {
                                          return (
                                            <tr key={index}>
                                              <td>{repository.id}</td>
                                              <td>{repository.name}</td>
                                              <a className="btn btn-link" href={repository.html_url} target="_blank">View</a>
                                            </tr>
                                          )
                                        }}                                  
                                      />
                                    </div>
                      }
                    </div>
                    <div className="flex justify-between px-4 py-4 border-t border-base-300">
                      <Link className="btn btn-outline" to="/">⬅ User List</Link>
                      <button className="btn btn-outline" onClick={toggleInformations}>See {buttonText}</button>
                    </div>
                  </div>
                </div>
              </>
        }
      </div>
    </div>
  )
}