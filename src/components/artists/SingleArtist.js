import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Artist } from "./Artist"
import { getSingleArtist } from "./ArtistManager"


export const SingleArtist = ({setRefreshState, refreshState}) => {
    const [artist, setArtist] = useState({})
    const { artistId } = useParams()

    useEffect(
        () => {
            if(artistId) {
                getSingleArtist(artistId)
                    .then(setArtist)
            }
        },
        [artistId]
    )

    return <>
    {   
        artist.name
        ? <Artist listView={false} cardView={false} artist={artist} setRefreshState={setRefreshState} refreshState={refreshState}/>
        : "loading"
    }
    </>
}