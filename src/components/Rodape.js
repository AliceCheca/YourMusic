import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { MdAudiotrack } from 'react-icons/md'

const Rodape = () => {
    return(
        <div>
            <br></br>
            <br></br>
    <Navbar bg="secondary" fixed="bottom">
        <Navbar.Brand className="text-light">
            <MdAudiotrack/> YourMusic &copy; - Todos os direitos reservados!
        </Navbar.Brand>
    </Navbar>
    </div>
    )
}
export default Rodape