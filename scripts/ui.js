const indexCharacterContainer = document.querySelector('#index-character-container')
const messageContainer = document.querySelector('#message-container')
const showCharacterContainer = document.querySelector('#show-character-container')

//Check for Failure
export const onFailure = (error) => {
    messageContainer.innerHTML = `
    <h3>You've got an error! : (</h3>
    <p>${error}</p>
    `
}

//CREATE
export const onCreateCharacterSuccess = () => {
    messageContainer.innerText = 'You have created a character!! : )'
}

//INDEX
export const onIndexCharacterSuccess = (characters) => {
    characters.forEach(character => {
        const div = document.createElement('div')
        div.innerHTML = `<h3>${character.name}</h3>
        <h3>${character.attribute}</h3>
        <h3>${character.killer}</h3>
        <h3>${character.soulTrait}</h3>
        <h3>${character.characterLinks}</h3>
        <h3>${character.slotLvls}</h3>
        <button data-id="${character._id}">Show Character</button>
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
        <input type="text" name="characterName" value="${character.name}" />
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
    messageContainer.innerText = 'Update was successful! :)'
}

//DELETE
export const onDeleteCharacterSuccess = () => {
    messageContainer.innerText = 'Delete was successful! :)'
}