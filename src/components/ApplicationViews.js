import React, { useState, useEffect } from "react"
import { Route } from "react-router-dom"
import { Home } from "./home/Home.js"
import { AllArtists } from "./artists/AllArtists.js"
import { UserList } from "./users/UserList.js"
import { User } from "./users/User.js"
import { SingleArtist } from "./artists/SingleArtist.js"
import { getCurrentUser } from "./users/UserManager";
import { UserContext } from "../UserContext.js"

export const ApplicationViews = ({ refreshState, setRefreshState }) => {

    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/artists">
                <AllArtists refreshState={refreshState} setRefreshState={setRefreshState} />
            </Route>
            {/* <Route exact path="/users">
                <UserList refreshState={refreshState} />
            </Route>
            <Route exact path="/users/:userId(\d+)">
                <User listView={false} refreshState={refreshState} setRefreshState={setRefreshState} />
            </Route> */}
            {/* <Route exact path="/newArtist">
                <CreateArtists tags={tags} editing={false} />
            </Route>
            <Route exact path="/editArtist/:artistId(\d+)">
                <CreateArtists setRefreshState={setRefreshState} refreshState={refreshState} tags={tags} editing={true} />
            </Route> */}
            <Route exact path="/artists/single/:artistId(\d+)">
                <SingleArtist refreshState={refreshState} setRefreshState={setRefreshState} />
            </Route>
            
        </>
    )
}
