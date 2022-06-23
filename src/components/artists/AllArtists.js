import { getAllArtists, searchArtistName } from "./ArtistManager"
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
        if (filter.type === "all") {
            getAllArtists()
                .then((artist) => {
                    setArtists(artist)

                })
        } else if (filter.type === "name") {
            searchArtistName(filter.value)
                .then((data) => setArtists(data))
        }

    }, [refreshArtists])




    return <>
        <section className="artists-section">
            <br></br>

            <h2 className="title has-text-centered is-family-primary is-size-1">Artists</h2>

            <div className="box ">

            <section className="columns">
                    <div className="column is-one-third is-offset-one-third">

                        <fieldset className="field has-text-centered" id="nameSearchField">
                            <div className="nameSearch">
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Name..."
                                />
                                <br></br>
                                <br></br>
                                <button className='button is-primary' onClick={e => {
                                    e.preventDefault()
                                    let filterToSet = {
                                        type: "name",
                                        value: e.currentTarget.previousElementSibling.value
                                    }
                                    setFilterType(filterToSet)
                                    setRefreshArtists(true)
                                }}>
                                    <label htmlFor="searchButton">Search</label>
                                </button>

                                <fieldset className="column has-text-centered">
                        <button type="submit"
                            onClick={evt => {
                                getAllArtists()
                                    .then((artist) => {
                                        setArtists(artist)
                                        setRefreshState()

                                    })
                            }}
                            className="button is-light is-centered">
                            Refresh
                        </button>
                    </fieldset>

                            </div>
                        </fieldset>

                    </div>
                </section>


            </div>
            <br></br>

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