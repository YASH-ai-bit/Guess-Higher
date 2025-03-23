import React, {useState} from 'react'
import '../index.css'
import logo from "../assets/logo4.png"
import axios from 'axios'

const HomePage = () => {
    const [username, setUsername] = useState("");

    const handleCreateUser = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post("/api/users/createUser", { username });
  
        localStorage.setItem("username", username);
        localStorage.setItem("userId", response.data._id);


        window.location.href = "/game";
      } catch (err) {
        console.error(err);
      }
    };  

    return(
        <div className="home">
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="" />
                    <span className='logo-text'>An annoyingly addictive game based on Google Searches ! !</span>
                    <span className='logo-text2'>What's Googled More?</span>
                </div>
            </div>
                <form className="createUser" onSubmit={handleCreateUser}>
                    <label >Enter UserName :</label>
                    <input
                    type='text'
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    />
                    <button type="submit">Start Game</button>
                </form>
        </div>
    )
}

export default HomePage