import { useState, useEffect } from "react"
import GitHubCloneService from "../../services/github-clone.service"
import TableComponent from "../../components/TableComponent"
import type { GetUsersResponse } from "../../resources/get-users.resource"
import { Link } from "react-router-dom"
import UserResource from "../../resources/user.resource"

export default function Home() {
  const [users, setUsers] = useState<GetUsersResponse>()
  const [loader, setLoader] = useState(true);

  useEffect(()=>{
      getUsers()
    }, []
  )

  const getUsers = async (): Promise<void> => {
    const response = await GitHubCloneService.getUsers(1, 10);
    setUsers(response);
    setLoader(false)
  }

  return (
    <div className="mt-8">
      <div className="flex justify-center">
        { !users 
            ? 
              loader
                ?
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="loading loading-dots loading-lg"></span>
                  </div>
                :
                  <>Resource not found</>
            :
              <TableComponent 
                collumns={['ID', 'Login', 'Profile']} 
                data={users.data} 
                next={users.next} 
                previous={users.previous}
                body={(user: UserResource, index: number)=>{
                  return (
                    <tr key={index}>
                      <td>{user.id}</td>
                      <td>{user.login}</td>
                      <Link className="btn btn-link" to={`/user/${user.login}`}>User</Link>
                    </tr>
                  )
                }}
              />
        }
      </div>
    </div>
  )
}