import { mount, configure } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { AppRouter } from '../../routers/AppRouter'
configure({adapter: new Adapter()});

const middlewares = [thunk];
const mockStore = configureStore(middlewares)


// store.dispatch = jest.fn();


describe('tests for AppRouter', () => {
    
    test('should show the wait component', () => {
        
        const initState = {
            auth: {
                checking: true
            }
        };
        let store = mockStore( initState);
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        )
        expect(wrapper).toMatchSnapshot(); 
        expect(wrapper.find('h1').exists() ).toBe(true); 

    })

    test('should show public route', () => {
        
        const initState = {
            auth: {
                checking: false,
                uid: null
            }
        };
        let store = mockStore( initState);
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        )
        expect(wrapper).toMatchSnapshot(); 
        expect(wrapper.find('.login-container').exists() ).toBe(true); 
    })

    test('should show private route', () => {
        
        const initState = {
            auth: {
                checking: false,
                uid: '123',
                name: 'Yezzy'
            },
            calendar: {
                events: []
            },
            ui:{
                modalOpen: false
            }
        };
        let store = mockStore( initState);
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        )
        expect(wrapper).toMatchSnapshot(); 
        expect(wrapper.find('.calendar-screen').exists() ).toBe(true); 
    })

})
