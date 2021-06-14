import { mount, configure } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'
import { DeleteEventFab } from '../../components/ui/DeleteEventFab'

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { eventStartDelete } from '../../actions/events'
configure({adapter: new Adapter()});

jest.mock('../../actions/events', () => ({
    eventStartDelete: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares)

const initState = {};
let store = mockStore( initState);

Storage.prototype.setItem = jest.fn();
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <DeleteEventFab/>
    </Provider>
)

describe('tests for DeleteEventFab', () => {
    
    test('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot(); 
    })

    test('should call eventStartDelete when clicked', () => {
        wrapper.find('button').prop('onClick')();
        expect(eventStartDelete).toHaveBeenCalled()
    })
})
