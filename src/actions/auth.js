import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";


export const startLogin = (email, password) => {
    return async(dispatch) => {
        const res = await fetchSinToken('auth', {email, password}, 'POST');
        const body = await res.json();
        
        if( body.ok ){
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            Swal.fire('Error', 'Incorrect user credentials!', 'error')
        }
    }
}

export const startRegister = (name, email, password) => {
    return async(dispatch) => {
        const res = await fetchSinToken('auth/new', {name, email, password}, 'POST');
        const body = await res.json();

        if (body.ok){
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            dispatch( login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg || 'Could not register user!', 'error')
        }
    }
}

export const startChecking = () => {
    return async(dispatch) => {
        const res = await fetchConToken('auth/renew');
        const body = await res.json();

        if (body.ok){
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            dispatch( login({
                uid: body.uid,
                name: body.name
            }));

        } else {
            dispatch( checkingFinish() )
        }
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish })

const login = (user) => ({
    type: types.authLogin,
    payload: user
})