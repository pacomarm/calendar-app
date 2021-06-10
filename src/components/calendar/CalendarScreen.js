import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import {NavBar} from '../ui/NavBar'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';

const localizer = momentLocalizer(moment);
let events = []


export const CalendarScreen = () => {

    const [lastView, setlastView] = useState( localStorage.getItem('lastView') || 'month' );
    const dispatch = useDispatch();
    const {events: eventsStore} = useSelector( state => state.calendar );

    events = eventsStore;

    const onDoubleClick = (e) => {
        // console.log(e)
        dispatch( uiOpenModal() );
    }

    const onSelectEvent = (e) => {
        dispatch( eventSetActive(e) );
        dispatch( uiOpenModal() );
    }

    const onViewChange = (e) => {
        setlastView(e);
        localStorage.setItem('lastView', e)
    }



    return (
        <div>
            <NavBar/>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100vh' }}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
            />
            <CalendarModal/>
            <AddNewFab/>
        </div>
    )
}
