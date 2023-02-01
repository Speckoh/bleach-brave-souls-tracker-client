import { store } from './store.js'

import { 
    indexCharacter,
    createAccessory
} from "./api.js"
import { 
    createAccessoryData
} from "./app.js"
const indexCharacterContainer = document.querySelector('#value-container')

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
//AFTER THE ENTRY IS CREATED TO PUSH 3 OBJECTS INTO ACCESSORY WHETHER OR NOT IT'S DEFINED
//THIS IS SO THAT THE MAIN PAGE POPULATES WITH BRACKETS INSTEAD OF BEING EMPTY, IT WILL SHOW UP AS [EMPTY] INSTEAD
export const onCreateCharacterSuccess = () => {
    indexCharacter()
    .then(res => res.json())
    .then(res => {
        console.log(res.characters)
        const createdEntryId = res.characters[res.characters.length - 1]._id;
        /* 
        The Accessories are not Pushing in Order Unless I Chain Promises... >:/
        I will fix this on the backend when I have time, need to fix other things...
         */
        indexCharacter()
        .then(res => res.json())
        .then(() => {
            createAccessory(createAccessoryData('1', createdEntryId))
            indexCharacter()
            .then(res => res.json())
            .then(() => {
                createAccessory(createAccessoryData('2', createdEntryId))
                indexCharacter()
                .then(res => res.json())
                .then(() => {
                    createAccessory(createAccessoryData('3', createdEntryId))
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
        console.log(character)
        //if(character.user === )
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
                <img class="icon" src="./assets/edit_w.png">
                </button>
                <button data-id="${character._id}" class="delete-entry">
                <img class="icon" src="./assets/trash_w.png">
                </button>
            </div>
        </div>
        `
        indexCharacterContainer.appendChild(div)
    })
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