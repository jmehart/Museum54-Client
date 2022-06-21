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
    }).then(res => res.json())
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

// get art by artist
export const searchArtArtist = (artistId) => {
    return fetch(`${Settings.API}/art?artist=${artistId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
};

// get art by classification
export const searchArtClassifications = (classification) => {
    return fetch(`${Settings.API}/art?classification=${classification}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
};

// get art by style
export const searchArtStyles = (style) => {
    return fetch(`${Settings.API}/art?style=${style}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
};

// get art by genre
export const searchArtGenres = (genre) => {
    return fetch(`${Settings.API}/art?genre=${genre}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
};

// get art by medium
export const searchArtMediums = (medium) => {
    return fetch(`${Settings.API}/art?medium=${medium}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(res => res.json())
};

export const searchArtTitles = titleString => {
    return fetch(`${Settings.API}/art?title=${titleString}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
  };