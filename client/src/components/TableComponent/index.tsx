import { useState } from "react";
import UserResource from "../../resources/user.resource"

type TableProps = {
    collumns: Array<string>
    data: Array<any>
}

export default function TableComponent({data, collumns}: TableProps){
    const [searchQuery, setSearchQuery] = useState("");

    const filteredData = data.filter((user: UserResource) =>
        user.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.login.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
            <div className="overflow-x-auto w-full">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        {collumns.map((value)=> <th key={value}>{value}</th>)}
                    </tr>
                    </thead>
                    {/* body */}
                    <tbody>
                    {filteredData.map((user: UserResource, index: number)=>{
                        return (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.login}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

