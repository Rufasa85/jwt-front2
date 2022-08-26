const URL_PREFIX= "http://localhost:3001"

const API = {
    checkToken:token=>{
        return fetch(`${URL_PREFIX}/users/check-token`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
         })
    },
    login: (email,password)=>{
        return fetch(`${URL_PREFIX}/users/login`,{
        method:"POST",
        body:JSON.stringify({
          email,
          password
        }),
        headers:{
            "Content-Type":"application/json"
        }
    })
    },
    getRecentIcons:()=>{
      return fetch(`${URL_PREFIX}/icons/recent`)
    }
}

export default API