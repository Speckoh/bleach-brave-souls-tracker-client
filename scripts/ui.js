const indexCharacterContainer = document.querySelector('#value-container')
// const messageContainer = document.querySelector('#message-container')
const showCharacterContainer = document.querySelector('#show-character-container')

//Check for Failure
export const onFailure = (error) => {
    // messageContainer.innerHTML = `
    // <h3>You've got an error! : (</h3>
    // <p>${error}</p>
    // `
    console.log("You've got an error!")
}

//CREATE
export const onCreateCharacterSuccess = () => {
    console.log("you created the entry!")
    // messageContainer.innerText = 'You have created a character!! : )'
}

//INDEX
export const onIndexCharacterSuccess = (characters) => {
    characters.forEach(character => {
        const div = document.createElement('div')
        div.innerHTML = `
        <div id="row-container">
            <div>${character.name}</div>
            <div>${character.attribute}</div>
            <div>${character.killer}</div>
            <div>${character.soulTrait}</div>
            <div></div>
            <div>${character.characterLinks}</div>
            <div>${character.slotLvls}</div>
            <div id="action-container">
                <button>U</button>
                <button>D</button>
            </div>
        </div>
        `
        indexCharacterContainer.appendChild(div)
    })
}

//SHOW - UPDATE - DELETE
export const onShowCharacterSuccess = (character) => {
    const div = document.createElement('div')
    div.innerHTML = `<h3>${character.name}</h3>
    <p>${character.attribute}</p>
    <p>${character._id}</p>

    <form data-id="${character._id}">
        <input type="text" name="name" value="${character.name}" />
        <input type="text" name="attribute" value="${character.attribute}" />
        <input type="text" name="killer" value="${character.killer}" />
        <input type="text" name="soulTrait" value="${character.soulTrait}" />
        <input type="text" name="characterLinks" value="${character.characterLinks}" />
        <input type="text" name="slotLvls" value="${character.slotLvls}" />
        <input type="submit" value="Update Character" />
    </form>

    <button data-id="${character._id}">Delete Character</button>
    `
    
    showCharacterContainer.appendChild(div)
}

//UPDATE
export const onUpdateCharacterSuccess = () => {
    console.log("update was successful!")
    // messageContainer.innerText = 'Update was successful! :)'
}

//DELETE
export const onDeleteCharacterSuccess = () => {
    console.log("delete was successful!")
    // messageContainer.innerText = 'Delete was successful! :)'
}