const indexHeroContainer = document.querySelector('#index-hero-container')
const messageContainer = document.querySelector('#message-container')
const showHeroContainer = document.querySelector('#show-hero-container')

//Check for Failure
export const onFailure = (error) => {
    messageContainer.innerHTML = `
    <h3>You've got an error! : (</h3>
    <p>${error}</p>
    `
}

//CREATE
export const onCreateHeroSuccess = () => {
    messageContainer.innerText = 'You have created a hero!! : )'
}

//INDEX
export const onIndexHeroSuccess = (heroes) => {
    heroes.forEach(hero => {
        const div = document.createElement('div')
        div.innerHTML = `<h3>${hero.heroName}</h3><h3>${hero.realName}</h3>
        <button data-id="${hero._id}">Show Hero</button>
        `
        indexHeroContainer.appendChild(div)
    })
}

//SHOW - UPDATE - DELETE
export const onShowHeroSuccess = (hero) => {
    const div = document.createElement('div')
    div.innerHTML = `<h3>${hero.heroName}</h3>
    <p>${hero.specialAbility}</p>
    <p>${hero._id}</p>

    <form data-id="${hero._id}">
        <input type="text" name="heroName" value="${hero.heroName}" />
        <input type="text" name="realName" value="${hero.realName}" />
        <input type="text" name="ability" value="${hero.specialAbility}" />
        <input type="submit" value="Update Hero" />
    </form>

    <button data-id="${hero._id}">Delete Hero</button>
    `
    showHeroContainer.appendChild(div)
}

//UPDATE
export const onUpdateHeroSuccess = () => {
    messageContainer.innerText = 'Update was successful! :)'
}

//DELETE
export const onDeleteHeroSuccess = () => {
    messageContainer.innerText = 'Delete was successful! :)'
}