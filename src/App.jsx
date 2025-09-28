import React,{useEffect,useState} from "react"
import { useDispatch } from "react-redux"
import authService from "./appwirte/AppWriteService";
import {login , logout} from "./store/authSlice"



function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

useEffect(() => {
  authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({ userData }));
      } else {
        dispatch(logout());
      }
    })
    .catch((error) => {
      console.error("Error fetching current user:", error);
      dispatch(logout());
    })
    .finally(() => {
      setLoading(false);
    });
}, [dispatch]);


  // return !loading ? (
  //   <div className="h-sceen ">
  //     dev
  //   </div>
  // ):null
  
  return(
  <div>
    <h1>ok</h1>
    ok
    
  </div>
  )
}

export default App