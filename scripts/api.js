import { store } from './store.js'
// User actions
export const signUp = (data) => {
	return fetch(`http://localhost:8005/sign-up`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

export const signIn = (data) => {
	return fetch(`http://localhost:8005/sign-in`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}
export const indexUser = () => {
    return fetch(`http://localhost:8005/characters`, {
        headers: {
			'Authorization': `Bearer ${store.userToken}`,
		},
    })
}
//INDEX
export const indexCharacter = () => {
    return fetch(`http://localhost:8005/characters`, {
        headers: {
			'Authorization': `Bearer ${store.userToken}`,
		},
    })
}
//SHOW
export const showCharacter = (id) => {
    return fetch(`http://localhost:8005/characters/${id}`, {
		headers: {
			Authorization: `Bearer ${store.userToken}`,
		},
	})
}
//CREATE second fetch parameter is options
export const createCharacter = (data) => {
    return fetch(`http://localhost:8005/characters`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
			'Authorization': `Bearer ${store.userToken}`,
        },
        body: JSON.stringify(data)
    })
}

//UPDATE
export const updateCharacter = (data, id) => {
    return fetch(`http://localhost:8005/characters/${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
			'Authorization': `Bearer ${store.userToken}`,
        },
        body: JSON.stringify(data)
    })
}

//DELETE
export const deleteCharacter = (id) => {
    return fetch(`http://localhost:8005/characters/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${store.userToken}`,
		},
	})
}
//################################# ACCESSORY CRUD ##################################

//CREATE Accessory
export const createAccessory = (data) => {
    return fetch(`http://localhost:8005/accessories`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.userToken}`,
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
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.userToken}`,
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
