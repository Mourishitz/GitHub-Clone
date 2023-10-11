import { useState, useEffect } from "react"
import GitHubCloneService from "../../services/github-clone.service"
import TableComponent from "../../components/TableComponent"
import UserResource from "../../resources/user.resource"


export default function Home() {
  const [users, setUsers] = useState<UserResource[]>([])

  useEffect(()=>{
      getUsers()
    }, []
  )

  const getUsers = async (): Promise<void> => {
    const response = await GitHubCloneService.getUsers(1, 10);
    setUsers(response.data);
  }

  return (
    <div className="mt-8">
      <div className="flex justify-center">
        <TableComponent collumns={['ID', 'Login']} data={users}/>
      </div>
    </div>
  )
}