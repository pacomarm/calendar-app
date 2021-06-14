import { mount, configure } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { LoginScreen } from '../../components/auth/LoginScreen'
import { startLogin, startRegister } from '../../actions/auth'
import Swal from 'sweetalert2'
configure({adapter: new Adapter()});

jest.mock('../../actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
}))

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares)

const initState = {};
let store = mockStore( initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <LoginScreen/>
    </Provider>
)

describe('tests in LoginScreen', () => {

    beforeEach( () => {
        jest.clearAllMocks()
    })
    
    test('should show correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('should call dispatch to login', () => {
        
        wrapper.find('input[name="lEmail"]').simulate('change', {
            target: {
                name: 'lEmail',
                value: 'tmltc@gmail.com'
            }
        });

        wrapper.find('input[name="lPassword"]').simulate('change', {
            target: {
                name: 'lPassword',
                value: 'pass00'
            }
        });

        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        });

        expect( startLogin).toHaveBeenCalledWith('tmltc@gmail.com','pass00')
    })

    test('no register if passwords are different', () => {

        wrapper.find('input[name="rName"]').simulate('change', {
            target: {
                name: 'rName',
                value: 'Swaggy'
            }
        });
        
        wrapper.find('input[name="lEmail"]').simulate('change', {
            target: {
                name: 'lEmail',
                value: 'tmltc@gmail.com'
            }
        });

        wrapper.find('input[name="rPassword1"]').simulate('change', {
            target: {
                name: 'rPassword1',
                value: 'pass00'
            }
        });

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        });

        expect( startRegister).not.toHaveBeenCalled()
        expect( Swal.fire).toHaveBeenCalledWith("Error", "Thy passwords shall match!")
    })

    test('register if passwords match', () => {

        wrapper.find('input[name="rName"]').simulate('change', {
            target: {
                name: 'rName',
                value: 'Swaggy'
            }
        });
        
        wrapper.find('input[name="lEmail"]').simulate('change', {
            target: {
                name: 'lEmail',
                value: 'tmltc@gmail.com'
            }
        });

        wrapper.find('input[name="rPassword1"]').simulate('change', {
            target: {
                name: 'rPassword1',
                value: 'pass00'
            }
        });

        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: 'pass00'
            }
        });

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        });

        expect( startRegister).toHaveBeenCalled()
        expect( Swal.fire).not.toHaveBeenCalled()
    })
    

})
