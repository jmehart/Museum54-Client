import { Settings } from "../utils/Settings"
import { useHistory } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { deleteArt } from "../art/ArtManager"


export const ButtonControls = ({ isArt, id, artId, setRefreshState }) => {
    const history = useHistory()


    return <div>
        <dialog id={`anything-${id}`}>

            {
                isArt ? <div>Are you sure you want to delete this art?</div>

                    : <div>Are you sure you want to delete this artist?</div>
            }

            <div>
                <button

                    onClick={
                        (e) => {
                            e.preventDefault()
                            if (isArt) {
                                deleteArt(id)
                                    .then(
                                        () => {
                                            history.push("/collection")
                                        })
                            }
                        }
                    }
                >Okay</button>
                <button
                    onClick={
                        (e) => {
                            e.preventDefault()
                            const buttonTarget = document.querySelector(`#anything-${id}`)
                            buttonTarget.close()
                        }
                    }
                >Cancel
                </button>
            </div>

        </dialog>
        {/* -------------edit button------------- */}
        <div className="field is-grouped is-grouped-centered">
            <p className="control">
                <button className="button is-info" onClick={() => {
                    if (isArt) {
                        history.push(`/editArt/${id}`)
                    }
                }}>
                    Edit
                </button>
            </p>
            <p className="control">
                <button className="button is-danger" onClick={() => {
                    const buttonTarget = document.querySelector(`#anything-${id}`)
                    buttonTarget.showModal()
                }}>
                    Delete
                </button></p>
        </div >
    </div>
}