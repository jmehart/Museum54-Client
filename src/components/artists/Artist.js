import { useState, useEffect, useContext } from "react"
import 'react-slideshow-image/dist/styles.css'
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { ButtonControls } from "../buttonControls/ButtonControls"
import { UserContext } from "../../UserContext";
import { updateArtist } from "./ArtistManager"
import { getSingleArt } from "../art/ArtManager"
// function that renders a single artist
export const Artist = ({ listView, cardView, artist, refreshState, setRefreshState }) => {
    const { currentUser } = useContext(UserContext)
    const history = useHistory()


    const [art, setArt] = useState({})

    const { artId } = useParams()

    useEffect(
        () => {
            if (artId) {
                getSingleArt(artId)
                    .then(setArt)
            }
        },
        [artId]
    )


    const formatDate = (entryDate) => {
        let date = new Date(entryDate)
        return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
    }

    return <>
        {
            listView && cardView && currentUser
                ? <div key={`artist--${artist.id}`} className="artistCard">
                    <div className="cardTitle">
                        <div>
                            <Link to={`/artists/${artist.id}`}>
                                {artist.name}
                            </Link>
                        </div>
                        <div>Created By: {artist.curator?.user?.username}</div>
                        <div>Date Entered:{formatDate(artist.dateEntered)}</div>
                    </div>
                    <div className="cardImage">
                        <img src={`${artist.image || "https://picsum.photos/300/100"}`} />
                    </div>
                    <div className="cardBottom">
                        {/* <div className="cardFunctions">
                            {
                                artist.curator.id === currentUser?.id
                                    ? <div className="cardButtons">
                                        <ButtonControls isArtist={true} id={artist.id} />
                                    </div>
                                    : null
                            }
                        </div> */}
                    </div>

                </div>
                : listView
                    ? <div key={`artist--${artist.id}`} className="singleArtist">
                        {<div>
                            <Link to={`/artists/${artist.id}`}>
                                <header><p className="subtitle has-text-centered"> {artist.name} </p></header><br></br>
                                <img width="200" height="200" src={`${artist.image || "https://picsum.photos/300/100"}`} />

                            </Link>

                        </div>}
                        <br></br>
                    </div>
                    : //Detailed artist single view 
                    <div key={`artist--${artist.id}`} className="artistDetails">
                        <section className="artistDetailsMain mx-6">

                            <br></br>

                            <h2 className="title has-text-centered">{artist.name}</h2>

                            <div className="has-text-centered"><img style={{ width: "400px", margin: "30px 0" }} src={`${artist.image || "https://picsum.photos/300/100"}`} /></div>
                            <br></br>
                            <div className="columns is-multiline">
                                <div className="column is-one-third"></div>
                                <div className="column is-one-third">
                                    <p className="subtitle is-5 has-text-centered">Artist Details</p>
                                    <br></br>
                                    <p className="subtitle is-6">Birth: <strong>{artist.birth}</strong></p>
                                    <p className="subtitle is-6">Death: <strong>{artist.death}</strong></p>
                                    <p className="subtitle is-6">Nationality: <strong>{artist.nationality}</strong></p>
                                    <p className="subtitle is-6">Bio: <br></br><strong>{artist.bio}</strong></p>

                                    <br></br>
                                </div>

                                <div className="column is-one-third"></div>
                            </div>

                            <div><p className="subtitle is-5 has-text-centered">Art Created By {artist.name} </p>
                                <div className="has-text-centered">{artist.art.map(a =>
                                    <div key={`artistArt${artist.id}${a.id}`}><Link to={`/collection/art/${a.id}`}><p>{a.title}</p><img width="200" src={`${a.image || "https://picsum.photos/300/100"}`} /></Link></div>
                                )}</div>


                            </div>
                            <br></br>
                            <br></br>
                            <br></br>

                            <div className="artistDetailsBelowCard">
                                <div className="has-text-centered">Artist Submitted By: {artist.curator?.user?.username} on {formatDate(artist.dateEntered)}
                                    {/* <Link to={`/users/${artist.author.id}`} > */}
                                    {/* {artist.curator.user.username} */}
                                    {/* </Link> */}

                                </div>
                            </div><br></br>

                            <div className="field is-grouped is-grouped-centered is-3">

                                <p className="control">

                                    <button className="button is-info" onClick={() => {
                                        history.push(`/editArtist/${artist.id}`)
                                    }}>Edit</button>

                                </p>

                                <p className="control">

                                    <button className="button is-light" onClick={() => {
                                        const copy = { ...artist }
                                        updateArtist(copy)
                                            .then(() => history.push('/artists'))
                                    }}>Go Back</button>

                                </p>
                            </div>
                        </section><br></br>
                    </div>
        }
    </>
}