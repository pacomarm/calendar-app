import Swal from "sweetalert2";
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

export const eventStartUpdate = (event) => {
    return async(dispatch) => {
        try{
            const res = await fetchConToken( `events/${event.id}`, event, 'PUT' );
            const body = await res.json();

            if(body.ok){
                dispatch( eventUpdated(event) )
            } else {
                Swal.fire('Error!', body.msg || 'Could not update event :(', 'error')
            }

        } catch (error){
            console.log(error);
        }
    }
}

const eventUpdated = (event) => ({
    type: types.eventUpdate,
    payload: event
})

export const eventStartDelete = () => {
    
    return async(dispatch, getState) => {

        const {id} = getState().calendar.activeEvent;
        try{
            const res = await fetchConToken( `events/${id}`, {}, 'DELETE' );
            const body = await res.json();

            if(body.ok){
                dispatch( eventDeleted() )
            } else {
                Swal.fire('Error!', body.msg || 'Could not delete the event :(', 'error')
            }

        } catch (e){
            console.log(e);
        }
    }
}

const eventDeleted = () => ({ type: types.eventDeleted })

export const eventStartLoading = () => {
    return async(dispatch) => {
        try{
            const res = await fetchConToken( 'events', 'GET' );
            const body = await res.json();
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

export const eventLogout = () => ({type: types.eventLogout})
