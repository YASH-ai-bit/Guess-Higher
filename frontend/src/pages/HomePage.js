import React, {useState} from 'react'
import '../index.css'
import logo from "../assets/logo4.png"
import {useNavigate} from 'react-router-dom'

const HomePage = () => {
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    const handleCreateUser = async (e) => {
        e.preventDefault()

        const user = {username};
        const response = await fetch('/api/users', {
            method:'POST',
            body: JSON.stringify(user),
            headers:{
                'content-Type':'application/json'
            }
        })
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
            return
        }
        if(response.ok){
            setError(null)
            setUsername('')
            console.log('user created', json)

            localStorage.setItem("username", username)
            localStorage.setItem("userId", json._id)

            navigate('/game');     //redirect to gamepage
        }
    }

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
                    {error && <div className="error">{error}</div>}
                </form>
                <div className='Api_text'>Powered by Serp API and Google API</div>
        </div>
    )
}

export default HomePage