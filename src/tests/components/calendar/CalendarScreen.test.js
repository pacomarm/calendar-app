import { mount, configure } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen'
import { types } from '../../../types/types'
import { eventSetActive } from '../../../actions/events'
import { act } from '@testing-library/react'
configure({adapter: new Adapter()});

jest.mock('../../../actions/events', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading:jest.fn(),
}))

Storage.prototype.setItem = jest.fn()

const middlewares = [thunk];
const mockStore = configureStore(middlewares)

const initState = {
    calendar: {
        events: []
    },
    auth: {
        uid: '123',
        name: 'Paco'
    },
    ui: {
        openModal: false
    }
};
const store = mockStore( initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarScreen/>
    </Provider>
)

describe('tests for CalendarScreen', () => {

    test('should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('test with calendars intetactions', () => {
        
        const calendar = wrapper.find('Calendar');
        const calendarMessages = calendar.prop('messages');
        expect(calendarMessages).toBe(undefined);

        calendar.prop('onDoubleClickEvent')();
        expect(store.dispatch).toHaveBeenCalledWith({
            type: types.uiOpenModal
        });

        calendar.prop('onSelectEvent')({start:'Hello'});
        expect(eventSetActive).toHaveBeenCalledWith({start:'Hello'});

        act( () => {
            calendar.prop('onView')('week');
            expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');
        } )

    })
    
    
})
