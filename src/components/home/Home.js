import { Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { UserList } from "../users/UserList"
import { UserContext } from "../../UserContext";
import "./Home.css"

export const Home = () => {
    const { currentUser } = useContext(UserContext)

    return <div>
        <br></br>
        <div className="has-text-centered">
        <img className="logo" alt="logo home" src={require("/Users/jaimiehart/workspace/server-capstone/Museum54-Client/src/components/images/museum54 logo.jpg")} />
        <br></br>
        <br></br>
        </div>
        <div className="currentUser has-text-centered has-text-weight-bold has-text-grey-darker">
       Welcome {currentUser.username}!
        </div>
        <br></br>
        <br></br>
        <div className="buttons is-centered">
            <Link to={`/donate/art`}>
                <div className="button is-primary is-large">Add Art</div>
            </Link>
        </div>
    </div>
}