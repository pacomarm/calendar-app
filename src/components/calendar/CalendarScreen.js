import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import {NavBar} from '../ui/NavBar'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

const localizer = momentLocalizer(moment);
const events = [{
    title: 'My bd',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    user: {
        _id: '123',
        name: 'Paco'
    }
}]


export const CalendarScreen = () => {

    const [lastView, setlastView] = useState( localStorage.getItem('lastView') || 'month' );
    const dispatch = useDispatch();

    const onDoubleClick = (e) => {
        // console.log(e)
        dispatch( uiOpenModal() );
    }

    const onSelectEvent = (e) => {
        // console.log(e)
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
        </div>
    )
}
