import React, { useState, useEffect } from 'react';
import { ModalFooter } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {

    return (
        <div className="footer">
            <div className="footer-content-container">
                <div className="rawg-back-link">
                    <a href="https://rawg.io/apidocs">Rawg API</a> . Privacy . Terms
                </div>
                <div className="gamerspace-copyright">
                    Gamerspace © 2020
                </div>
            </div>
        </div>
    )
}

export default Footer;