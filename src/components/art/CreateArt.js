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
import "./Art.css";

export const CreateArt = ({ classifications, styles, genres, mediums, setRefreshState, refreshState }) => {
    const { currentUser } = useContext(UserContext)
    const [artists, setArtists] = useState([])
    const [originalArt, setOriginalArt] = useState({})
    const { artId } = useParams()
    const history = useHistory()
    const editMode = artId ? true : false


    //For classifications checkboxes and converting to dropdown:
    const [expandedClass, setExpandedClass] = useState(false);
    const [expandedStyle, setExpandedStyle] = useState(false);
    const [expandedGenre, setExpandedGenre] = useState(false);
    const [expandedMedium, setExpandedMedium] = useState(false);
    const [selections, setSelections] = useState([]);

    const toggleClassificationExpanded = () => {
        if (!expandedClass) {
            setExpandedClass(true);
        } else {
            setExpandedClass(false);
        }
    };

    const toggleStyleExpanded = () => {
        if (!expandedStyle) {
            setExpandedStyle(true);
        } else {
            setExpandedStyle(false);
        }
    };

    const toggleGenreExpanded = () => {
        if (!expandedGenre) {
            setExpandedGenre(true);
        } else {
            setExpandedGenre(false);
        }
    };

    const toggleMediumExpanded = () => {
        if (!expandedMedium) {
            setExpandedMedium(true);
        } else {
            setExpandedMedium(false);
        }
    };

    const handleChange = event => {
        if (event.target.checked) {
            return setSelections([...selections, event.target.name]);
        }
        const filtered = selections.filter(name => name !== event.target.name);
        return setSelections(filtered);
    };



    //setting art state  
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

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);

            // Update a component state variable to the value of base64ImageString
            const copy = JSON.parse(JSON.stringify(art))
            copy[event.target.name] = base64ImageString
            setArt(copy)
        });
    }

    //saving classifications
    const [selectedClassifications, setSelectedClassifications] = useState([])
    const [selectedStyles, setSelectedStyles] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])
    const [selectedMediums, setSelectedMediums] = useState([])


    //setting state when editing an existing art
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

    //creating a new art object or updating art
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
            <br></br>
            <div className="columns is-centered">
                <div className="is-full">
                    <h1 className="title has-text-centered">{editMode ? "Edit Art" : "Add Art"}</h1>
                </div>
            </div>
            <br></br>


            <div className="container">
                <div className="columns is-multiline is-centered">
                    <div className="column is-one-fifth"></div>
                    <div className="column is-one-fifth">
                        <fieldset className="field">
                            <div className="file has-name is-boxed">
                                <label className="file-label" htmlFor="image">
                                    <div className="control">
                                        <input type="file" name="image" id="image" onChange={createImageString} />

                                    </div>
                                </label>
                            </div>
                        </fieldset>
                    </div>
                    <div className="column is-two-fifths">
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
                        <br></br>
                        <fieldset>
                            <div className="field">
                                <label className="label" htmlFor="title"> Title: </label>
                                <div className="control">
                                    <input className="input" type="text" id="title" name="title" required
                                        placeholder="Title"
                                        value={art.title}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </fieldset>
                        <br></br>
                        <fieldset>
                            <div className="field">
                                <label className="label" htmlFor="description"> Description: </label>
                                <div className="control">
                                    <textarea className="textarea" type="text" name="description" id="description" required
                                        placeholder="Description"
                                        value={art.description}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                            </div>
                        </fieldset>
                        <br></br>
                        <fieldset>
                            <div className="field">
                                <label className="label" htmlFor="dateMade"> Date Made: </label>
                                <div className="control">
                                    <input className="input" type="text" name="dateMade" id="dateMade" required
                                        placeholder="Date Made"
                                        value={art.dateMade}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </fieldset>
                        <br></br>
                        <fieldset>
                            <div className="field">
                                <label className="label" htmlFor="dateAcquired"> Date Acquired: </label>
                                <div className="control">
                                    <input className="input" type="text" name="dateAcquired" id="dateAcquired" required
                                        placeholder="Date Acquired"
                                        value={art.dateAcquired}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </fieldset>
                        <br></br>
                        <fieldset>
                            <div className="field">
                                <label className="label" htmlFor="location"> Location: </label>
                                <div className="control">
                                    <input className="input" type="text" name="location" id="location" required
                                        placeholder="Location"
                                        value={art.location}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </fieldset>
                        <br></br>
                        <fieldset>
                            <div className="field">
                                <label className="label" htmlFor="dimensions"> Dimensions: </label>
                                <div className="control">
                                    <input className="input" type="text" name="dimensions" id="dimensions" required
                                        placeholder="Dimensions"
                                        value={art.dimensions}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </fieldset>
                        <br></br>
                        <fieldset>
                            <div className="field">
                                <div className="control">
                                    <label className="checkbox" htmlFor="framed">
                                        <input type="checkbox" name="framed" id="framed"
                                            value={art.framed}
                                            onChange={handleInputChange}
                                        />
                                        Framed
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="field">
                                <div className="control">
                                    <label className="checkbox" htmlFor="signature">
                                        <input type="checkbox" name="signature" id="signature"
                                            value={art.signature}
                                            onChange={handleInputChange}
                                        />
                                        Signature
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                        <br></br>


                        <fieldset>
                            <div className="field">
                                <div className="control">
                                    <label className="label" htmlFor="classification"> Classifications: </label>
                                    <div onClick={toggleClassificationExpanded}>
                                        <div
                                            className={`font-semibold cursor-pointer ${expandedClass ? "up-arrow" : "down-arrow"
                                                }`}
                                        >
                                            {selections.length
                                                ? selections.map((name, i) => (
                                                    <span key={i}>
                                                        {i ? ", " : null}
                                                        {name}
                                                    </span>
                                                ))
                                                : "Select"}
                                        </div>
                                    </div>
                                    {editMode == false ?
                                        classifications.map(classification => {
                                            return <>
                                                {selectedClassifications.includes(classification.id) ?
                                                    //if the classification is in the array
                                                    <>
                                                        <input type="checkbox" key={`classification--${classification.id}`} defaultChecked={true} name={classification.type} value={classification.id} onClick={(e) => {
                                                            const copy = [...selectedClassifications]
                                                            const filteredCopy = copy.filter(t => t != e.target.value)
                                                            setSelectedClassifications(filteredCopy)
                                                            handleChange()
                                                        }} />
                                                        <label htmlFor={classification.type}>{classification.type}</label>
                                                    </>
                                                    : //If a classification is not in the array
                                                    <>
                                                        {expandedClass && (
                                                            <div className="border-gray-200 border border-solid">
                                                                <label htmlFor={classification.type}>
                                                                    <input type="checkbox" key={`classification--${classification.id}`} name={classification.type} value={classification.id} onClick={() => {
                                                                        const copy = [...selectedClassifications]
                                                                        copy.push(classification.id)
                                                                        setSelectedClassifications(copy)
                                                                        handleChange()
                                                                    }
                                                                    } />{classification.type}</label>
                                                            </div>)}</>
                                                }
                                            </>

                                        }) :
                                        classifications.map(classification => {
                                            return <>
                                                {(originalArt.classification?.some(t => t.id === classification.id) ?
                                                    <>
                                                        {expandedClass && (
                                                            <div className="border-gray-200 border border-solid">
                                                                <label htmlFor={classification.type}>
                                                                    <input type="checkbox" key={`classification--${classification.id}`} defaultChecked={true} name={classification.type} value={classification.id}
                                                                        onClick={(e) => {
                                                                            const classification = {}
                                                                            classification.classification_id = e.target.value
                                                                            removeClassification(classification, originalArt.id)
                                                                                .then(() => handleChange())


                                                                        }} />
                                                                    {classification.type}</label>
                                                            </div>)}
                                                    </>
                                                    : <>
                                                        {expandedClass && (
                                                            <div className="border-gray-200 border border-solid">
                                                                <label htmlFor={classification.type}>
                                                                    <input type="checkbox" key={`classification--${classification.id}`} name={classification.type} value={classification.id} onClick={(e) => {
                                                                        const classification = {}
                                                                        classification.classification_id = e.target.value
                                                                        addClassification(classification, originalArt.id)
                                                                            .then(() => handleChange())

                                                                    }} />

                                                                    {classification.type}
                                                                </label>
                                                            </div>)}
                                                    </>
                                                )}
                                            </>
                                        }
                                        )
                                    }
                                </div>
                            </div>
                        </fieldset><br></br>


                        <fieldset>
                            <div className="field">
                                <div className="control">
                                    <label className="label" htmlFor="style"> Styles: </label>
                                    <div onClick={toggleStyleExpanded}>
                                        <div
                                            className={`font-semibold cursor-pointer ${expandedStyle ? "up-arrow" : "down-arrow"
                                                }`}
                                        >
                                            {selections.length
                                                ? selections.map((name, i) => (
                                                    <span key={i}>
                                                        {i ? ", " : null}
                                                        {name}
                                                    </span>
                                                ))
                                                : "Select"}
                                        </div>
                                    </div>
                                    {editMode == false ?
                                        styles.map(style => {
                                            return <>
                                                {selectedStyles.includes(style.id) ?
                                                    //if the style is in the array
                                                    <>
                                                        <input type="checkbox" key={`style--${style.id}`} defaultChecked={true} name={style.type} value={style.id} onClick={(e) => {
                                                            const copy = [...selectedStyles]
                                                            const filteredCopy = copy.filter(t => t != e.target.value)
                                                            setSelectedStyles(filteredCopy)
                                                            handleChange()
                                                        }} />
                                                        <label htmlFor={style.type}>{style.type}</label>
                                                    </>
                                                    : //If a style is not in the array
                                                    <>
                                                        {expandedStyle && (
                                                            <div className="border-gray-200 border border-solid">
                                                                <label htmlFor={style.type}>
                                                                    <input type="checkbox" key={`style--${style.id}`} name={style.type} value={style.id} onClick={() => {
                                                                        const copy = [...selectedStyles]
                                                                        copy.push(style.id)
                                                                        setSelectedStyles(copy)
                                                                        handleChange()
                                                                    }
                                                                    } />{style.type}</label>
                                                            </div>)}</>
                                                }
                                            </>

                                        }) :
                                        styles.map(style => {
                                            return <>
                                                {(originalArt.style?.some(t => t.id === style.id) ?
                                                    <>
                                                        {expandedStyle && (
                                                            <div className="border-gray-200 border border-solid">
                                                                <label htmlFor={style.type}>
                                                                    <input type="checkbox" key={`style--${style.id}`} defaultChecked={true} name={style.type} value={style.id}
                                                                        onClick={(e) => {
                                                                            const style = {}
                                                                            style.style_id = e.target.value
                                                                            removeStyle(style, originalArt.id)
                                                                                .then(() => handleChange())


                                                                        }} />
                                                                    {style.type}</label>
                                                            </div>)}
                                                    </>
                                                    : <>
                                                        {expandedStyle && (
                                                            <div className="border-gray-200 border border-solid">
                                                                <label htmlFor={style.type}>
                                                                    <input type="checkbox" key={`style--${style.id}`} name={style.type} value={style.id} onClick={(e) => {
                                                                        const style = {}
                                                                        style.style_id = e.target.value
                                                                        addStyle(style, originalArt.id)
                                                                            .then(() => handleChange())

                                                                    }} />

                                                                    {style.type}
                                                                </label>
                                                            </div>)}
                                                    </>
                                                )}
                                            </>
                                        }
                                        )
                                    }
                                </div>
                            </div>
                        </fieldset><br></br>

                        <fieldset>
                            <div className="field">
                                <div className="control">
                                    <label className="label" htmlFor="genre"> Genres: </label>
                                    <div onClick={toggleGenreExpanded}>
                                        <div
                                            className={`font-semibold cursor-pointer ${expandedGenre ? "up-arrow" : "down-arrow"
                                                }`}
                                        >
                                            {selections.length
                                                ? selections.map((name, i) => (
                                                    <span key={i}>
                                                        {i ? ", " : null}
                                                        {name}
                                                    </span>
                                                ))
                                                : "Select"}
                                        </div>
                                    </div>
                                    {editMode == false ?
                                        genres.map(genre => {
                                            return <>
                                                {selectedGenres.includes(genre.id) ?
                                                    //if the genre is in the array
                                                    <>
                                                        <input type="checkbox" key={`genre--${genre.id}`} defaultChecked={true} name={genre.type} value={genre.id} onClick={(e) => {
                                                            const copy = [...selectedGenres]
                                                            const filteredCopy = copy.filter(t => t != e.target.value)
                                                            setSelectedGenres(filteredCopy)
                                                            handleChange()
                                                        }} />
                                                        <label htmlFor={genre.type}>{genre.type}</label>
                                                    </>
                                                    : //If a genre is not in the array
                                                    <>
                                                        {expandedGenre && (
                                                            <div className="border-gray-200 border border-solid">
                                                                <label htmlFor={genre.type}>
                                                                    <input type="checkbox" key={`genre--${genre.id}`} name={genre.type} value={genre.id} onClick={() => {
                                                                        const copy = [...selectedGenres]
                                                                        copy.push(genre.id)
                                                                        setSelectedGenres(copy)
                                                                        handleChange()
                                                                    }
                                                                    } />{genre.type}</label>
                                                            </div>)}</>
                                                }
                                            </>

                                        }) :
                                        genres.map(genre => {
                                            return <>
                                                {(originalArt.genre?.some(t => t.id === genre.id) ?
                                                    <>
                                                        {expandedGenre && (
                                                            <div className="border-gray-200 border border-solid">
                                                                <label htmlFor={genre.type}>
                                                                    <input type="checkbox" key={`genre--${genre.id}`} defaultChecked={true} name={genre.type} value={genre.id}
                                                                        onClick={(e) => {
                                                                            const genre = {}
                                                                            genre.genre_id = e.target.value
                                                                            removeGenre(genre, originalArt.id)
                                                                                .then(() => handleChange())


                                                                        }} />
                                                                    {genre.type}</label>
                                                            </div>)}
                                                    </>
                                                    : <>
                                                        {expandedGenre && (
                                                            <div className="border-gray-200 border border-solid">
                                                                <label htmlFor={genre.type}>
                                                                    <input type="checkbox" key={`genre--${genre.id}`} name={genre.type} value={genre.id} onClick={(e) => {
                                                                        const genre = {}
                                                                        genre.genre_id = e.target.value
                                                                        addGenre(genre, originalArt.id)
                                                                            .then(() => handleChange())

                                                                    }} />

                                                                    {genre.type}
                                                                </label>
                                                            </div>)}
                                                    </>
                                                )}
                                            </>
                                        }
                                        )
                                    }
                                </div>
                            </div>
                        </fieldset><br></br>

                        <fieldset>
                            <div className="field">
                                <div className="control">
                                    <label className="label" htmlFor="medium"> Mediums: </label>
                                    <div onClick={toggleMediumExpanded}>
                                        <div
                                            className={`font-semibold cursor-pointer ${expandedMedium ? "up-arrow" : "down-arrow"
                                                }`}
                                        >
                                            {selections.length
                                                ? selections.map((name, i) => (
                                                    <span key={i}>
                                                        {i ? ", " : null}
                                                        {name}
                                                    </span>
                                                ))
                                                : "Select"}
                                        </div>
                                    </div>
                                    {editMode == false ?
                                        mediums.map(medium => {
                                            return <>
                                                {selectedMediums.includes(medium.id) ?
                                                    //if the medium is in the array
                                                    <>
                                                        <input type="checkbox" key={`medium--${medium.id}`} defaultChecked={true} name={medium.type} value={medium.id} onClick={(e) => {
                                                            const copy = [...selectedMediums]
                                                            const filteredCopy = copy.filter(t => t != e.target.value)
                                                            setSelectedMediums(filteredCopy)
                                                            handleChange()
                                                        }} />
                                                        <label htmlFor={medium.type}>{medium.type}</label>
                                                    </>
                                                    : //If a medium is not in the array
                                                    <>
                                                        {expandedMedium && (
                                                            <div className="border-gray-200 border border-solid">
                                                                <label htmlFor={medium.type}>
                                                                    <input type="checkbox" key={`medium--${medium.id}`} name={medium.type} value={medium.id} onClick={() => {
                                                                        const copy = [...selectedMediums]
                                                                        copy.push(medium.id)
                                                                        setSelectedMediums(copy)
                                                                        handleChange()
                                                                    }
                                                                    } />{medium.type}</label>
                                                            </div>)}</>
                                                }
                                            </>

                                        }) :
                                        mediums.map(medium => {
                                            return <>
                                                {(originalArt.medium?.some(t => t.id === medium.id) ?
                                                    <>
                                                        {expandedMedium && (
                                                            <div className="border-gray-200 border border-solid">
                                                                <label htmlFor={medium.type}>
                                                                    <input type="checkbox" key={`medium--${medium.id}`} defaultChecked={true} name={medium.type} value={medium.id}
                                                                        onClick={(e) => {
                                                                            const medium = {}
                                                                            medium.medium_id = e.target.value
                                                                            removeMedium(medium, originalArt.id)
                                                                                .then(() => handleChange())


                                                                        }} />
                                                                    {medium.type}</label>
                                                            </div>)}
                                                    </>
                                                    : <>
                                                        {expandedMedium && (
                                                            <div className="border-gray-200 border border-solid">
                                                                <label htmlFor={medium.type}>
                                                                    <input type="checkbox" key={`medium--${medium.id}`} name={medium.type} value={medium.id} onClick={(e) => {
                                                                        const medium = {}
                                                                        medium.medium_id = e.target.value
                                                                        addMedium(medium, originalArt.id)
                                                                            .then(() => handleChange())

                                                                    }} />

                                                                    {medium.type}
                                                                </label>
                                                            </div>)}
                                                    </>
                                                )}
                                            </>
                                        }
                                        )
                                    }
                                </div>
                            </div>
                        </fieldset>
                        <br></br>
                    </div>
                    <div className="column is-one-fifth"></div>
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
            <br></br>
        </form>
    )
}