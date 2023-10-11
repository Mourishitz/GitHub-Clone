import { useState } from "react";
import UserResource from "../../resources/user.resource";
import GitHubCloneService from "../../services/github-clone.service";
import { GetUsersResponse } from "../../resources/get-users.resource";
import { Link } from "react-router-dom";

type TableProps = {
  collumns: Array<string>
  data: Array<any>
  next: string | undefined
  previous: string | undefined
}

export default function TableComponent({data, collumns, next, previous}: TableProps){
  const [table, setTable] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState<number>(1);
  const [nextUrl, setNextUrl] = useState(next);
  const [previousUrl, setPreviousUrl] = useState(previous);


  const filteredData = table ? table.filter((user: UserResource) =>
    user.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.login.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const nextPage = async () => {
    const endpoint = nextUrl!.split(GitHubCloneService.host)[1];
    const response: GetUsersResponse = (await GitHubCloneService.get(endpoint as string)).data;

    updateTable(response);
    setPage(page + 1);
  }

  const previousPage = async () => {    

    const endpoint = previousUrl!.split(GitHubCloneService.host)[1];
    const response: GetUsersResponse = (await GitHubCloneService.get(endpoint as string)).data;

    updateTable(response);
    setPage(page - 1);
  }

  const updateTable = async (response: GetUsersResponse) => {
    setSearchQuery("");
    setTable(response.data);
    setNextUrl(response.next);
    setPreviousUrl(response.previous);
  }

  return (
    <div className="flex flex-col items-center w-8/12 border-2 border-neutral rounded-3xl bg-transparent">
      <div className="m-5 w-full flex justify-center gap-4">
        <input className="input input-bordered w-10/12"
          type="text"
          placeholder="Filter data"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
        />
        <div className="tooltip tooltip-bottom" data-tip="Refresh data">
          <button className="btn btn-square btn-outline" onClick={() => setSearchQuery("")}>

          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
          </svg>

          </button>
        </div>
      </div>
      <div className="overflow-x-auto w-full flex justify-center">
        <table className="table flex justify-center">
          {/* head */}
          <thead>
            <tr>
              {collumns.map((value)=> <th key={value}>{value}</th>)}
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {
              table 
              ?
                filteredData.map((user: UserResource, index: number)=>{
                  return (
                    <tr key={index}>
                      <td>{user.id}</td>
                      <td>{user.login}</td>
                      <Link className="btn btn-link" to={`/user/${user.login}`}>User</Link>
                    </tr>
                  )
                })
              : 
                <>Loading...</>
            }
          </tbody>
        </table>
      </div>
      <div className="join mb-4">
            {
              previousUrl
                ?
                <button className="join-item btn" onClick={previousPage}>«</button>
                :
                <button className="join-item btn btn-disabled">«</button>
            }

            <button className="join-item btn">Page {page}</button>

            {
              nextUrl
                ?
                <button className="join-item btn" onClick={nextPage}>»</button>
                :
                <button className="join-item btn btn-disabled">»</button>
            }
          </div>
    </div>
  )
}

