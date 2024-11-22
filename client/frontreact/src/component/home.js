
import React,{useEffect,useState} from "react";
import { fetchUsers } from "../back/api";
function Home(){
const [users,setUsers]=useState([]);

useEffect(() => {
   const getUsers=async ()=>{
    const res = await fetchUsers();
    setUsers(res.data);
   }
   getUsers();  
   console.log(users)
},[])


    return(
<>
<div  style={{marginLeft:"30px",fontSize:"xx-large",marginTop:'25px'}}>welcome</div>

    
{
    users.length>0 &&<ul>
        {users.map((user)=><li key={user._id}>  {user._id}  <br/> {user.phone}</li>

        )}
    </ul>
}
</>
    )
}
export default Home;