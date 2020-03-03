const STRING_LIMIT = 40;
const DEFAULT_HEADER = {
    'Content-type': 'application/json'
}

const showForm = () => {
    const formContainer = document.querySelector("div.form_container");
    const isFormVisible = formContainer.style.display === "flex";
    formContainer.style.display = isFormVisible ? "none" : "flex"; // reverse visibility
}   

const removeArtist = id => fetch(`/artists/${id}`, {
    method: 'DELETE'
}).then(() => {
    const targetItem = document.getElementById(`${id}`)

    const resultList = document.querySelector("div.result_list")
    resultList.removeChild(targetItem)
})
