import React,{useState} from "react";
import axios from "axios";

const Login=()=>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
const [token,setToken]=useState('') 
const [userData,setUserData]=useState(null)



const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post('http://127.0.0.1:5002/api/users/login',{username,password})
        setToken(res.data.token)
        console.log(res.data.token)
        alert('login Done')

    }

    catch (error) {
        console.error(error.response.data);
        alert('Invalid username or password')
    }

    

}   
return(
    <>
        <h1>hi to login</h1>
    <form onSubmit={handleLogin}>
        <input type="text" value={username} onChange={
            (e)=>{
                setUsername(e.target.value)
            }
        } placeholder="username" required/>

        <input type="text" value={password} onChange={(e)=>{
            setPassword(e.target.value)
        }} placeholder="password" required/>
         
        <button type="submit">login</button>

    </form>
    </>
)
}
export default Login;
