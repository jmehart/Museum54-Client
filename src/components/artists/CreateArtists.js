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
            copy.bio = originalArtist.birth
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
                .then(() => history.push("/artists"))

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
                .then(() => history.push("/artists"))
        }
}

return (
    <form className="artistForm">
        <h2 className="artistForm__title">{editMode ? "Edit Artist" : "Add Artist"}</h2>
        <fieldset>
            <div className="form_group">
                <label htmlFor="name"> Artist Name: </label>
                <input type="text" id="name" name="name" required autoFocus className="form-control"
                    placeholder="Artist name"
                    value={artist.name}
                    onChange={handleInputChange}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form_group">
                <label htmlFor="bio"> Bio: </label>
                <input type="text" name="bio" id="bio" required autoFocus className="form-control"
                    placeholder="Artist bio"
                    value={artist.bio}
                    onChange={handleInputChange}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form_group">
                <label htmlFor="image"> Image URL: </label>
                <input type="text" id="image" name="image" required autoFocus className="form-control"
                    placeholder="Image Url"
                    value={artist.image}
                    onChange={handleInputChange}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form_group">
                <label htmlFor="birth"> Birth: </label>
                <input type="text" name="birth" id="birth" required autoFocus className="form-control"
                    placeholder="Artist birth"
                    value={artist.birth}
                    onChange={handleInputChange}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form_group">
                <label htmlFor="death"> Death: </label>
                <input type="text" name="death" id="death" required autoFocus className="form-control"
                    placeholder="Artist death"
                    value={artist.death}
                    onChange={handleInputChange}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form_group">
                <label htmlFor="nationality"> Nationality: </label>
                <input type="text" name="nationality" id="nationality" required autoFocus className="form-control"
                    placeholder="Artist nationality"
                    value={artist.nationality}
                    onChange={handleInputChange}
                />
            </div>
        </fieldset>

        <div>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    createNewArtist()
                }}
                className="bt btn-primary">
                {editMode ? "Save Changes" : "Create Artist"}
            </button>
        </div>
        <Link to="/artists" className="cancel-btn">Cancel</Link>
    </form>
)
}