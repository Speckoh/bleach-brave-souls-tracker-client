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
//################################# ACCESSORY CRUD ##################################

//CREATE Accessory
export const createAccessory = (data) => {
    return fetch(`http://localhost:8005/accessories`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}
//UPDATE
export const updateAccessory = (data, id) => {
    return fetch(`http://localhost:8005/accessories/${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}
//DELETE
export const deleteAccessory = (id) => {
    return fetch(`http://localhost:8005/accessories/${id}`, {
        method: 'DELETE'
    })
}