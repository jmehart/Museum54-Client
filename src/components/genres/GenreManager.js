import { Settings } from "../utils/Settings"


export const getAllGenres = () => {
    return fetch(`${Settings.API}/genres`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleGenre = (id) => {
    return fetch(`${Settings.API}/genres/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const sendGenreEdit = (genre) => {
    const id = genre.id
    return fetch(`${Settings.API}/genres/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(genre)
    })
}

export const submitNewGenre = (genre) => {
    return fetch(`${Settings.API}/genres`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }, body: JSON.stringify(genre)
    })
        .then(res => res.json())
}

export const deleteGenre = (genreId) => {
    return fetch(`${Settings.API}/genres/${genreId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
}

export const removeGenre = (genre, artId) => {
    return fetch(`${Settings.API}/art/${artId}/genre`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }, body: JSON.stringify(genre)
    })
}

export const addGenre = (genre, artId) => {
    return fetch(`${Settings.API}/art/${artId}/genre`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        }, body: JSON.stringify(genre)
    })
}