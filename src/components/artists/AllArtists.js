import { getAllArtists } from "./ArtistManager"
import React, { useEffect, useState, useContext } from "react";
import { Artist } from "./Artist";
import { UserContext } from "../../UserContext";


export const AllArtists = ({ setRefreshState, refreshState }) => {
    const { currentUser } = useContext(UserContext)
    const [refreshArtists, setRefreshArtists] = useState(false)
    const [artists, setArtists] = useState([])
    const [filter, setFilterType] = useState({ type: "all", value: "" })



    useEffect(() => {
        setRefreshArtists(false)
    }, [artists])

    useEffect(() => {
        getAllArtists()
            .then(artistData => {
                setArtists(artistData)
            })
    }, [])




    return <>

        <div className="singleArtist">

        </div>
        {
            artists.length > 0
                ? artists.map((artist) => {
                    return <div key={artist.id} className="artists">
                        {
                            <Artist listView={true} cardView={false} artist={artist} currentUser={currentUser} />
                            //does not display unapproved artists
                        }
                    </div>
                    // needs author name and category, publication date, content 
                })
                : "No artists"
        }

    </>
}