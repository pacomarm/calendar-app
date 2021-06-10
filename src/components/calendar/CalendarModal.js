import React, { useState } from 'react'
import Modal from 'react-modal';
import moment from 'moment'
import DateTimePicker from 'react-datetime-picker';

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
    const [dateEnd, setDateEnd] = useState(future.toDate())

    const closeModal = () => {
        // setIsOpen(false);
    }
    
    const handleStartDateChange = (e) => {
        setDateStart(e);
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
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
            <form className="container">
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
                        className="form-control"
                        placeholder="Event's title"
                        name="title"
                        autoComplete="off"
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
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Additional info</small>
                </div>
                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Save</span>
                </button>
            </form>
        </Modal>
    )
}
