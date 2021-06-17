import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import {FiSearch} from 'react-icons/fi';
import ProfilePics from './ProfilePics'
const UpdateProfilePicModal = props => {

    const [show, setShow] = useState(props.show);
    const [currentSearchTerm, setCurrentSearchTerm] = useState("")
    const [searchTerm, setSearchTerm] = useState("");

    const handleClose = () => {
        setShow(false);
    }

    const search = () => {
        setSearchTerm(currentSearchTerm);
    }

    const handleSearchChange = (e) => {
        setCurrentSearchTerm(e.target.value);
    }

    const checkEnterPressed = (e) => {
        console.log("test");
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            search();
        }
    }

    return (
        <>
            <Modal dialogClassName="profile-pic-modal" size="lg" show={show} onHide={()=>{handleClose(); props.onClose();}} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update profile picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={search}>
                        <Form.Group className="profile-pic-search-form-group">
                            <Form.Control id="profile-pic-search-input" className="profile-pic-game-search-input" type="text" placeholder="Search games" onKeyDown={checkEnterPressed} onChange={handleSearchChange}></Form.Control>
                            <Button className="profile-pic-search-button" onClick={search}><FiSearch size={22}></FiSearch></Button>
                        </Form.Group>
                    </Form>
                    <ProfilePics searchTerm={searchTerm} onDone={handleClose} onClose={props.onClose}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UpdateProfilePicModal;