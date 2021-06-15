import React, { useState, useEffect } from 'react';
import { Form, Button, FormControl, Modal } from 'react-bootstrap';
import Games from './Games';
import "./AddFavoriteGamesModal.css"
import {FiSearch} from 'react-icons/fi';

const AddFavoriteGamesModal = props => {

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
            <Modal dialogClassName="favorite-games-modal" size="lg" show={show} onHide={()=>{handleClose(); props.onClose();}} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add some of your favorite games.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={search}>
                        <Form.Group className="game-search-form-group">
                            <Form.Control id="game-search-input" className="game-search-input" type="text" placeholder="Search games" onKeyDown={checkEnterPressed} onChange={handleSearchChange}></Form.Control>
                            <Button className="game-search-button" onClick={search}><FiSearch size={22}></FiSearch></Button>
                        </Form.Group>
                    </Form>
                    <Games searchTerm={searchTerm} onDone={handleClose} onClose={props.onClose}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddFavoriteGamesModal;