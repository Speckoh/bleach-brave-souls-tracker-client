import { 
    indexCharacter
} from "./api.js"

const indexCharacterContainer = document.querySelector('#value-container')
const showCharacterContainer = document.querySelector('#show-character-container')

//Check for Failure
export const onFailure = (error) => {
    console.log("You've got an error!")
}

//CREATE
export const onCreateCharacterSuccess = () => {
    console.log("you created the entry!")
    refreshEntries(document.querySelector('#value-container'))
    indexCharacter()
    .then(res => res.json())
    .then(res => {
    onIndexCharacterSuccess(res.characters)
    document.querySelector('#main-page').style.display = 'block'
    document.querySelector('#create-update-page').style.display = 'none'
    })
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
                <button data-id="${character._id}" id="update-entry">
                <img class="edit-icon" src="./assets/edit.png">
                </button>
                <button data-id="${character._id}" id="delete-entry">
                <img class="trash-icon" src="./assets/trash.png">
                </button>
            </div>
        </div>
        `
        indexCharacterContainer.appendChild(div)
    })
}

//SHOW - UPDATE - DELETE
export const onShowCharacterSuccess = (character) => {
    const div = document.createElement('div')
    
    
    showCharacterContainer.appendChild(div)
}

// export const onShowCharacterSuccess = (character) => {
//     const div = document.createElement('div')
//     div.innerHTML = `<h3>${character.name}</h3>
//     <p>${character.attribute}</p>
//     <p>${character._id}</p>

//     <form data-id="${character._id}">
//         <input type="text" name="name" value="${character.name}" />
//         <input type="text" name="attribute" value="${character.attribute}" />
//         <input type="text" name="killer" value="${character.killer}" />
//         <input type="text" name="soulTrait" value="${character.soulTrait}" />
//         <input type="text" name="characterLinks" value="${character.characterLinks}" />
//         <input type="text" name="slotLvls" value="${character.slotLvls}" />
//         <input type="submit" value="Update Character" />
//     </form>

//     <button data-id="${character._id}">Delete Character</button>
//     `
    
//     showCharacterContainer.appendChild(div)
// }

//UPDATE
export const onUpdateCharacterSuccess = () => {
    console.log("update was successful!")
}

//DELETE
export const onDeleteCharacterSuccess = () => {
    console.log("delete was successful!")
}

export const refreshEntries = (container) =>{
    while(container.lastElementChild){
        container.removeChild(container.lastElementChild)
    }
}