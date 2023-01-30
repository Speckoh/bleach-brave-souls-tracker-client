import { 
    signUp,
	signIn,
    indexCharacter, 
    createCharacter,
    showCharacter,
    updateCharacter, 
    deleteCharacter,
    updateAccessory,
} from "./api.js"
import { 
    onIndexCharacterSuccess, 
    onFailure, 
    onSignUpSuccess,
	onSignInSuccess,
    onCreateCharacterSuccess,
	onUpdateCharacterSuccess,
	onDeleteCharacterSuccess,
    refreshEntries,
} from "./ui.js"

const mainPage = document.querySelector('#main-page')
const createUpdatePage = document.querySelector('#create-update-page')
const indexCharacterContainer = document.querySelector('#value-container')
const signUpContainer = document.querySelector('#sign-up-form-container')
const signInContainer = document.querySelector('#sign-in-form-container')

let characterLink1 = document.querySelector('#input-link1')
let characterLink2 = document.querySelector('#input-link2')
let characterLink3 = document.querySelector('#input-link3')

let slot1Lvl = document.querySelector('#input-slot1')
let slot2Lvl = document.querySelector('#input-slot2')
let slot3Lvl = document.querySelector('#input-slot3')

let addingEntry = false
let entryToUpdate
let accessoriesToUpdate

//Checks for what is Entered in Input is a Number
function checkSlotValue(slotLvl){
    if(Number.isInteger(parseInt(slotLvl.value))){
        return slotLvl.value
    }else{
        return 0
    }
}
//Checks for Undefined Slots when Adding in POSTMAN since Slots aren't Required
function checkSlotForUndefined(slot){
    if(slot === undefined){
        return 0
    }else{
        return slot
    }
}
//Checks for Undefined Character Links when Adding in POSTMAN since Links aren't Required
function checkLinkForUndefined(link){
    if(link === undefined){
        return ''
    }else{
        return link
    }
}
//Checks for Undefined Accessories when Adding in POSTMAN
function checkAccessoryForUndefined(remove, accessory, attribute, effect, bonus, response){
    for(let i = 0; i < 3; i++){
        if(response[i] !== undefined){
            document.querySelector(`${remove}${i + 1}`).setAttribute('data-id', `${response[i]._id}`)
            document.querySelector(`${accessory}${i + 1}`).value = response[i].name
            document.querySelector(`${attribute}${i + 1}`).value = response[i].attribute
            document.querySelector(`${effect}${i + 1}`).value = response[i].effect
            document.querySelector(`${bonus}${i + 1}`).value = response[i].bonus
        }
    }
}
// indexCharacter()
// .then(res => res.json())
// .then(res => {
//     onIndexCharacterSuccess(res.characters)
//     console.log(res.characters)
// })
// .catch(onFailure)
//User Actions
document.addEventListener('click', (event) => {
	event.preventDefault()
    if(event.target.matches('#sign-up-button')){
        const userData = {
            credentials: {
                email: document.querySelector('#new-user-email').value,
                password: document.querySelector('#new-user-pwd').value,
            },
        }
        signUp(userData).then(onSignUpSuccess).catch(onFailure)
    }
})

