import { Settings } from "../utils/Settings"
import { useHistory } from "react-router-dom"
import { useEffect, useState, useContext } from "react"

export const ButtonControls = ({ isArt, id, artId, setRefreshState }) => {
    const history = useHistory()


    return <div>
        <dialog id={`anything-${id}`}>

            {
                isArt ? <div>Are you sure you want to delete this art?</div>

                            : <div>Are you sure you want to delete this artist?</div>
            }

            <div>
                {/* <button

                    onClick={
                        (e) => {
                            e.preventDefault()
                            if (isArt) {
                                deleteArt(id)
                                    .then(
                                        () => {
                                            history.push("/")
                                        })
                            } 
                        }
                    }
                >Okay</button> */}
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
        {/* <button onClick={() => {
            if (isArtist) {
                history.push(`/editArtist/${id}`)
            } 
        }}>
            <img className="editIcon" src={`${Settings.EditIcon}`} width="25px" height="25px" />
        </button> */}
        <button onClick={() => {
            const buttonTarget = document.querySelector(`#anything-${id}`)
            buttonTarget.showModal()
        }}>
            <img className="deleteIcon" src={`${Settings.DeleteIcon}`} width="25px" height="25px" />
        </button>
    </div >
}