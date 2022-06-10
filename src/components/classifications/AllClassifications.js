import { getAllClassifications } from "./ClassificationManager"
import React, { useContext, useEffect, useState } from "react";
import { NewClassificationForm } from "./CreateClassificationForm";
import { getCurrentUser } from "../users/UserManager";
import { ButtonControls } from "../buttonControls/ButtonControls";
import { UserContext } from "../../UserContext";
import "../categories/AllCategories.css"



export const AllClassifications = ({refreshState, setRefreshState, classifications}) => {
    const { currentUser } = useContext(UserContext)

    return <>
        <div>All Classifications</div>
        {classifications.map((classification) => {
            
            return <div key={`classification--${classification.id}`} className="list-container">
                    {
                        currentUser.is_staff
                        ? <div className="cardButtons">
                            <ButtonControls 
                                isClassifications={true} 
                                id={classification.id} 
                                classification={classification}
                                setRefreshState={setRefreshState} />
                            </div>
                        : null
                    }
                    <h3> {classification.type} </h3>
                </div>
        })}
        <div className="CreateNewClassificationFormContainer">
            <NewClassificationForm setRefreshState={setRefreshState} />
        </div>
    </>
}