document.addEventListener('click', (event) => {
	event.preventDefault()
    if(event.target.matches('#sign-in-button')){
        console.log("signin")
        const userData = {
            credentials: {
                email: document.querySelector('#existing-user-email').value,
                password: document.querySelector('#existing-user-pwd').value,
            },
        }
        signIn(userData)
        .then(function(){
            indexCharacter()
            .then(res => res.json())
            .then(res => {
                onIndexCharacterSuccess(res.characters)
                console.log(res.characters)
                document.querySelector('#main-page').style.display = 'block'
                document.querySelector('#login-screen').style.display = 'none'
            })
            .catch(onFailure)
        })
    }
})
//CREATE
document.addEventListener('click', (event) => {
    event.preventDefault()
    //GO TO CREATE/UPDATE PAGE TO ADD
    if(event.target.matches('#add-new-entry-button')){
        addingEntry = true;
        createUpdatePage.style.display = 'block'
        mainPage.style.display = 'none'
        document.querySelectorAll('.input-field').forEach( (event) => {
            event.firstElementChild.value = ''
        })
    }
    //GO TO CREATE/UPDATE PAGE TO EDIT
    if(event.target.matches('.update-entry')){
        addingEntry = false;
        const id = event.target.getAttribute('data-id')
        entryToUpdate = id;
        createUpdatePage.style.display = 'block'
        mainPage.style.display = 'none'
        refreshUpdatePage(id)
    }
    //Return to MAIN PAGE
    if(event.target.matches('#return-button')){
        indexCharacter()
        .then(res => res.json())
        .then(res => {
            console.log(res.characters)
        })
        .catch(onFailure)
        mainPage.style.display = 'block'
        createUpdatePage.style.display = 'none'
    }
    //CLICKING THE ADD/UPDATE BUTTON ON ADD/UPDATE PAGE
    if(event.target.matches('#add-update-button')){
        //ADDING NEW ENTRY
        if(addingEntry){
            const characterData = {
                character:{
                    name: document.querySelector('#input-name').value,
                    attribute: document.querySelector('#input-attribute').value,
                    killer: document.querySelector('#input-killer').value,
                    soulTrait: document.querySelector('#input-soulTrait').value,
                    accessories: [],
                    characterLinks: [],
                    slot1Lvls: checkSlotValue(slot1Lvl),
                    slot2Lvls: checkSlotValue(slot2Lvl),
                    slot3Lvls: checkSlotValue(slot3Lvl),
                    slotLvls: `${checkSlotValue(slot1Lvl)}/${checkSlotValue(slot2Lvl)}/${checkSlotValue(slot3Lvl)}`
                }
            }
            characterData.character.characterLinks.push(characterLink1.value)
            characterData.character.characterLinks.push(characterLink2.value)
            characterData.character.characterLinks.push(characterLink3.value)
            
            createCharacter(characterData)
            .then(onCreateCharacterSuccess)
            .catch(onFailure)

        }
        //UPDATING AN EXISTING ENTRY
        else if(!addingEntry){
            console.log(entryToUpdate)
            console.log(accessoriesToUpdate)
            const characterData = {
                character: {
                    name: document.querySelector('#input-name').value,
                    attribute: document.querySelector('#input-attribute').value,
                    killer: document.querySelector('#input-killer').value,
                    soulTrait: document.querySelector('#input-soulTrait').value,
                    
                    // accessories: document.querySelector('#accessory').value,
                    
                    characterLinks: [characterLink1.value, characterLink2.value, characterLink3.value],
                    slot1Lvls: checkSlotValue(slot1Lvl),
                    slot2Lvls: checkSlotValue(slot2Lvl),
                    slot3Lvls: checkSlotValue(slot3Lvl),
                    slotLvls: `${checkSlotValue(slot1Lvl)}/${checkSlotValue(slot2Lvl)}/${checkSlotValue(slot3Lvl)}`
                }
            }
            const accessory1Data = {
                accessory:{
                    name: document.querySelector('#accessory1').value,
                    attribute: document.querySelector('#acc-attribute1').value,
                    effect: document.querySelector('#acc-effect1').value,
                    bonus: document.querySelector('#acc-bonus1').value,
                    characterId: entryToUpdate
                }
            }
            const accessory2Data = {
                accessory:{
                    name: document.querySelector('#accessory2').value,
                    attribute: document.querySelector('#acc-attribute2').value,
                    effect: document.querySelector('#acc-effect2').value,
                    bonus: document.querySelector('#acc-bonus2').value,
                    characterId: entryToUpdate
                }
            }
            const accessory3Data = {
                accessory:{
                    name: document.querySelector('#accessory3').value,
                    attribute: document.querySelector('#acc-attribute3').value,
                    effect: document.querySelector('#acc-effect3').value,
                    bonus: document.querySelector('#acc-bonus3').value,
                    characterId: entryToUpdate
                }
            }

            console.log(characterData)
            updateCharacter(characterData, entryToUpdate)
            updateAccessory(accessory1Data, accessoriesToUpdate[0]._id)
            updateAccessory(accessory2Data, accessoriesToUpdate[1]._id)
            updateAccessory(accessory3Data, accessoriesToUpdate[2]._id)
            .then(onUpdateCharacterSuccess)
            .then(function(){
                refreshEntries(indexCharacterContainer)
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
    if(event.target.matches('.delete-entry')){
        const id = event.target.getAttribute('data-id')
        console.log(id)
	    deleteCharacter(id)
		.then(onDeleteCharacterSuccess)
        .then(function(){
            refreshEntries(indexCharacterContainer)
            indexCharacter()
            .then(res => res.json())
            .then(res => {
            onIndexCharacterSuccess(res.characters)
            })
        })
		.catch(onFailure)
    }
    //CLEAR ACCESSORY
    if(event.target.matches('.delete-accessory-button')){
        // console.log(event.target.getAttribute('data-id'))
        //deleteAccessory(event.target.getAttribute('data-id'))
        showCharacter(entryToUpdate)
        .then((res) => res.json())
        .then((res) => {
            console.log(res.character.accessories)
            for (let i = 0; i < res.character.accessories.length; i++){
                if(res.character.accessories[i]._id === event.target.getAttribute('data-id')){
                    console.log(res.character._id)
                    res.character.accessories[i].characterId = res.character._id
                    console.log(res.character.accessories[i])
                    const accessoryData = {
                        accessory:{
                            name: '',
                            attribute: '',
                            effect: '',
                            bonus: '',
                            characterId: entryToUpdate
                        }
                    }
                    updateAccessory(accessoryData, accessoriesToUpdate[i]._id)
                    showCharacter(entryToUpdate)
                    .then(res => res.json())
                    .then(res => {
                        refreshUpdatePage(res.character._id)
                    })
                    .catch(onFailure)
                    
                }
            }
        })
    }
})

function refreshUpdatePage(id){
    showCharacter(id)
        .then((res) => res.json())
        .then((res) => {
            //console.log(res.character)
            //console.log(res.character.accessories[0]._id)
            accessoriesToUpdate = res.character.accessories

            document.querySelector('#input-name').value = res.character.name
            document.querySelector('#input-attribute').value = res.character.attribute
            document.querySelector('#input-killer').value = res.character.killer
            document.querySelector('#input-soulTrait').value = res.character.soulTrait

            characterLink1.value = checkLinkForUndefined(res.character.characterLinks[0])
            characterLink2.value = checkLinkForUndefined(res.character.characterLinks[1])
            characterLink3.value = checkLinkForUndefined(res.character.characterLinks[2])

            slot1Lvl.value = checkSlotForUndefined(res.character.slot1Lvls)
            slot2Lvl.value = checkSlotForUndefined(res.character.slot2Lvls)
            slot3Lvl.value = checkSlotForUndefined(res.character.slot3Lvls)
            
            checkAccessoryForUndefined('#delete-accessory-slot', '#accessory','#acc-attribute','#acc-effect','#acc-bonus', res.character.accessories)
        })
		.catch(onFailure)
}
