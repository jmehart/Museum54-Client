// imports React, useEffect, useSate, useHistory, sendArt, fetchClassifications
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getAllArtists } from "../artists/ArtistManager";
import { addClassification, removeClassification } from "../classifications/ClassificationManager";
import { createArt, getSingleArt, updateArt } from "./ArtManager";
import { UserContext } from "../../UserContext";

export const CreateArt = ({ classifications, setRefreshState, refreshState }) => {
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
                classification: selectedClassifications
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
                classification: selectedClassifications
            })
                .then(() => history.push(`/collection/art/${art.id}`))
        }
    }

    return (
        <form className="artForm">
            <h2 className="artForm__title">{editMode ? "Edit Art" : "Add Art"}</h2>
            <fieldset>
                <div className="form_group">
                    <label htmlFor="artist"> Artist: </label>
                    <select name="artist" required autoFocus className="form-control" id="artist" placeholder="pick"
                        value={art.artist}
                        onChange={handleInputChange}>
                        {artists.map((artist) => {
                            return (
                                <option id="artist" name="artist" required autoFocus onChange={handleInputChange} key={artist.id} value={artist.id}>
                                    {artist.name}
                                </option>
                            )
                        })}
                    </select>
                    <div>
                        Artist not added yet? <Link to={`/donate/artist`}>
                            Add Artist
                        </Link>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form_group">
                    <label htmlFor="title"> Title: </label>
                    <input type="text" id="title" name="title" required autoFocus className="form-control"
                        placeholder="Title"
                        value={art.title}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form_group">
                    <label htmlFor="description"> Description: </label>
                    <input type="text" name="description" id="description" required autoFocus className="form-control"
                        placeholder="Description"
                        value={art.description}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form_group">
                    <label htmlFor="image"> Image URL: </label>
                    <input type="text" id="image" name="image" required autoFocus className="form-control"
                        placeholder="Image Url"
                        value={art.image}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form_group">
                    <label htmlFor="dateMade"> Date Made: </label>
                    <input type="text" name="dateMade" id="dateMade" required autoFocus className="form-control"
                        placeholder="Date Made"
                        value={art.dateMade}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form_group">
                    <label htmlFor="dateAcquired"> Date Acquired: </label>
                    <input type="text" name="dateAcquired" id="dateAcquired" required autoFocus className="form-control"
                        placeholder="Date Acquired"
                        value={art.dateAcquired}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form_group">
                    <label htmlFor="location"> Location: </label>
                    <input type="text" name="location" id="location" required autoFocus className="form-control"
                        placeholder="Location"
                        value={art.location}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form_group">
                    <label htmlFor="dimensions"> Dimensions: </label>
                    <input type="text" name="dimensions" id="dimensions" required autoFocus className="form-control"
                        placeholder="Dimensions"
                        value={art.dimensions}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form_group">
                    <label htmlFor="framed"> Framed: </label>
                    <input type="checkbox" name="framed" id="framed" required autoFocus className="form-control"
                        value={art.framed}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form_group">
                    <label htmlFor="signature"> Signature: </label>
                    <input type="checkbox" name="signature" id="signature" required autoFocus className="form-control"
                        value={art.signature}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form_group">
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

            <div>
                <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()
                        createNewArt()
                    }}
                    className="bt btn-primary">
                    {editMode ? "Save Changes" : "Create Art"}
                </button>
            </div>
            <Link to={`/collection/art/${art.id}`} className="cancel-btn">Cancel</Link>
        </form>
    )
}