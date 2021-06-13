import { fetchConToken } from "../helpers/fetch"
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types"

export const eventStartAddNew = (event) => {
    return  async(dispatch, getState) => {
        const {uid, name} = getState().auth;
        try{
            const res = await fetchConToken( 'events', event, 'POST' );
            const body = await res.json();

            if( body.ok ){
                event.id = body.event.id;
                event.user = { _id: uid, name:  name}
                dispatch( eventAddNew(event) )
            }

        } catch (e){
            console.log(e);
        }
    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
})

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
})

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent })

export const eventUpdated = (event) => ({
    type: types.eventUpdate,
    payload: event
})

export const eventDeleted = () => ({ type: types.eventDeleted })

export const eventStartLoading = () => {
    return async(dispatch) => {
        try{
            const res = await fetchConToken( 'events', 'GET' );
            const body = await res.json();
            console.log(prepareEvents(body.events));
            const events = prepareEvents(body.events);

            dispatch( eventLoaded(events) )

        } catch (e){
            console.log(e);
        }
    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})
