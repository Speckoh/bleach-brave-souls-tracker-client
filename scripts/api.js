import { store } from './store.js'

//##################################
//API FETCH CALLS
//##################################


//##################################
// USER ACTIONS
//##################################
export const signUp = (data) => {
	return fetch(`https://bleach-brave-souls-tracker-server.onrender.com/sign-up`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

export const signIn = (data) => {
	return fetch(`https://bleach-brave-souls-tracker-server.onrender.com/sign-in`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

//##################################
// CHARACTER CALLS
//##################################
//INDEX
export const indexCharacter = () => {
    return fetch(`https://bleach-brave-souls-tracker-server.onrender.com/characters`, {
        headers: {
			'Authorization': `Bearer ${store.userToken}`,
		},
    })
}
//SHOW
export const showCharacter = (id) => {
    return fetch(`https://bleach-brave-souls-tracker-server.onrender.com/characters/${id}`, {
		headers: {
			Authorization: `Bearer ${store.userToken}`,
		},
	})
}
//CREATE - second fetch parameter is options
export const createCharacter = (data) => {
    return fetch(`https://bleach-brave-souls-tracker-server.onrender.com/characters`,{
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
    return fetch(`https://bleach-brave-souls-tracker-server.onrender.com/characters/${id}`, {
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
    return fetch(`https://bleach-brave-souls-tracker-server.onrender.com/characters/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${store.userToken}`,
		},
	})
}
//################################# 
//ACCESSORY CALLS
//##################################

//CREATE Accessory
export const createAccessory = (data) => {
    return fetch(`https://bleach-brave-souls-tracker-server.onrender.com/accessories`,{
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
    return fetch(`https://bleach-brave-souls-tracker-server.onrender.com/accessories/${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.userToken}`,
        },
        body: JSON.stringify(data)
    })
}
