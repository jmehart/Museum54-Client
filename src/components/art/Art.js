import { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import { ButtonControls } from "../buttonControls/ButtonControls"
import { UserContext } from "../../UserContext";
import { updateArt } from "./ArtManager"
// function that renders a single art
export const Art = ({ listView, cardView, art, refreshState, setRefreshState }) => {
    const { currentUser } = useContext(UserContext)
    const history = useHistory()


    const formatDate = (entryDate) => {
        let date = new Date(entryDate)
        return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
    }



    return <>
        {
            listView && cardView && currentUser
                ? <div key={`art--${art.id}`} className="artCard">
                    <div className="cardTitle">
                        <div>
                            <Link to={`/art/${art.id}`}>
                                {art.name}
                            </Link>
                        </div>
                        <div>Created By: {art.curator?.user?.username}</div>
                        <div>Date Entered:{formatDate(art.dateEntered)}</div>
                    </div>
                    <div className="cardImage">
                        <img src={`${art.image || "https://picsum.photos/300/100"}`} />
                    </div>
                    <div className="cardBottom">
                        <div className="cardFunctions">

                            <div className="cardButtons">
                                <ButtonControls isArt={true} id={art.id} />
                            </div>


                        </div>
                    </div>

                </div>
                : listView
                    ? <div key={`art--${art.id}`} className="singleArt">
                        {<div>
                            <Link to={`/collection/art/${art.id}`}>
                                {art.title}<br></br>
                                <img width="200" height="200" src={`${art.image || "https://picsum.photos/300/100"}`} />
                            </Link>

                        </div>}
                        <br></br>
                    </div>
                    : //Detailed art single view 
                    <div key={`art--${art.id}`} className="artDetails">
                        <section className="artDetailsMain">
                            <br></br>

                            <h2 className="title has-text-black has-text-centered">{art.title}</h2>
                            <h3 className="has-text-centered">By {art.artist?.name}</h3>

                            <br></br>
                            <div className="has-text-centered"><img src={`${art.image || "https://picsum.photos/300/100"}`} /></div>
                            <br></br>
                            <div className="columns is-multiline">
                                <div className="column is-half">
                                    <p className="subtitle is-5">Description <br></br> <strong>{art.description}</strong></p>
                                    <p className="subtitle is-5">Date Made <br></br> <strong>{art.dateMade}</strong></p>
                                    <p className="subtitle is-5">Date Acquired <br></br> <strong>{art.dateAcquired}</strong></p>
                                    <p className="subtitle is-5">Location <br></br> <strong>{art.location}</strong></p>
                                    <p className="subtitle is-5">Dimensions <br></br> <strong>{art.dimensions}</strong></p>
                                    <p className="subtitle is-5">Framed <br></br> <strong>{`${art.framed ? "Yes" : "No"}`}</strong></p>
                                    <p className="subtitle is-5">Signature <br></br> <strong>{`${art.signature ? "Yes" : "No"}`}</strong></p>
                                </div>
                                <div key={art.id} className="column is-half">
                                    <p className="subtitle is-5">Classifications {art.classification.map(c => <div key={`artclassification${art.id}${c.id}`}> <strong>{c.type}</strong></div>)}</p>
                                    <p className="subtitle is-5">Styles {art.style.map(s => <div key={`artStyle${art.id}${s.id}`}> <strong>{s.type}</strong></div>)}</p>
                                    <p className="subtitle is-5">Genres {art.genre.map(g => <div key={`artGenre${art.id}${g.id}`}> <strong>{g.type}</strong></div>)}</p>
                                    <p className="subtitle is-5">Mediums {art.medium.map(m => <div key={`artMedium${art.id}${m.id}`}> <strong>{m.type}</strong></div>)}</p>
                                </div>
                            </div>
                            <br></br>
                            <div className="artistDetailsBelowImage">
                                <h4>Artist Details</h4>
                                Name: <Link to={`/artists/${art.artist.id}`}>
                                    {art.artist?.name}
                                </Link><br></br>
                                <img width="175" height="200" src={`${art.artist?.image || "https://picsum.photos/300/100"}`} />
                                <div>Bio: {art.artist?.bio}</div>
                            </div><br></br>

                            <div className="artDetailsBelowCard">
                                <div>Art Submitted By: {art.curator?.user?.username} on {formatDate(art.dateEntered)}
                                    {/* <Link to={`/users/${art.author.id}`} > */}
                                    {/* {art.curator.user.username} */}
                                    {/* </Link> */}

                                </div>
                            </div>

                            <ButtonControls isArt={true} id={art.id} />


                            <button onClick={() => {
                                const copy = { ...art }
                                updateArt(copy)
                                    .then(() => history.push('/collection'))
                            }}>Go Back</button>
                        </section>
                    </div>
        }
    </>
}