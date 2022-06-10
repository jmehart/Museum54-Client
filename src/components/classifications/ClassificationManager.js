import { Settings } from "../utils/Settings"


export const getAllClassifications = () => {
    return fetch(`${Settings.API}/classifications`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleClassification = (id) => {
    return fetch(`${Settings.API}/classifications/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const sendClassificationEdit = (classification) => {
    const id = classification.id
    return fetch(`${Settings.API}/classifications/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(classification)
    })
}

export const submitNewClassification = (classification) => {
    return fetch(`${Settings.API}/classifications`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }, body: JSON.stringify(classification)
    })
        .then(res => res.json())
}

export const deleteClassification = (classificationId) => {
    return fetch(`${Settings.API}/classifications/${classificationId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
}

export const removeClassification = (classification, artId) => {
    return fetch(`${Settings.API}/art/${artId}/classification`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }, body: JSON.stringify(classification)
    })
}

export const addClassification = (classification, artId) => {
    return fetch(`${Settings.API}/art/${artId}/classification`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }, body: JSON.stringify(classification)
    })
}