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

export const createAccessory = (data) => {
    return fetch(`http://localhost:8005/characters/accessories`,{
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