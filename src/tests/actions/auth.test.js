import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'
import { startChecking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import Swal from 'sweetalert2';
import * as fetchModule from '../../helpers/fetch';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares)

const initState = {};
let store = mockStore( initState);

Storage.prototype.setItem = jest.fn();

describe('tests in Auth actions', () => {
    
    beforeEach( () => {
        store = mockStore( initState );
        jest.clearAllMocks();
    });

    test('start login should work', async() => {
        await store.dispatch( startLogin('tmltc@gmail.com', 'pass00') );
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });
        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String))
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
        // localStorage.setItem.mock.calls[0][1]
    })

    test('start login incorrect should work', async() => {
        await store.dispatch( startLogin('tmltc@gmail.com', 'pass001') );
        const actions = store.getActions();
        
        expect(actions).toEqual([])
        expect(Swal.fire).toHaveBeenCalledWith("Error", "Incorrect user credentials!", "error");
    })

    test('startRegister should work', async() => {

        fetchModule.fetchSinToken = jest.fn( () => ({
            json() {
                return{
                    ok: true,
                    uid: '123',
                    name: 'carlos',
                    token: 'less goo'
                }
            }
        }))

        await store.dispatch( startRegister('tmltc2@gmail.com', 'pass00', 'testU') );
        const actions = store.getActions();
        
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'carlos',
            }
        });
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'less goo')
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    })

    test('startChecking should work', async() => {

        fetchModule.fetchConToken = jest.fn( () => ({
            json() {
                return{
                    ok: true,
                    uid: '123',
                    name: 'carlos',
                    token: 'less goo'
                }
            }
        }))

        await store.dispatch( startChecking() );
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'carlos',
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'less goo')
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        
    })

})
