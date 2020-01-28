const STRING_LIMIT = 40;

const showForm = () => {
    const formContainer = document.querySelector("div.form_container");
    const isFormVisible = formContainer.style.display === "flex";
    formContainer.style.display = isFormVisible ? "none" : "flex"; // reverse visibility
}

const addArtist = () => {
    const newId = (new Date()).getTime()

    const artistForm = document.forms["artistForm"]

    const artistName = artistForm.artistName.value
    const artistDesc = artistForm.artistDesc.value
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

    const artistImg = artistForm.artistImg.value
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
}

const removeArtist = targetId => {
    const targetItem = document.getElementById(`${targetId}`)

    const resultList = document.querySelector("div.result_list")
    resultList.removeChild(targetItem)
}
