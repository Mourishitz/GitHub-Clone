import { useState, useEffect } from "react"
import GitHubCloneService from "../../services/github-clone.service"
import { useParams } from "react-router-dom";
import UserDetails from "../../resources/user-details.resource";

export default function User() {
  let { username } = useParams();
  const [user, setUser] = useState<UserDetails>()
  const [loader, setLoader] = useState(true)

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
              // TODO: Implement user details
              <>{user.login.toString()}</>
        }
      </div>
    </div>
  )
}