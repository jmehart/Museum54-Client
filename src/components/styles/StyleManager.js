import { Settings } from "../utils/Settings"


export const getAllStyles = () => {
    return fetch(`${Settings.API}/styles`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleStyle = (id) => {
    return fetch(`${Settings.API}/styles/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const sendStyleEdit = (style) => {
    const id = style.id
    return fetch(`${Settings.API}/styles/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(style)
    })
}

export const submitNewStyle = (style) => {
    return fetch(`${Settings.API}/styles`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }, body: JSON.stringify(style)
    })
        .then(res => res.json())
}

export const deleteStyle = (styleId) => {
    return fetch(`${Settings.API}/styles/${styleId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
}

export const removeStyle = (style, artId) => {
    return fetch(`${Settings.API}/art/${artId}/style`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }, body: JSON.stringify(style)
    })
}

export const addStyle = (style, artId) => {
    return fetch(`${Settings.API}/art/${artId}/style`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }, body: JSON.stringify(style)
    })
}