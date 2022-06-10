import { Settings } from "../utils/Settings"

export const getAllArt = () => {
    return fetch(`${Settings.API}/art`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then((res) => res.json())
};


export const getSingleArt = (artId) => {
    return fetch(`${Settings.API}/art/${artId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
};


export const createArt = (art) => {
    return fetch(`${Settings.API}/art`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(art)
    }).then(getAllArt)
};


export const updateArt = (art) => {
    return fetch(`${Settings.API}/art/${art.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(art)
    })
        .then(getAllArt)
}

export const deleteArt = (id) => {
    return fetch(`${Settings.API}/art/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
}