import { getAllStyles } from "./StyleManager"
import React, { useContext, useEffect, useState } from "react";
import { NewStyleForm } from "./CreateStyleForm";
import { getCurrentUser } from "../users/UserManager";
import { ButtonControls } from "../buttonControls/ButtonControls";
import { UserContext } from "../../UserContext";
import "../categories/AllCategories.css"



export const AllStyles = ({refreshState, setRefreshState, styles}) => {
    const { currentUser } = useContext(UserContext)

    return <>
        <div>All Styles</div>
        {styles.map((style) => {
            
            return <div key={`style--${style.id}`} className="list-container">
                    {
                        currentUser.is_staff
                        ? <div className="cardButtons">
                            <ButtonControls 
                                isStyles={true} 
                                id={style.id} 
                                style={style}
                                setRefreshState={setRefreshState} />
                            </div>
                        : null
                    }
                    <h3> {style.type} </h3>
                </div>
        })}
        <div className="CreateNewStyleFormContainer">
            <NewStyleForm setRefreshState={setRefreshState} />
        </div>
    </>
}