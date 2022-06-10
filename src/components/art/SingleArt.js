import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Art } from "./Art"
import { getSingleArt } from "./ArtManager"


export const SingleArt = ({setRefreshState, refreshState}) => {
    const [art, setArt] = useState({})
    const { artId } = useParams()

    useEffect(
        () => {
            if(artId) {
                getSingleArt(artId)
                    .then(setArt)
            }
        },
        [artId]
    )

    return <>
    {   
        art.title
        ? <Art listView={false} cardView={false} art={art} setRefreshState={setRefreshState} refreshState={refreshState}/>
        : "loading"
    }
    </>
}