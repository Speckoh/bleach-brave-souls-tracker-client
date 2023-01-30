import { store } from './store.js'

import { 
    indexCharacter,
    createAccessory
} from "./api.js"

const indexCharacterContainer = document.querySelector('#value-container')
const authContainer = document.querySelector('#auth-container')

//Check for Failure
export const onFailure = (error) => {
    console.log(error)
}
//Formats the Accessories to Read in Brackets
function formatAccessories(field){
    let accessories = ['Empty', 'Empty', 'Empty']
    for(let i = 0; i < 3; i++){
        if(field[i] !== undefined){
            if(field[i].name !== ''){
                accessories[i] = field[i].name
            }
        }
    }
    return `[${accessories[0]}] [${accessories[1]}] [${accessories[2]}]`
}
//Formats the Character Links to Read in Brackets
function formatLinks(field){
    for(let i = 0; i < 3; i++){
        if(field[i] === undefined || field[i] === ''){
            field[i] = 'Empty'
        }
    }
    return `[${field[0]}] [${field[1]}] [${field[2]}]`
}
//Formats the Slots to Read with Slashes in-between
function formatUndefinedSlots(character){
    if(character.slotLvls === undefined || character.slotLvls === ''){
        character.slot1Lvl = 0
        character.slot2Lvl = 0
        character.slot3Lvl = 0
        character.slotLvls =  `${character.slot1Lvl}/${character.slot2Lvl}/${character.slot3Lvl}`
    }
    return character.slotLvls
}
//AFTER THE ENTRY IS CREATED
export const onCreateCharacterSuccess = () => {
    indexCharacter()
    .then(res => res.json())
    .then(res => {
        const createdEntryId = res.characters[res.characters.length - 1]._id;
        //Not sure how to put these 3 Object into a Function
        const accessory1Data = {
            accessory:{
                name: document.querySelector('#accessory1').value,
                attribute: document.querySelector('#acc-attribute1').value,
                effect: document.querySelector('#acc-effect1').value,
                bonus: document.querySelector('#acc-bonus1').value,
                characterId: createdEntryId
            }
        }
        const accessory2Data = {
            accessory:{
                name: document.querySelector('#accessory2').value,
                attribute: document.querySelector('#acc-attribute2').value,
                effect: document.querySelector('#acc-effect2').value,
                bonus: document.querySelector('#acc-bonus2').value,
                characterId: createdEntryId
            }
        }
        const accessory3Data = {
            accessory:{
                name: document.querySelector('#accessory3').value,
                attribute: document.querySelector('#acc-attribute3').value,
                effect: document.querySelector('#acc-effect3').value,
                bonus: document.querySelector('#acc-bonus3').value,
                characterId: createdEntryId
            }
        }
        /* 
        The Accessories are not Pushing in Order Unless I Chain Promises... >:/
         */
        indexCharacter()
        .then(res => res.json())
        .then(() => {
            createAccessory(accessory1Data)
            indexCharacter()
            .then(res => res.json())
            .then(() => {
                createAccessory(accessory2Data)
                indexCharacter()
                .then(res => res.json())
                .then(() => {
                    createAccessory(accessory3Data)
                    .then(function(){
                        refreshEntries(indexCharacterContainer)
                        indexCharacter()
                        .then(res => res.json())
                        .then(res => {
                        onIndexCharacterSuccess(res.characters)
                        document.querySelector('#main-page').style.display = 'block'
                        document.querySelector('#create-update-page').style.display = 'none'
                        })
                    })
                })
            })
        })
    })
}
//INDEX - REPOPULATES DATA ON MAIN PAGE
export const onIndexCharacterSuccess = (characters) => {
    characters.forEach(character => {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="row-container">
            <div>${character.name}</div>
            <div>${character.attribute}</div>
            <div>${character.killer}</div>
            <div>${character.soulTrait}</div>
            <div>${formatAccessories(character.accessories)}</div>
            <div>${formatLinks(character.characterLinks)}</div>
            <div>${formatUndefinedSlots(character)}</div>
            <div class="action-container">
                <button data-id="${character._id}" class="update-entry">
                <img class="edit-icon" src="./assets/edit.png">
                </button>
                <button data-id="${character._id}" class="delete-entry">
                <img class="trash-icon" src="./assets/trash.png">
                </button>
            </div>
        </div>
        `
        indexCharacterContainer.appendChild(div)
    })
}

//UPDATE
export const onUpdateCharacterSuccess = () => {
    console.log("update was successful!")
}

//DELETE
export const onDeleteCharacterSuccess = () => {
    console.log("delete was successful!")
}
//DELETES Everything in Div Container
export const refreshEntries = (container) => {
    while(container.lastElementChild){
        container.removeChild(container.lastElementChild)
    }
}

// User Actions
export const onSignUpSuccess = () => {
    console.log('You\'ve created a new user! Now Sign In')
}

export const onSignInSuccess = (userToken) => {
    store.userToken = userToken
}