import React, { useState } from 'react';
import axios from 'axios';
import mail from './assets/img/mail.svg';
import check from './assets/img/check.svg';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <img width="80" src={check} alt="" />
        <h2>Message Sent!</h2>
      </Modal.Body>
    </Modal>
  );
}

function App() {
  const [message, setMessage] = useState('');
  const [number, setNumber] = useState('');
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalShow, setModalShow] = useState(false);

  const sendMessage = (event) => {
    if (sending) {
      event.preventDefault();
    } else {
      setErrorMessage('');

      setSending(true);

      setTimeout(() => {
        axios
          .post('https://git.heroku.com/react-send-sms.git/send', {
            number: number,
            message: message,
          })
          .then((response) => {
            setSending(false);

            setModalShow(true);
            setTimeout(() => {
              window.location.reload(false);
              setModalShow(false);
            }, 2000);
          })
          .catch((error) => {
            setErrorMessage(error.response.data);
            setSending(false);
            return error;
          });
      }, 2000);
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <div className="img">
          <img width="100" src={mail} alt="" />
        </div>
        <h2>Let me send that message!</h2>
        <div className="input-box">
          <label htmlFor="to">To</label>
          <input
            type="text"
            name="to"
            maxLength="12"
            onChange={(event) => setNumber(event.target.value)}
            placeholder="ex: 639051234567"
          />
        </div>

        <div className="input-box">
          <label htmlFor="message">Message</label>
          <textarea
            rows="6"
            cols="40"
            name="message"
            maxLength="160"
            placeholder="Type you message here..."
            onChange={(event) => setMessage(event.target.value)}
          ></textarea>
          <span>max 160 characters</span>
        </div>
        {errorMessage !== null ? (
          <span className="error-message">{errorMessage}</span>
        ) : null}
        <div className="btn-container">
          <button
            type="submit"
            onClick={(event) =>
              message === '' || number === ''
                ? event.preventDefault()
                : sendMessage(event)
            }
          >
            SEND
            {sending ? <div className="loader4"></div> : null}
          </button>
        </div>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default App;
