import { types } from "../types/types"
import moment from 'moment'

const initialState = {
    events: [{
        title: 'My bd',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '#fafafa',
        user: {
            _id: '123',
            name: 'Paco'
        }
    }],
    activeEvent: null
}

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            };
        
        case types.eventAddNew:
        return {
            ...state,
            events: [...state.events, action.payload]
        };
    
        default:
            return state;
    }
}