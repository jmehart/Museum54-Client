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
        <section className="collection-section mx-6">
        <br></br>
            
                    <h2 className="title has-text-black has-text-centered">Collection</h2>
                
            <div className="columns is-multiline">

                {
                    art.length > 0
                        ? art.map((art) => {
                            return <div key={art.id} className="column is-one-third">
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