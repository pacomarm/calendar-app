import React, { useState } from 'react'
import Modal from 'react-modal';
import moment from 'moment'
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const future = now.clone().add(1, 'hours');

export const CalendarModal = () => {

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(future.toDate());
    const [titleValid, setTitleValid] = useState(true)

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: now.toDate(),
        end: future.toDate()
    });

    const { notes, title, start, end } = formValues;

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const closeModal = () => {
        // setIsOpen(false);
    }
    
    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        
        const mStart = moment(start)
        const mEnd   = moment(end)

        if(mStart.isSameOrAfter(mEnd)){
            return Swal.fire('Error!', 'End date should be later than begin date!', 'error');
        }
        if( title.trim().length < 2 ){
            return setTitleValid(false);
        }

        setTitleValid(true);
        closeModal()

    }

    return (
        <Modal
            isOpen={true}
            onRequestClose={closeModal}
            style={customStyles}
            className="modal"
            closeTimeoutMS={200}
            overlayClassName="modal-fondo"
        >
            <h1> New Event </h1>
            <hr />
            <form 
                className="container"
                // onSubmit={ handleSubmitForm }
            >
                <div className="form-group">
                    <label>Beginning Date and Time</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>End Date and Time</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        minDate={dateStart}
                        className="form-control"
                    />
                </div>
                <hr />
                <div className="form-group">
                    <label>Title y notes</label>
                    <input 
                        type="text" 
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Event's title"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Short desc</small>
                </div>
                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Additional info</small>
                </div>
                <button
                    type="button"
                    className="btn btn-outline-primary btn-block"
                    onClick={handleSubmitForm}
                >
                    <i className="far fa-save"></i>
                    <span> Save</span>
                </button>
            </form>
        </Modal>
    )
}