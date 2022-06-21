// imports React, useEffect, useSate, useHistory, sendArtist, fetchTags
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { createArtist, getSingleArtist, updateArtist } from "./ArtistManager";
import { UserContext } from "../../UserContext";

export const CreateArtists = ({ setRefreshState, refreshState }) => {
    const { currentUser } = useContext(UserContext)
    const [originalArtist, setOriginalArtist] = useState({})
    const { artistId } = useParams()
    const history = useHistory()
    const editMode = artistId ? true : false

    const [artist, setArtist] = useState({
        name: "",
        bio: "",
        image: "",
        birth: "",
        death: "",
        nationality: "",
        dateEntered: Date.now()

    })

    const [selectedTags, setSelectedTags] = useState([])

    useEffect(() => {
        if (editMode) {
            const copy = {}
            copy.id = originalArtist.id
            copy.name = originalArtist.name
            copy.bio = originalArtist.bio
            copy.image = originalArtist.image
            copy.birth = originalArtist.birth
            copy.death = originalArtist.death
            copy.nationality = originalArtist.nationality
            copy.dateEntered = originalArtist.dateEntered
            setArtist(copy)
        }

    }, [originalArtist])

    useEffect(() => {
        if (artistId) {
            getSingleArtist(parseInt(artistId))
                .then(artist => {
                    setOriginalArtist(artist)
                })
        }
    }, [refreshState])

    const handleInputChange = (event) => {
        const newArtist = { ...artist }
        newArtist[event.target.id] = event.target.value;
        setArtist(newArtist)
    }

    const createNewArtist = () => {

        if (editMode) {
            updateArtist({
                id: artist.id,
                name: artist.name,
                bio: artist.bio,
                image: artist.image,
                birth: artist.birth,
                death: artist.death,
                nationality: artist.nationality,
                dateEntered: artist.dateEntered,
                user: artist.user
            })
                .then(() => history.push(`/artists/${artist.id}`))

        } else {

            createArtist({
                name: artist.name,
                bio: artist.bio,
                image: artist.image,
                birth: artist.birth,
                death: artist.death,
                nationality: artist.nationality,
                dateEntered: new Date(),
                user: currentUser.id
            })
                .then((res) => history.push(`/donate`))
        }
    }

    return (
        <form className="artistForm">
            <br></br>
            <div className="columns is-centered">
                <div className="is-full">
                    <h1 className="title has-text-centered">{editMode ? "Edit Artist" : "Add Artist"}</h1>
                </div>
            </div>
            <br></br>

            <div className="container">
                <div className="columns is-multiline is-centered">
                    <div className="column is-one-fifth"></div>
                    <div className="column is-one-fifth">
                        <fieldset>
                            <div className="field">
                                <label className="label" htmlFor="image"> Image URL: </label>
                                <div className="control">
                                    <input type="text" id="image" name="image" required autoFocus className="input"
                                        placeholder="Image Url"
                                        value={artist.image}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="column is-two-fifths">
                        <fieldset>
                            <div className="field">
                                <label className="label" htmlFor="name"> Artist Name: </label>
                                <div className="control">
                                    <input type="text" id="name" name="name" required autoFocus className="input"
                                        placeholder="Artist name"
                                        value={artist.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </fieldset>
                        <br></br>
                        <fieldset>
                            <div className="field">
                                <label className="label" htmlFor="bio"> Bio: </label>
                                <div className="control">
                                    <textarea type="text" name="bio" id="bio" required  className="textarea"
                                        placeholder="Artist bio"
                                        value={artist.bio}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                            </div>
                        </fieldset>
                        <br></br>
                        <fieldset>
                            <div className="field">
                                <label className="label" htmlFor="birth"> Birth: </label>
                                <div className="control">
                                    <input className="input" type="text" name="birth" id="birth" required 
                                        placeholder="Artist birth"
                                        value={artist.birth}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </fieldset>
                        <br></br>
                        <fieldset>
                            <div className="field">
                                <label className="label" htmlFor="death"> Death: </label>
                                <div className="control">
                                    <input className="input" type="text" name="death" id="death" required 
                                        placeholder="Artist death"
                                        value={artist.death}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </fieldset>
                        <br></br>
                        <fieldset>
                            <div className="field">
                                <label className="label" htmlFor="nationality"> Nationality: </label>
                                <div className="control">
                                    <input className="input" type="text" name="nationality" id="nationality" required  
                                        placeholder="Artist nationality"
                                        value={artist.nationality}
                                        onChange={handleInputChange}
                                    />
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
                            createNewArtist()
                        }}
                        className="button is-primary">
                        {editMode ? "Save Changes" : "Create Artist"}
                    </button>
                </p>

                <p className="control">
                    <a className="button is-light">
                        {editMode ? <Link to={`/artists/${artist.id}`} className="cancel-btn">Cancel</Link> : <Link to={'/donate'} className="cancel-btn">Cancel</Link>}
                    </a>
                </p>
            </div>
            <br></br>
        </form >

    )
}