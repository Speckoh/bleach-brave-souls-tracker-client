import { 
    indexCharacter, 
    createCharacter,
    showCharacter,
    updateCharacter, 
    deleteCharacter
} from "./api.js"
import { 
    onIndexCharacterSuccess, 
    onFailure, 
    onCreateCharacterSuccess,
    onShowCharacterSuccess,
	onUpdateCharacterSuccess,
	onDeleteCharacterSuccess,
    refreshEntries,
} from "./ui.js"

const createCharacterForm = document.querySelector('#create-character-form')
const mainPage = document.querySelector('#main-page')
const createUpdatePage = document.querySelector('#create-update-page')
const indexCharacterContainer = document.querySelector('#value-container')
const showCharacterContainer = document.querySelector('#show-character-container')
// const deleteButton = document.querySelector('#delete-entry')

let addingEntry = false;
let entryToUpdate;

indexCharacter()
.then(res => res.json())
.then(res => {
    console.log(res.characters[0]._id)
    onIndexCharacterSuccess(res.characters)
})
.catch(onFailure)

//CREATE
document.addEventListener('click', (event) => {
    event.preventDefault()
    //GO TO CREATE/UPDATE PAGE TO ADD
    if(event.target.matches('#add-new-entry-button')){
        console.log('bring up add page')
        addingEntry = true;
        createUpdatePage.style.display = 'block'
        mainPage.style.display = 'none'
        document.querySelectorAll('.input-field').forEach( (event) => {
            event.firstChild.value = '';
        })
    }
    //GO TO CREATE/UPDATE PAGE TO EDIT
    if(event.target.matches('#update-entry')){
        console.log('bring up edit page')
        addingEntry = false;
        const id = event.target.getAttribute('data-id')
        entryToUpdate = id;
        createUpdatePage.style.display = 'block'
        mainPage.style.display = 'none'
        showCharacter(id)
        .then((res) => res.json())
        .then((res) => {
            // console.log(res.character)
            document.querySelector('#input-name').value = res.character.name
            document.querySelector('#input-attribute').value = res.character.attribute
            document.querySelector('#input-killer').value = res.character.killer
            document.querySelector('#input-soulTrait').value = res.character.soulTrait
        })
		.catch(onFailure)
        // //UPDATE
// showCharacterContainer.addEventListener('submit', (event) => {
// 	event.preventDefault()
// 	const id = event.target.getAttribute('data-id')
// 	const characterData = {
// 		character: {
// 			name: event.target['name'].value,
//             attribute: event.target['attribute'].value,
//             killer: event.target['killer'].value,
//             soulTrait: event.target['soulTrait'].value,
//             characterLinks: event.target['characterLinks'].value,
//             slotLvls: event.target['slotLvls'].value
// 		},
// 	}
//     if (!id){return}
// 	updateCharacter(characterData, id)
// 		.then(onUpdateCharacterSuccess)
// 		.catch(onFailure)
// })
    }
    //Return to MAIN PAGE
    if(event.target.matches('#return-button')){
        console.log('back to main page')
        mainPage.style.display = 'block'
        createUpdatePage.style.display = 'none'
    }
    //ADD BUTTON to ADD THE ENTRY
    if(event.target.matches('#add-update-button')){
        if(addingEntry){
            console.log('add/create button pressed')
            const characterData = {
                character:{
                    name: document.querySelector('#input-name').value,
                    attribute: document.querySelector('#input-attribute').value,
                    killer: document.querySelector('#input-killer').value,
                    soulTrait: document.querySelector('#input-soulTrait').value,
                    // accessories: event.target['ability'].value
                    characterLinks: document.querySelector('#input-link1').value,
                    slotLvls: document.querySelector('#input-slot1').value
                }
            }
            createCharacter(characterData)
            .then(onCreateCharacterSuccess)
            .catch(onFailure)
        }
        else if(!addingEntry){
            console.log(entryToUpdate)
            const characterData = {
                character: {
                    name: document.querySelector('#input-name').value,
                    attribute: document.querySelector('#input-attribute').value,
                    killer: document.querySelector('#input-killer').value,
                    soulTrait: document.querySelector('#input-soulTrait').value
                }
            }
            updateCharacter(characterData, entryToUpdate)
            .then(onUpdateCharacterSuccess)
            .then(function(){
                refreshEntries(document.querySelector('#value-container'))
                indexCharacter()
                .then(res => res.json())
                .then(res => {
                onIndexCharacterSuccess(res.characters)
                })
            })
            .catch(onFailure)
            mainPage.style.display = 'block'
            createUpdatePage.style.display = 'none'
        }
    }
    //DELETE ENTRY
    if(event.target.matches('#delete-entry')){
        const id = event.target.getAttribute('data-id')
        console.log(id)
	    deleteCharacter(id)
		.then(onDeleteCharacterSuccess)
        .then(function(){
            refreshEntries(document.querySelector('#value-container'))
            indexCharacter()
            .then(res => res.json())
            .then(res => {
            onIndexCharacterSuccess(res.characters)
            })
        })
		.catch(onFailure)
    }
})

// //SHOW
// indexCharacterContainer.addEventListener('click', (event) => {
//     const id = event.target.getAttribute("data-id")
//     if (!id){return}
//     showCharacter(id)
//     .then((res) => res.json())
// 	.then((res) => onShowCharacterSuccess(res.character))
// 	.catch(onFailure)
// })

// //UPDATE
// showCharacterContainer.addEventListener('submit', (event) => {
// 	event.preventDefault()
// 	const id = event.target.getAttribute('data-id')
// 	const characterData = {
// 		character: {
// 			name: event.target['name'].value,
//             attribute: event.target['attribute'].value,
//             killer: event.target['killer'].value,
//             soulTrait: event.target['soulTrait'].value,
//             characterLinks: event.target['characterLinks'].value,
//             slotLvls: event.target['slotLvls'].value
// 		},
// 	}
//     if (!id){return}
// 	updateCharacter(characterData, id)
// 		.then(onUpdateCharacterSuccess)
// 		.catch(onFailure)
// })

// //DELETE
// showCharacterContainer.addEventListener('click', (event) => {
// 	const id = event.target.getAttribute('data-id')
//     if (!id){return}
// 	deleteCharacter(id)
// 		.then(onDeleteCharacterSuccess)
// 		.catch(onFailure)
// })