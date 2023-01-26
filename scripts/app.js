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
const indexCharacterContainer = document.querySelector('#index-character-container')
const showCharacterContainer = document.querySelector('#show-character-container')

indexCharacter()
.then(res => res.json())
.then(res => {
    console.log(res)
    onIndexCharacterSuccess(res.characters)
})
.catch(onFailure)

//CREATE
createCharacterForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const characterData = {
        character:{
            characterName: event.target['characterName'].value,
            realName: event.target['realName'].value,
            specialAbility: event.target['ability'].value
        }
    }
    createCharacter(characterData)
    .then(onCreateCharacterSuccess)
    .catch(onFailure)
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
			characterName: event.target['characterName'].value,
            realName: event.target['realName'].value,
            specialAbility: event.target['ability'].value
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