const STRING_LIMIT = 40;
const DEFAULT_HEADER = {
    'Content-type': 'application/json'
}

const showForm = () => {
    const formContainer = document.querySelector("div.form_container");
    const isFormVisible = formContainer.style.display === "flex";
    formContainer.style.display = isFormVisible ? "none" : "flex"; // reverse visibility
}   

const removeArtist = id => fetch(`/deleteArtist/${id}`, {
    method: 'DELETE'
}).then(() => {
    const targetItem = document.getElementById(`${id}`)

    const resultList = document.querySelector("div.result_list")
    resultList.removeChild(targetItem)
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