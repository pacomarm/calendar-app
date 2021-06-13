import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import {NavBar} from '../ui/NavBar'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

const localizer = momentLocalizer(moment);
let events = []


export const CalendarScreen = () => {

    const [lastView, setlastView] = useState( localStorage.getItem('lastView') || 'month' );
    const dispatch = useDispatch();
    const {events: eventsStore, activeEvent} = useSelector( state => state.calendar );
    const {uid} = useSelector( state => state.auth );

    useEffect(() => {
        dispatch( eventStartLoading() )
    }, [dispatch])
    

    events = eventsStore;

    const onDoubleClick = (e) => {
        // console.log(e)
        dispatch( uiOpenModal() );
    }

    const onSelectEvent = (e) => {
        dispatch( eventSetActive(e) );
    }

    const onViewChange = (e) => {
        setlastView(e);
        localStorage.setItem('lastView', e)
    }

    const onSelectSlot = (e) => {
        dispatch( eventClearActiveEvent() )
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        
        const style = {
            backgroundColor: uid === event.user._id ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }


        return {
            style
        }
    };

    return (
        <div className="calendar-screen">
            <NavBar/>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot= {onSelectSlot}
                selectable={true}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />
            <CalendarModal/>
            <AddNewFab/>

            { activeEvent && <DeleteEventFab/> }
        </div>
    )
}
