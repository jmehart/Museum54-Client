import { Settings } from "../utils/Settings"

export const getAllUsers = () => {
    return fetch(`${Settings.API}/curators`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })  
.then(res => res.json())
}


export const getCurrentUser = () => {
    return fetch(`${Settings.API}/users`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}

export const getSingleUser = (id) => {
    return fetch(`${Settings.API}/curators/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
}