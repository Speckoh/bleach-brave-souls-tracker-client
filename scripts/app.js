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
} from "./ui.js"

const createCharacterForm = document.querySelector('#create-character-form')
const indexCharacterContainer = document.querySelector('#value-container')
const showCharacterContainer = document.querySelector('#show-character-container')

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
    if(event.target.matches('#add-new-entry-button')){
        console.log('bring up add page')
        // const characterData = {
        //     character:{
        //         name: document.querySelector('#input-name').value,
        //         attribute: document.querySelector('#input-attribute').value,
        //         killer: document.querySelector('#input-killer').value,
        //         soulTrait: document.querySelector('#input-soulTrait').value,
        //         // accessories: event.target['ability'].value
        //         characterLinks: document.querySelector('#input-characterLinks').value,
        //         slotLvls: document.querySelector('#input-slotLvls').value
        //     }
        // }
        // createCharacter(characterData)
        // .then(onCreateCharacterSuccess)
        // .catch(onFailure)
    }
})

//SHOW
indexCharacterContainer.addEventListener('click', (event) => {
    const id = event.target.getAttribute("data-id")
    if (!id){return}
    showCharacter(id)
    .then((res) => res.json())
	.then((res) => onShowCharacterSuccess(res.character))
	.catch(onFailure)
})

//UPDATE
showCharacterContainer.addEventListener('submit', (event) => {
	event.preventDefault()
	const id = event.target.getAttribute('data-id')
	const characterData = {
		character: {
			name: event.target['name'].value,
            attribute: event.target['attribute'].value,
            killer: event.target['killer'].value,
            soulTrait: event.target['soulTrait'].value,
            characterLinks: event.target['characterLinks'].value,
            slotLvls: event.target['slotLvls'].value
		},
	}
    if (!id){return}
	updateCharacter(characterData, id)
		.then(onUpdateCharacterSuccess)
		.catch(onFailure)
})

//DELETE
showCharacterContainer.addEventListener('click', (event) => {
	const id = event.target.getAttribute('data-id')
    if (!id){return}
	deleteCharacter(id)
		.then(onDeleteCharacterSuccess)
		.catch(onFailure)
})