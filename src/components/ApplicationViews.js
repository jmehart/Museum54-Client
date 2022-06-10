import React, { useState, useEffect } from "react"
import { Route } from "react-router-dom"
import { Home } from "./home/Home.js"
import { AllArtists } from "./artists/AllArtists.js"
import { UserList } from "./users/UserList.js"
import { User } from "./users/User.js"
import { SingleArtist } from "./artists/SingleArtist.js"
import { getCurrentUser } from "./users/UserManager";
import { UserContext } from "../UserContext.js"
import { CreateArtists } from "./artists/CreateArtists.js"
import { Donate } from "./donate/Donate.js"
import { AllArt } from "./art/Collection.js"
import { SingleArt } from "./art/SingleArt.js"
import { CreateArt } from "./art/CreateArt.js"

import { getAllClassifications } from "./classifications/ClassificationManager.js"


export const ApplicationViews = ({ refreshState, setRefreshState }) => {

    const [classifications, setClassifications] = useState([])


    // use UseEffect to getAllClassifications and set the state of the tag array.
    useEffect(() => {
      getAllClassifications()
        .then(data => setClassifications(data))
        .then(setRefreshState(true))
    },
      [refreshState])


    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/donate">
                <Donate />
            </Route>
            <Route exact path="/artists">
                <AllArtists refreshState={refreshState} setRefreshState={setRefreshState} />
            </Route>
            <Route exact path="/donate/artist">
                <CreateArtists editing={false} />
            </Route>
            <Route exact path="/editArtist/:artistId(\d+)">
                <CreateArtists setRefreshState={setRefreshState} refreshState={refreshState} editing={true} />
            </Route> 
            <Route exact path="/artists/:artistId(\d+)">
                <SingleArtist refreshState={refreshState} setRefreshState={setRefreshState} />
            </Route>
            <Route exact path="/collection">
                <AllArt refreshState={refreshState} setRefreshState={setRefreshState} />
            </Route>
            <Route exact path="/donate/art">
                <CreateArt classifications={classifications} editing={false} />
            </Route>
            <Route exact path="/editArt/:artId(\d+)">
                <CreateArt setRefreshState={setRefreshState} refreshState={refreshState} classifications={classifications} editing={true} />
            </Route> 
            <Route exact path="/collection/art/:artId(\d+)">
                <SingleArt refreshState={refreshState} setRefreshState={setRefreshState} />
            </Route>
        </>
    )
}
