const STRING_LIMIT = 40;
const ARTIST_LIST_KEY = 'artistList'

const showForm = () => {
    const formContainer = document.querySelector("div.form_container");
    const isFormVisible = formContainer.style.display === "flex";
    formContainer.style.display = isFormVisible ? "none" : "flex"; // reverse visibility
}

const loadArtistsFromLocalStorage = () => {
    const rawArtistList = localStorage.getItem(ARTIST_LIST_KEY)
    const artistList = JSON.parse(rawArtistList)
    Object.keys(artistList).forEach(k => addArtistToDom(JSON.parse(artistList[k]), k))
}

const handleAddArtistClick = () => {
    const artistForm = document.forms["artistForm"]
    const artist = Object.assign({}, {
        artistName: artistForm.artistName.value,
        artistDesc: artistForm.artistDesc.value,
        artistImg: artistForm.artistImg.value
    })

    const newId = (new Date()).getTime()

    addArtistToDom(artist, newId)
    addToLocalStorage(artist, newId)
}

const addToLocalStorage = (artist, newId) => {
    const rawArtistList = localStorage.getItem(ARTIST_LIST_KEY)
    const artistList = JSON.parse(rawArtistList)

    const parsedArtist = JSON.stringify(artist)
    const result = artistList || {}
    result[newId] = parsedArtist
    localStorage.setItem(ARTIST_LIST_KEY, JSON.stringify(result))
}

const addArtistToDom = (obj, newId) => {
    const { artistName, artistDesc, artistImg } = obj

    if (artistName.length > STRING_LIMIT || artistDesc.length > STRING_LIMIT) {
        alert("Input cannot be longer than 40 characters")
        return;
    }

    const artistNameSpan = document.createElement("span")
    artistNameSpan.className = "result_list_item_title"
    artistNameSpan.textContent = artistName

    const artistDescSpan = document.createElement("span")
    artistDescSpan.className = "result_list_item_subtitle"
    artistDescSpan.textContent = artistDesc

    const artistImgElement = document.createElement("img")
    artistImgElement.src = artistImg

    const artistDetailsContainer = document.createElement("div")
    artistDetailsContainer.className = "result_list_item_desc"
    artistDetailsContainer.appendChild(artistNameSpan)
    artistDetailsContainer.appendChild(artistDescSpan)

    const artistImgContainer = document.createElement("div")
    artistImgContainer.className = "result_list_item_thumbnail"
    artistImgContainer.appendChild(artistImgElement);

    const deleteBtnContainer = document.createElement("div")
    deleteBtnContainer.className = "delete_button_container"
    const deleteBtn = document.createElement("input")
    deleteBtn.value = "Delete"
    deleteBtn.type = "button"
    deleteBtn.className = "delete_button"
    deleteBtn.onclick = () => removeArtist(newId)
    deleteBtnContainer.appendChild(deleteBtn)

    const newItem = document.createElement("div")
    newItem.className = "result_list_item"
    newItem.id = newId
    newItem.appendChild(artistImgContainer)
    newItem.appendChild(artistDetailsContainer)
    newItem.appendChild(deleteBtnContainer)

    const resultList = document.querySelector("div.result_list");
    resultList.prepend(newItem);

    artistForm.reset()
}

const removeArtist = targetId => {
    const targetItem = document.getElementById(`${targetId}`)

    const resultList = document.querySelector("div.result_list")
    resultList.removeChild(targetItem)
    removeArtistFromLocalStorage(targetId)
}

const removeArtistFromLocalStorage = id => {
    const rawArtistList = localStorage.getItem(ARTIST_LIST_KEY)
    const artistList = JSON.parse(rawArtistList)

    delete artistList[id]

    localStorage.setItem(ARTIST_LIST_KEY, JSON.stringify(artistList))
}

const search = () => {
    const searchForm = document.forms["searchForm"]
    const targetArtistName = searchForm.artistName.value

    const rawArtistList = localStorage.getItem(ARTIST_LIST_KEY)
    const artistList = JSON.parse(rawArtistList)

    const resultList = document.querySelector("div.result_list");
    while (resultList.firstChild) {
        resultList.removeChild(resultList.firstChild)
    };

    Object.keys(artistList).forEach(k => {
        const data = JSON.parse(artistList[k])
        if (data.artistName.toLowerCase().includes(targetArtistName.toLowerCase())) {
            addArtistToDom(data, k)
        }
    })
}
