const STRING_LIMIT = 40;
const DEFAULT_HEADER = {
    'Content-type': 'application/json'
}

const showForm = () => {
    const formContainer = document.querySelector("div.form_container");
    const isFormVisible = formContainer.style.display === "flex";
    formContainer.style.display = isFormVisible ? "none" : "flex"; // reverse visibility
}

const loadArtists = () =>
    fetch('/getAllArtists', {
        method: 'GET',
        // headers: DEFAULT_HEADER
    })
        // .then(() => console.log("load success"))
        .then(res => res)
        .catch(err => console.error(err))

const initialLoad = () => loadArtists().then(data => document.write(data))

const handleAddArtistClick = () => {
    const artistForm = document.forms["artistForm"]
    const artist = Object.assign({}, {
        name: artistForm.artistName.value,
        desc: artistForm.artistDesc.value,
        img: artistForm.artistImg.value
    })

    const newId = (new Date()).getTime()

    addArtistToFile(artist, newId)
}

const addArtistToFile = (artist, newId) => {
    const rawBody = {}
    rawBody[`${newId}`] = artist
    fetch('/addNewArtist', {
        method: 'POST',
        headers: DEFAULT_HEADER,
        body: JSON.stringify(rawBody)
    })
        // .then(() => console.log("Add success"))
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

const removeArtist = targetId => removeArtistFromFile(targetId)
    .then(() => {
        const targetItem = document.getElementById(`${targetId}`)

        const resultList = document.querySelector("div.result_list")
        resultList.removeChild(targetItem)
    })

const removeArtistFromFile = id => fetch(`/deleteArtist/${id}`, {
    method: 'DELETE'
})

const search = () => {
    const searchForm = document.forms["searchForm"]
    const targetArtistName = searchForm.artistName.value

    const resultList = document.querySelector("div.result_list");
    while (resultList.firstChild) {
        resultList.removeChild(resultList.firstChild)
    };

    targetArtistName.length == 0 ? initialLoad() :
        fetch(`/getArtistByName/${targetArtistName}`, {
            method: 'GET',
            headers: DEFAULT_HEADER
        })
            .then(res => res.json())
            .then(artistList => Object.keys(artistList).forEach(k =>
                addArtistToDom(artistList[k], k))
            )
}