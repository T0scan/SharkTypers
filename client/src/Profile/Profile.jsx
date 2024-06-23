import { useContext, useEffect } from "react"
import { UserContext } from "../UserContext/UserContext"

function Profile(){

    const userData = useContext(UserContext)
    
    return(
        <>
        <main id="profile">
        <div className="profile-header">
            <div className="profile-header-left">
                <div className="profile-avatar">
                    <img src="./sharks/default-shark.png" width={ 48 } height={ 48 } alt="Profile Image"/>
                </div>
                <div className="profile-details">
                    <h3>{ userData.username }</h3>
                    <h3>Level: { userData.level }</h3>
                    <h3>Races Won: 777</h3>
                    <div className="profile-awards">
                        <ul>
                            <li>Award 1</li>
                            <li>Award 2</li>
                            <li>Award 3</li>
                            <li>Award 4</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="profile-header-right">
                <div className="profile-buttons">
                    <button style={{ marginRight: '5px' }} type="button">Your Settings</button>
                    <button style={{ marginRight: '5px' }} type="button">Change Appearance</button>
                    <button type="button">Privacy</button>
                </div>
            </div>
        </div>
        <section id="profile-history">
            <h1>Race History</h1>
            
        </section>
        </main>
        </>
    )
}

export default Profile