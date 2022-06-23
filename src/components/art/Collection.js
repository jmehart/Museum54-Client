import { getAllArt, searchArtArtist, searchArtClassifications, searchArtGenres, searchArtMediums, searchArtStyles, searchArtTitles } from "./ArtManager"
import React, { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Art } from "./Art";
import { UserContext } from "../../UserContext";
import { getAllArtists } from "../artists/ArtistManager";
import { getAllClassifications } from "../classifications/ClassificationManager";
import { getAllStyles } from "../styles/StyleManager";
import { getAllGenres } from "../genres/GenreManager";
import { getAllMediums } from "../mediums/MediumManager";


export const AllArt = ({ setRefreshState, refreshState }) => {
    const { currentUser } = useContext(UserContext)
    const [refreshArt, setRefreshArt] = useState(false)
    const [art, setArt] = useState([])
    const [artist, setArtist] = useState([])
    const [classifications, setClassifications] = useState([])
    const [styles, setStyles] = useState([])
    const [genres, setGenres] = useState([])
    const [mediums, setMediums] = useState([])
    const [filter, setFilterType] = useState({ type: "all", value: "" })


    useEffect(
        () => {
            getAllArtists()
                .then(setArtist)
        },
        []
    )

    useEffect(
        () => {
            getAllClassifications()
                .then(setClassifications)
        },
        []
    )

    useEffect(
        () => {
            getAllStyles()
                .then(setStyles)
        },
        []
    )

    useEffect(
        () => {
            getAllGenres()
                .then(setGenres)
        },
        []
    )

    useEffect(
        () => {
            getAllMediums()
                .then(setMediums)
        },
        []
    )

    useEffect(() => {
        setRefreshArt(false)
    }, [art])


    useEffect(() => {
        if (filter.type === "all") {
            getAllArt()
                .then((art) => {
                    setArt(art)

                })
        } else if (filter.type === "artist") {
            searchArtArtist(filter.value)
                .then((data) => setArt(data))

        } else if (filter.type === "classification") {
            searchArtClassifications(filter.value)
                .then((data) => setArt(data))

        } else if (filter.type === "style") {
            searchArtStyles(filter.value)
                .then((data) => setArt(data))

        } else if (filter.type === "genre") {
            searchArtGenres(filter.value)
                .then((data) => setArt(data))

        } else if (filter.type === "medium") {
            searchArtMediums(filter.value)
                .then((data) => setArt(data))

        } else if (filter.type === "title") {
            searchArtTitles(filter.value)
                .then((data) => setArt(data))
        }

    }, [refreshArt])

    const artName = useRef()


    return <>
        <section className="collection-section mx-6">
            <br></br>

            <h2 className="title has-text-black has-text-centered is-family-primary has-text-weight-bold is-size-1">Collection</h2>
            <div>
                {/* filter by title jsx */}
                <section className="columns">
                    <div className="column is-one-third is-offset-one-third">

                        <fieldset className="field has-text-centered" id="titleSearchField">
                            <div className="titleSearch">
                                <input
                                    type="text"
                                    ref={artName}
                                    className="input"
                                    placeholder="Title..."
                                />
                                <br></br>

                                <div className="column is-one-third is-offset-one-third">
                                <button className='button is-primary' onClick={e => {
                                    e.preventDefault()
                                    let filterToSet = {
                                        type: "title",
                                        value: artName.current.value
                                    }
                                    setFilterType(filterToSet)
                                    setRefreshArt(true)
                                }}>
                                    
                                    <label htmlFor="searchButton">Search</label>
                                </button>
                                </div>

                            </div>
                        </fieldset>

                    </div>
                </section>
                

                <section className="columns is-centered is-multiline has-text-centered mx-6 px-6">


                    {/* filter by artist jsx */}
                    <fieldset className="column is-one-fifth">
                        <div className="select">
                            <select
                                className="artistDropdown"
                                name="artistId"
                                value={filter.type === "artist" ? filter.value : "0"}
                                onChange={e => {
                                    e.preventDefault()
                                    if (e.target.value != "0") {
                                        let copy = JSON.parse(JSON.stringify(filter))
                                        copy.type = "artist"
                                        copy.value = parseInt(e.target.value)
                                        setFilterType(copy)
                                        setRefreshArt(true)
                                    }
                                }}
                            >
                                <option name="artistId" disabled value="0">
                                    Filter By Artist
                                </option>
                                {artist?.map((a) => {
                                    return (
                                        <option key={a.id} name="ArtistId" value={a.id}>
                                            {a.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </fieldset>

                    {/* filter by classification jsx */}
                    <fieldset className="column is-one-fifth">
                        <div className="select">
                            <select
                                className="classificationDropdown"
                                name="classificationId"
                                value={filter.type === "classification" ? filter.value : "0"}
                                onChange={e => {
                                    e.preventDefault()
                                    let copy = JSON.parse(JSON.stringify(filter))
                                    copy.type = "classification"
                                    copy.value = e.target.value
                                    setFilterType(copy)
                                    setRefreshArt(true)
                                }}
                            >
                                <option name="classificationId" disabled value="0">
                                    Filter By Classification
                                </option>
                                {classifications?.map((c) => {
                                    return (
                                        <option key={c.id} name="ClassificationId" value={c.id}>
                                            {c.type}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </fieldset>

                    {/* filter by style jsx */}
                    <fieldset className="column is-one-fifth">
                        <div className="select">
                            <select
                                className="styleDropdown"
                                name="styleId"
                                value={filter.type === "style" ? filter.value : "0"}
                                onChange={e => {
                                    e.preventDefault()
                                    let copy = JSON.parse(JSON.stringify(filter))
                                    copy.type = "style"
                                    copy.value = e.target.value
                                    setFilterType(copy)
                                    setRefreshArt(true)
                                }}
                            >
                                <option name="styleId" disabled value="0">
                                    Filter By Style
                                </option>
                                {styles?.map((s) => {
                                    return (
                                        <option key={s.id} name="StyleId" value={s.id}>
                                            {s.type}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </fieldset>

                    {/* filter by genre jsx */}
                    <fieldset className="column is-one-fifth">
                        <div className="select">
                            <select
                                className="genreDropdown"
                                name="genreId"
                                value={filter.type === "genre" ? filter.value : "0"}
                                onChange={e => {
                                    e.preventDefault()
                                    let copy = JSON.parse(JSON.stringify(filter))
                                    copy.type = "genre"
                                    copy.value = e.target.value
                                    setFilterType(copy)
                                    setRefreshArt(true)
                                }}
                            >
                                <option name="genreId" disabled value="0">
                                    Filter By Genre
                                </option>
                                {genres?.map((g) => {
                                    return (
                                        <option key={g.id} name="GenreId" value={g.id}>
                                            {g.type}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </fieldset>

                    {/* filter by medium jsx */}
                    <fieldset className="column is-one-fifth">
                        <div className="select">
                            <select
                                className="mediumDropdown"
                                name="mediumId"
                                value={filter.type === "medium" ? filter.value : "0"}
                                onChange={e => {
                                    e.preventDefault()
                                    let copy = JSON.parse(JSON.stringify(filter))
                                    copy.type = "medium"
                                    copy.value = e.target.value
                                    setFilterType(copy)
                                    setRefreshArt(true)
                                }}
                            >
                                <option name="mediumId" disabled value="0">
                                    Filter By Medium
                                </option>
                                {mediums?.map((m) => {
                                    return (
                                        <option key={m.id} name="MediumId" value={m.id}>
                                            {m.type}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </fieldset>
                    <fieldset className="column is-one-fifth">
                        <button type="submit"
                            onClick={() => {
                                getAllArt()
                                    .then((art) => {
                                        setArt(art)

                                    })
                            }}
                            className="button is-light is-centered">
                            Refresh
                        </button>
                    </fieldset>
                </section>
            </div>
            <br></br>
            <br></br>

            <div className="columns is-multiline is-centered">

                {
                    art.length > 0
                        ? art.map((art) => {
                            return <div key={art.id} className="column is-one-quarter">
                                <a>
                                    {
                                        <Art listView={true} cardView={false} art={art} currentUser={currentUser} />

                                    }
                                </a>
                            </div>

                        })
                        : "No art"
                }
            </div>
        </section>
    </>
}