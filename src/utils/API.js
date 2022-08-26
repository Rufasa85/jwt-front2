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
    signup: (email,password)=>{
        return fetch(`${URL_PREFIX}/users/signup`,{
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
    },
    getUserById:userId=>{
      return fetch(`${URL_PREFIX}/users/${userId}`)
    },
    saveNewIcon:(token,name,pixels)=>{
      return fetch(`${URL_PREFIX}/icons/`,{
        method:"POST",
        body:JSON.stringify({
          name,
          pixels
        }),
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    }
}

export default API