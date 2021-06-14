import { startLogin } from "../../actions/auth"
import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types"

const initialState = {
    checking: true,
    // uid: null,
    // name: null
}

describe('tests for authReducer', () => {

    test('should default state', () => {
        const state = authReducer(initialState, {})
        expect(state).toEqual(initialState)
    })

    test('should authenticate user', () => {

        const action = {
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Paco'
            }
        }

        const state = authReducer(initialState, action);
        expect(state).toEqual({
            checking: false,
            uid: '123',
            name: 'Paco'
        });
    })


    
    
})
