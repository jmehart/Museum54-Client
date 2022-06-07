import React, {createContext, useState, useEffect} from 'react';



export const CommentStateContext = createContext();

export const CommentStateProvider = ({children}) => {
    const [commentState, setCommentState] = useState(false)

    return (
        <CommentStateContext.Provider value={{commentState, setCommentState}}>
            {children}
        </CommentStateContext.Provider>
    )



}