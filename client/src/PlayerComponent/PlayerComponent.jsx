import { useRef } from "react"

import SHARK from '../assets/imgs/sharks/red-shark.png'
import MEDAL from '../assets/imgs/medal.png'


function PlayerComponent({username}) {

    const player = useRef(null)
    const playerDisplayNameUI = useRef(null)
    const playerShark = useRef(null)

    return (
        <div ref={player} className="player">
            <div className="progress-line"></div>
            <p ref={playerDisplayNameUI} id="player_display_name"><b>{username}</b></p>
            <img ref={playerShark} id="player_shark" src={SHARK} width="64" height="64" alt="Your Shark!" />
            <img id="award" src={MEDAL} width="32" height="32" alt="A Medal For The Finish" />
        </div>
    )
}

export default PlayerComponent