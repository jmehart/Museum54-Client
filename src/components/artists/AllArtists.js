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
        <section className="artists-section">
            <br></br>

            <h2 className="title has-text-centered has-text-black">Artists</h2>

            <div className="columns is-multiline is-centered is-gapless mx-6 px-6">

                {
                    artists.length > 0
                        ? artists.map((artist) => {
                            return <div key={artist.id} className="column is-half is-narrow has-text-centered">
                                {
                                    <Artist listView={true} cardView={false} artist={artist} currentUser={currentUser} />
                                    //does not display unapproved artists
                                }
                            </div>
                            // needs author name and category, publication date, content 
                        })
                        : "No artists"
                }
            </div></section>
    </>
}