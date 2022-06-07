import { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import { ButtonControls } from "../buttonControls/ButtonControls"
import { UserContext } from "../../UserContext";
import { updateArtist } from "./ArtistManager"
// function that renders a single artist
export const Artist = ({ listView, cardView, artist, refreshState, setRefreshState }) => {
    const { currentUser } = useContext(UserContext)
    const history = useHistory()


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
                                {artist.name}
                            </Link>

                        </div>}

                    </div>
                    : //Detailed artist single view 
                    <div key={`artist--${artist.id}`} className="artistDetails">
                        <div className="artistDetailsMain">
                            <div className="artistDetailsTitle">
                                {/* <div className="cardButtons">
                                    {   
                                        currentUser?.id === artist.curator.id
                                            ? <>
                                            <ButtonControls isArtist={true} id={artist.id} />
                                            </>
                                            : null
                                    }
                                </div> */}
                                <h2>{artist.name}</h2>
                            </div>
                            <div><img src={`${artist.image || "https://picsum.photos/300/100"}`} /></div>
                            <div className="artistDetailsBelowImage">
                                <h4>Artist Details</h4>
                                <div>Birth: {artist.birth}</div>
                                <div>Death: {artist.death}</div>
                                <div>Bio: {artist.bio}</div>
                                <div>Nationality: {artist.nationality}</div>
                            </div><br></br>

                            <div className="artistDetailsBelowCard">
                                <div>Submitted By: {artist.curator.user.username} on {formatDate(artist.dateEntered)}
                                    {/* <Link to={`/users/${artist.author.id}`} > */}
                                    {/* {artist.curator.user.username} */}
                                    {/* </Link> */}

                                </div>
                            </div>

                            <button onClick={() => {
                                const copy = { ...artist }
                                updateArtist(copy)
                                    .then(() => history.push('/artists'))
                            }}>Go Back</button>
                        </div>
                    </div>
        }
    </>
}