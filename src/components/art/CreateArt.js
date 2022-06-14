// imports React, useEffect, useSate, useHistory, sendArt, fetchClassifications
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getAllArtists } from "../artists/ArtistManager";
import { addClassification, removeClassification } from "../classifications/ClassificationManager";
import { addStyle, removeStyle } from "../styles/StyleManager";
import { addGenre, removeGenre } from "../genres/GenreManager";
import { addMedium, removeMedium } from "../mediums/MediumManager";
import { createArt, getSingleArt, updateArt } from "./ArtManager";
import { UserContext } from "../../UserContext";

export const CreateArt = ({ classifications, styles, genres, mediums, setRefreshState, refreshState }) => {
    const { currentUser } = useContext(UserContext)
    const [artists, setArtists] = useState([])
    const [originalArt, setOriginalArt] = useState({})
    const { artId } = useParams()
    const history = useHistory()
    const editMode = artId ? true : false

    const [art, setArt] = useState({
        title: "",
        description: "",
        artist: 1,
        image: "",
        dateMade: "",
        dateAcquired: "",
        dateEntered: Date.now(),
        location: "",
        dimensions: ""

    })

    const [selectedClassifications, setSelectedClassifications] = useState([])
    const [selectedStyles, setSelectedStyles] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])
    const [selectedMediums, setSelectedMediums] = useState([])

    useEffect(() => {
        if (editMode) {
            const copy = {}
            copy.id = originalArt.id
            copy.title = originalArt.title
            copy.description = originalArt.description
            copy.artist = originalArt.artist?.id
            copy.image = originalArt.image
            copy.dateMade = originalArt.dateMade
            copy.dateAcquired = originalArt.dateAcquired
            copy.location = originalArt.location
            copy.dimensions = originalArt.dimensions
            copy.framed = originalArt.framed
            copy.signature = originalArt.signature
            copy.dateEntered = originalArt.dateEntered
            setArt(copy)
        }

    }, [originalArt])

    useEffect(() => {
        getAllArtists()
            .then((artists) => {
                setArtists(artists)
                if (artId) {
                    getSingleArt(parseInt(artId))
                        .then(art => {
                            setOriginalArt(art)
                        })
                }
            })
    }, [refreshState])

    const handleInputChange = (event) => {
        const newArt = { ...art }
        newArt[event.target.id] = event.target.value;
        setArt(newArt)
    }

    const createNewArt = () => {
        const artist_id = parseInt(art.artist)


        if (editMode) {
            updateArt({
                id: art.id,
                title: art.title,
                description: art.description,
                artist: artist_id,
                image: art.image,
                dateMade: art.dateMade,
                dateAcquired: art.dateAcquired,
                dateEntered: art.dateEntered,
                location: art.location,
                dimensions: art.dimensions,
                framed: art.framed,
                signature: art.signature,
                user: art.user,
                classification: selectedClassifications,
                style: selectedStyles,
                genre: selectedGenres,
                medium: selectedMediums
            })
                .then(() => history.push(`/collection/art/${art.id}`))

        } else {

            createArt({
                title: art.title,
                description: art.description,
                artist: artist_id,
                image: art.image,
                dateMade: art.dateMade,
                dateAcquired: art.dateAcquired,
                dateEntered: new Date(),
                location: art.location,
                dimensions: art.dimensions,
                framed: false,
                signature: false,
                user: currentUser.id,
                classification: selectedClassifications,
                style: selectedStyles,
                genre: selectedGenres,
                medium: selectedMediums
            })
                .then((res) => history.push(`/collection/art/${res.id}`))
        }
    }

    return (
        <form className="artForm">
            <h2 className="artForm__title">{editMode ? "Edit Art" : "Add Art"}</h2>
            <div className="container">
                <div className="columns is-multiline is-centered">
                    <div className="column is-one-quarter"></div>
                    <div className="column is-one-quarter">
                        <fieldset>
                            <div className="field">
                                <label className="label" htmlFor="image"> Image URL: </label>
                                <div className="control">
                                    <input className="input" type="text" id="image" name="image" required autoFocus
                                        placeholder="Image Url"
                                        value={art.image}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="column is-one-quarter">
                        <fieldset>
                            <div className="field">
                                <label className="label" htmlFor="artist"> Artist: </label>
                                <div className="control">
                                    <div className="select">
                                        <select name="artist" required autoFocus id="artist"
                                            defaultValue="default"
                                            onChange={handleInputChange}>
                                            <option value="default" disabled>
                                                Select Artist
                                            </option>
                                            {artists.map((artist) => {
                                                return (
                                                    <option id="artist" name="artist" required autoFocus onChange={handleInputChange} key={artist.id} value={artist.id}>
                                                        {artist.name}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <p className="help">
                                    Artist not added yet? <Link to={`/donate/artist`}>
                                        Add Artist
                                    </Link>

                                </p>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="field">
                                <label className="label" htmlFor="title"> Title: </label>
                                <div className="control">
                                    <input className="input" type="text" id="title" name="title" required autoFocus
                                        placeholder="Title"
                                        value={art.title}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="field">
                                <label className="label" htmlFor="description"> Description: </label>
                                <div className="control">
                                    <input className="input" type="text" name="description" id="description" required autoFocus
                                        placeholder="Description"
                                        value={art.description}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="field">
                                <label htmlFor="dateMade"> Date Made: </label>
                                <input type="text" name="dateMade" id="dateMade" required autoFocus
                                    placeholder="Date Made"
                                    value={art.dateMade}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="field">
                                <label htmlFor="dateAcquired"> Date Acquired: </label>
                                <input type="text" name="dateAcquired" id="dateAcquired" required autoFocus
                                    placeholder="Date Acquired"
                                    value={art.dateAcquired}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="field">
                                <label htmlFor="location"> Location: </label>
                                <input type="text" name="location" id="location" required autoFocus
                                    placeholder="Location"
                                    value={art.location}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="field">
                                <label htmlFor="dimensions"> Dimensions: </label>
                                <input type="text" name="dimensions" id="dimensions" required autoFocus
                                    placeholder="Dimensions"
                                    value={art.dimensions}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="field">
                                <label htmlFor="framed"> Framed: </label>
                                <input type="checkbox" name="framed" id="framed" required autoFocus
                                    value={art.framed}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="field">
                                <label htmlFor="signature"> Signature: </label>
                                <input type="checkbox" name="signature" id="signature" required autoFocus
                                    value={art.signature}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </fieldset>



                        <fieldset>
                            <div className="field">
                                <label htmlFor="classification"> Classifications: </label>
                                {editMode == false ?
                                    classifications.map(classification => {
                                        return <>
                                            {selectedClassifications.includes(classification.id) ?
                                                //if the classification is in the array
                                                <>
                                                    <input type="checkbox" key={`classification--${classification.id}`} checked={true} name={classification.type} value={classification.id} onClick={(e) => {
                                                        const copy = [...selectedClassifications]
                                                        const filteredCopy = copy.filter(t => t != e.target.value)
                                                        setSelectedClassifications(filteredCopy)
                                                    }} />
                                                    <label htmlFor={classification.type}>{classification.type}</label>
                                                </>
                                                : //If a classification is not in the array
                                                <>
                                                    <input type="checkbox" key={`classification--${classification.id}`} name={classification.type} value={classification.id} onClick={() => {
                                                        const copy = [...selectedClassifications]
                                                        copy.push(classification.id)
                                                        setSelectedClassifications(copy)
                                                    }
                                                    } /><label htmlFor={classification.type}>{classification.type}</label>
                                                </>
                                            }
                                        </>

                                    }) :
                                    classifications.map(classification => {
                                        return <>
                                            {(originalArt.classification?.some(t => t.id === classification.id) ?
                                                <>
                                                    <input type="checkbox" key={`classification--${classification.id}`} checked={true} name={classification.type} value={classification.id}
                                                        onClick={(e) => {
                                                            const classification = {}
                                                            classification.classification_id = e.target.value
                                                            removeClassification(classification, originalArt.id)
                                                                .then(() => setRefreshState(true))

                                                        }} />
                                                    <label htmlFor={classification.type}>{classification.type}</label>
                                                </>
                                                : <>
                                                    <input type="checkbox" key={`classification--${classification.id}`} name={classification.type} value={classification.id} onClick={(e) => {
                                                        const classification = {}
                                                        classification.classification_id = e.target.value
                                                        addClassification(classification, originalArt.id)
                                                            .then(() => setRefreshState(true))

                                                    }} />

                                                    <label htmlFor={classification.type}>{classification.type}
                                                    </label>
                                                </>
                                            )}
                                        </>
                                    }
                                    )
                                }
                            </div>
                        </fieldset>


                        <fieldset>
                            <div className="field">
                                <label htmlFor="style"> Styles: </label>
                                {editMode == false ?
                                    styles.map(style => {
                                        return <>
                                            {selectedStyles.includes(style.id) ?
                                                //if the style is in the array
                                                <>
                                                    <input type="checkbox" key={`style--${style.id}`} checked={true} name={style.type} value={style.id} onClick={(e) => {
                                                        const copy = [...selectedStyles]
                                                        const filteredCopy = copy.filter(t => t != e.target.value)
                                                        setSelectedStyles(filteredCopy)
                                                    }} />
                                                    <label htmlFor={style.type}>{style.type}</label>
                                                </>
                                                : //If a style is not in the array
                                                <>
                                                    <input type="checkbox" key={`style--${style.id}`} name={style.type} value={style.id} onClick={() => {
                                                        const copy = [...selectedStyles]
                                                        copy.push(style.id)
                                                        setSelectedStyles(copy)
                                                    }
                                                    } /><label htmlFor={style.type}>{style.type}</label>
                                                </>
                                            }
                                        </>

                                    }) :
                                    styles.map(style => {
                                        return <>
                                            {(originalArt.style?.some(t => t.id === style.id) ?
                                                <>
                                                    <input type="checkbox" key={`style--${style.id}`} checked={true} name={style.type} value={style.id}
                                                        onClick={(e) => {
                                                            const style = {}
                                                            style.style_id = e.target.value
                                                            removeStyle(style, originalArt.id)
                                                                .then(() => setRefreshState(true))

                                                        }} />
                                                    <label htmlFor={style.type}>{style.type}</label>
                                                </>
                                                : <>
                                                    <input type="checkbox" key={`style--${style.id}`} name={style.type} value={style.id} onClick={(e) => {
                                                        const style = {}
                                                        style.style_id = e.target.value
                                                        addStyle(style, originalArt.id)
                                                            .then(() => setRefreshState(true))

                                                    }} />

                                                    <label htmlFor={style.type}>{style.type}
                                                    </label>
                                                </>
                                            )}
                                        </>
                                    }
                                    )
                                }
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="field">
                                <label htmlFor="genre"> Genres: </label>
                                {editMode == false ?
                                    genres.map(genre => {
                                        return <>
                                            {selectedGenres.includes(genre.id) ?
                                                //if the genre is in the array
                                                <>
                                                    <input type="checkbox" key={`genre--${genre.id}`} checked={true} name={genre.type} value={genre.id} onClick={(e) => {
                                                        const copy = [...selectedGenres]
                                                        const filteredCopy = copy.filter(t => t != e.target.value)
                                                        setSelectedGenres(filteredCopy)
                                                    }} />
                                                    <label htmlFor={genre.type}>{genre.type}</label>
                                                </>
                                                : //If a genre is not in the array
                                                <>
                                                    <input type="checkbox" key={`genre--${genre.id}`} name={genre.type} value={genre.id} onClick={() => {
                                                        const copy = [...selectedGenres]
                                                        copy.push(genre.id)
                                                        setSelectedGenres(copy)
                                                    }
                                                    } /><label htmlFor={genre.type}>{genre.type}</label>
                                                </>
                                            }
                                        </>

                                    }) :
                                    genres.map(genre => {
                                        return <>
                                            {(originalArt.genre?.some(t => t.id === genre.id) ?
                                                <>
                                                    <input type="checkbox" key={`genre--${genre.id}`} checked={true} name={genre.type} value={genre.id}
                                                        onClick={(e) => {
                                                            const genre = {}
                                                            genre.genre_id = e.target.value
                                                            removeGenre(genre, originalArt.id)
                                                                .then(() => setRefreshState(true))

                                                        }} />
                                                    <label htmlFor={genre.type}>{genre.type}</label>
                                                </>
                                                : <>
                                                    <input type="checkbox" key={`genre--${genre.id}`} name={genre.type} value={genre.id} onClick={(e) => {
                                                        const genre = {}
                                                        genre.genre_id = e.target.value
                                                        addGenre(genre, originalArt.id)
                                                            .then(() => setRefreshState(true))

                                                    }} />

                                                    <label htmlFor={genre.type}>{genre.type}
                                                    </label>
                                                </>
                                            )}
                                        </>
                                    }
                                    )
                                }
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="field">
                                <label htmlFor="medium"> Mediums: </label>
                                {editMode == false ?
                                    mediums.map(medium => {
                                        return <>
                                            {selectedMediums.includes(medium.id) ?
                                                //if the medium is in the array
                                                <>
                                                    <input type="checkbox" key={`medium--${medium.id}`} checked={true} name={medium.type} value={medium.id} onClick={(e) => {
                                                        const copy = [...selectedMediums]
                                                        const filteredCopy = copy.filter(t => t != e.target.value)
                                                        setSelectedMediums(filteredCopy)
                                                    }} />
                                                    <label htmlFor={medium.type}>{medium.type}</label>
                                                </>
                                                : //If a medium is not in the array
                                                <>
                                                    <input type="checkbox" key={`medium--${medium.id}`} name={medium.type} value={medium.id} onClick={() => {
                                                        const copy = [...selectedMediums]
                                                        copy.push(medium.id)
                                                        setSelectedMediums(copy)
                                                    }
                                                    } /><label htmlFor={medium.type}>{medium.type}</label>
                                                </>
                                            }
                                        </>

                                    }) :
                                    mediums.map(medium => {
                                        return <>
                                            {(originalArt.medium?.some(t => t.id === medium.id) ?
                                                <>
                                                    <input type="checkbox" key={`medium--${medium.id}`} checked={true} name={medium.type} value={medium.id}
                                                        onClick={(e) => {
                                                            const medium = {}
                                                            medium.medium_id = e.target.value
                                                            removeMedium(medium, originalArt.id)
                                                                .then(() => setRefreshState(true))

                                                        }} />
                                                    <label htmlFor={medium.type}>{medium.type}</label>
                                                </>
                                                : <>
                                                    <input type="checkbox" key={`medium--${medium.id}`} name={medium.type} value={medium.id} onClick={(e) => {
                                                        const medium = {}
                                                        medium.medium_id = e.target.value
                                                        addMedium(medium, originalArt.id)
                                                            .then(() => setRefreshState(true))

                                                    }} />

                                                    <label htmlFor={medium.type}>{medium.type}
                                                    </label>
                                                </>
                                            )}
                                        </>
                                    }
                                    )
                                }
                            </div>
                        </fieldset>
                    </div>
                    <div className="column is-one-quarter"></div>
                </div>
            </div>

            <div className="field is-grouped is-grouped-centered">
                <p className="control">

                    <button type="submit"
                        onClick={evt => {
                            evt.preventDefault()
                            createNewArt()
                        }}
                        className="button is-primary">
                        {editMode ? "Save Changes" : "Create Art"}
                    </button>
                </p>
                <p className="control">
                    <a className="button is-light">
                        {editMode ? <Link to={`/collection/art/${art.id}`} className="cancel-btn">Cancel</Link> : <Link to={'/donate'} className="cancel-btn">Cancel</Link>}
                    </a>
                </p>
            </div>
        </form>
    )
}