import { getAllArt } from "./ArtManager"
import React, { useEffect, useState, useContext } from "react";
import { Art } from "./Art";
import { UserContext } from "../../UserContext";


export const AllArt = ({ setRefreshState, refreshState }) => {
    const { currentUser } = useContext(UserContext)
    const [refreshArt, setRefreshArt] = useState(false)
    const [art, setArt] = useState([])
    const [filter, setFilterType] = useState({ type: "all", value: "" })



    useEffect(() => {
        setRefreshArt(false)
    }, [art])

    useEffect(() => {
        getAllArt()
            .then(artData => {
                setArt(artData)
            })
    }, [])




    return <>
        <section className="collection-section">
        <br></br>
            <div className="columns is-centered">
                <div className="is-full">
                    <h2 className="title has-text-black">Collection</h2>
                </div>
            </div>
            <div className="columns is-multiline is-centered">

                {
                    art.length > 0
                        ? art.map((art) => {
                            return <div key={art.id} className="column is-one-third is-narrow has-text-centered">
                                <a>
                                    {
                                        <Art listView={true} cardView={false} art={art} currentUser={currentUser} />
                                        //does not display unapproved art
                                    }
                                </a>
                            </div>
                            // needs author name and category, publication date, content 
                        })
                        : "No art"
                }
            </div></section>
    </>
}