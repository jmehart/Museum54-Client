import { Settings } from "../utils/Settings"


export const getAllMediums = () => {
    return fetch(`${Settings.API}/mediums`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleMedium = (id) => {
    return fetch(`${Settings.API}/mediums/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const sendMediumEdit = (medium) => {
    const id = medium.id
    return fetch(`${Settings.API}/mediums/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(medium)
    })
}

export const submitNewMedium = (medium) => {
    return fetch(`${Settings.API}/mediums`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }, body: JSON.stringify(medium)
    })
        .then(res => res.json())
}

export const deleteMedium = (mediumId) => {
    return fetch(`${Settings.API}/mediums/${mediumId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
}

export const removeMedium = (medium, artId) => {
    return fetch(`${Settings.API}/art/${artId}/medium`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }, body: JSON.stringify(medium)
    })
}

export const addMedium = (medium, artId) => {
    return fetch(`${Settings.API}/art/${artId}/medium`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }, body: JSON.stringify(medium)
    })
}