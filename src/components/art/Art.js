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
                                {art.title}
                            </Link>
                            
                        </div>}

                    </div>
                    : //Detailed art single view 
                    <div key={`art--${art.id}`} className="artDetails">
                        <div className="artDetailsMain">
                            <div className="artDetailsTitle">
                                <div className="cardButtons">
                                    {
                                        <>
                                            <ButtonControls isArt={true} id={art.id} />
                                        </>

                                    }
                                </div>
                                <h2>{art.title}</h2>
                                <h3>By {art.artist?.name}</h3>
                            </div>
                            <div><img src={`${art.image || "https://picsum.photos/300/100"}`} /></div>
                            <div className="artDetailsBelowImage">
                                <h4>Art Details</h4>
                                <div>Description: {art.description}</div>
                                <div>Date Made: {art.dateMade}</div>
                                <div>Date Acquired: {art.dateAcquired}</div>
                                <div>Location: {art.location}</div>
                                <div>Dimensions (inches): {art.dimensions}</div>
                                <div>Framed: {`${art.framed ? "Yes" : "No"}`}</div>
                                <div>Signature: {`${art.signature ? "Yes" : "No"}`}</div>
                                <div>Classifications: <ul>{art.classification.map(c => <li key={`artclassification${art.id}${c.id}`}>{c.type}</li>)}</ul></div>
                            </div><br></br>
                            <div className="artistDetailsBelowImage">
                                <h4>Artist Details</h4>
                                Name: <Link to={`/artists/${art.artist.id}`}>
                                    {art.artist?.name}
                                </Link>
                                <img width="175" height="200" src={`${art.artist?.image || "https://picsum.photos/300/100"}`} />
                                <div>Bio: {art.artist?.bio}</div>
                            </div><br></br>

                            <div className="artDetailsBelowCard">
                                <div>Submitted By: {art.curator.user.username} on {formatDate(art.dateEntered)}
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
                        </div>
                    </div>
        }
    </>
}