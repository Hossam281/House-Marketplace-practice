import { useEffect,useState } from "react"
import { getAuth,onAuthStateChanged } from "firebase/auth"


const useAuthStats = () => {
const [loggedIn,setLoggedIn]=useState(false);
const [loading,setLoading]=useState(true)

useEffect(()=>{
    const auth=getAuth();
    onAuthStateChanged(auth,(user)=>{
        user && setLoggedIn(true);

        setLoading(false);
    })
})

  return {loggedIn,loading}
}

export default useAuthStats