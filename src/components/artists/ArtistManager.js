import { Settings } from "../utils/Settings"

export const getAllArtists = () => {
    return fetch(`${Settings.API}/artists`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then((res) => res.json())
};


export const getSingleArtist = (artistId) => {
    return fetch(`${Settings.API}/artists/${artistId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
};


export const createArtist = (artist) => {
    return fetch(`${Settings.API}/artists`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(artist)
    }).then(res => res.json())
};


export const updateArtist = (artist) => {
    return fetch(`${Settings.API}/artists/${artist.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(artist)
    })
        .then(getAllArtists)
}


export const searchArtistName = nameString => {
    return fetch(`${Settings.API}/artists?name=${nameString}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
  };