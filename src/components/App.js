import React, { useState, useEffect } from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { UserProvider } from "../UserContext"
import { CommentStateProvider } from "../CommentStateContext"
import "./App.css";


export const App = () => {
    const [token, setTokenState] = useState(localStorage.getItem('token'))

    //state to refresh state when new object is submitted
    const [refreshState, setRefreshState] = useState(false)

    useEffect(() => {

        setRefreshState(false)

    }, [refreshState])



    const setToken = (newToken) => {
        localStorage.setItem('token', newToken)
        setTokenState(newToken)
    }

    return <>
        {
            token
                ?
                <Route>
                    <UserProvider>

                        <NavBar token={token} setToken={setToken} setTokenState={setTokenState} setRefreshState={setRefreshState} refreshState={refreshState} />
                        <CommentStateProvider>
                            <ApplicationViews setRefreshState={setRefreshState} refreshState={refreshState} />
                        </CommentStateProvider>

                    </UserProvider>
                </Route>
                :
                <Redirect to="/login" />
        }

        <Route exact path="/login" >
            <NavBar token={token} setToken={setToken} />
            <Login token={token} setToken={setToken} />
        </Route>

        <Route path="/register" exact>
            <NavBar token={token} setToken={setToken} />
            <Register token={token} setToken={setToken} />
        </Route>

    </>
}
