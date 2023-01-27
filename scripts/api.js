//INDEX
export const indexCharacter = () => {
    return fetch(`http://localhost:8005/characters`)
}
//CREATE second fetch parameter is options
export const createCharacter = (data) => {
    return fetch(`http://localhost:8005/characters`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    // .then(function(){
    //     console.log(data)
    //     console.log(indexCharacter())
    //     location.reload();
    //     document.querySelector('#main-page').style.display = 'block'
    //     document.querySelector('#create-update-page').style.display = 'none'
    // })
    // .then(response => response.json())
    // .then(function(){
    //     document.querySelector('#main-page').style.display = 'block'
    //     document.querySelector('#create-update-page').style.display = 'none'
    // })
}

export const showCharacter = (id) => {
    return fetch(`http://localhost:8005/characters/${id}`)
}

//UPDATE
export const updateCharacter = (data, id) => {
    return fetch(`http://localhost:8005/characters/${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

//DELETE
export const deleteCharacter = (id) => {
    return fetch(`http://localhost:8005/characters/${id}`, {
        method: 'DELETE'
    })
}