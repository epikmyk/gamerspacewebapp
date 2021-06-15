import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Games from './Games';
import "./AddFavoriteGamesModal.css"

const AddFavoriteGamesModal = props => {

    const [show, setShow] = useState(props.show);

    const handleClose = () => {
        setShow(false);
    }

    return (
        <>
            <Modal dialogClassName="favorite-games-modal" size="lg" show={show} onHide={()=>{handleClose(); props.onClose();}} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add some of your favorite games.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Games onDone={handleClose} onClose={props.onClose}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddFavoriteGamesModal;