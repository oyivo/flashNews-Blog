import { useState, useEffect } from "react";
import axios from "axios";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  //const [user, setUser] = useState([])
 

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/infor", {
            headers: { Authorization: token },
          });
          console.log(res.data.name)
          //setUser(res.data)
          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
        } catch (err) {
          alert(err.response.data.msg)
        }
      };

      getUser();
    }
  }, [token]);

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    //user: [user, setUser]
  };
}

export default UserAPI;
