import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { MdQueueMusic, MdPlayCircleOutline, MdDescription, MdStore, MdHome, MdMail, MdSaveAlt, MdAudiotrack, MdAccountCircle  } from 'react-icons/md'


const Cabecalho = () => {
    return(
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand><MdAudiotrack/>YourMusic</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="#/"><MdHome/> Início</Nav.Link>
            <Nav.Link href="#/musicas"><MdQueueMusic/> Músicas</Nav.Link>
        </Nav>
    </Navbar>
    )
}

export default Cabecalho