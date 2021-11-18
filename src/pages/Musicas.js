import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Toast from 'react-bootstrap/Toast';
import Modal from 'react-bootstrap/Modal';

import Cabecalho from '../components/Cabecalho'
import Rodape from '../components/Rodape'
import { MdQueueMusic, MdSubject, MdModeEdit, MdDelete, MdSave } from 'react-icons/md'
import { BACKEND } from '../constants'

const Musicas = () => {
    const valorInicial = { nome: '', banda: '', album: '', genero: '', lancamento: '' }
    const [musica, setMusica] = useState(valorInicial)
    const [musicas, setMusicas] = useState([])
    const [carregandoMusicas, setCarregandoMusicas] = useState(false)
    const [erros, setErros] = useState({})
    const [aviso, setAviso] = useState('')
    const [salvandoMusicas, setSalvandoMusicas] = useState(false)
    const [confirmaExclusao, setConfirmaExclusao] = useState(false)

    const { nome, banda, album, genero, lancamento } = musica

    async function obterMusicas() {
        setCarregandoMusicas(true)
        let url = `${BACKEND}/musicas`
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                setMusicas(data)
            })
            .catch(function (error) {
                console.error('Erro ao obter as músicas: ' + error.message)
            })
        setCarregandoMusicas(false)
    }

    useEffect(() => {
        obterMusicas()
        document.title = 'Cadastro das Músicas'
    }, [])

    const validaErrosMusicas = () => {
        const novosErros = {}
        if (!nome || nome === '') novosErros.nome = 'O nome não pode ser vazio!'
        else if (nome.length < 2) novosErros.nome = 'O nome deve conter, no mínimo, duas letras.'
        else if (banda.length < 2) novosErros.banda = 'A banda deve conter, no mínimo, duas letras.'
        else if (album.length < 2) novosErros.album = 'O álbum deve conter, no mínimo, duas letras.'
        else if (genero.length < 2) novosErros.genero = 'O gênero deve conter, no mínimo, duas letras.'
        else if (lancamento.length < 8) novosErros.lancamento = 'Informe uma data válida.'
        return novosErros
    }

    async function salvarMusica(event) {
        event.preventDefault()
        const novosErros = validaErrosMusicas()
        if (Object.keys(novosErros).length > 0) {
            setErros(novosErros)
        } else {
            setSalvandoMusicas(true)
            const metodo = musica.hasOwnProperty('_id') ? 'PUT' : 'POST'
            let url = `${BACKEND}/musicas`
            await fetch(url, {
                method: metodo,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(musica)
            }).then(response => response.json())
                .then(data => {
                    (data._id || data.message) ? setAviso('Música salva com sucesso') : setAviso('')
                    setMusica(valorInicial)
                    obterMusicas()
                }).catch(function (error) {
                    console.error(`Erro ao salvar a música ${error.message}`)
                })
            setSalvandoMusicas(false)
        }
    }

    async function excluirMusica() {
        let url = `${BACKEND}/musicas/${musica._id}`
        await fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                data.message ? setAviso(data.message) : setAviso('')
                obterMusicas()
            })
            .catch(function (error) {
                console.error(`Erro ao excluir a música: ${error.message}`)
            })
    }

    const alteraDadosMusica = e => {
        setMusica({ ...musica, [e.target.name]: e.target.value })
        setErros({})
    }

    return (
        <Container fluid className="p-0">
            <Cabecalho />
            <Row>
                <Col xs={12} lg={6}>
                    <h4><MdQueueMusic /> Cadastro das Músicas</h4>
                    <Form method="post">

                        <Form.Group controlId="nome">
                            <Form.Label>Música</Form.Label>
                            <Form.Control
                                name="nome"
                                placeholder="Ex: DiE4u"
                                value={nome}
                                onChange={alteraDadosMusica}
                                isInvalid={!!erros.nome}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {erros.nome}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="Banda">
                            <Form.Label>Banda</Form.Label>
                            <Form.Control
                                name="banda"
                                placeholder="Ex: Bring Me The Horizon"
                                value={banda}
                                onChange={alteraDadosMusica}
                                isInvalid={!!erros.banda}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {erros.banda}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="album">
                            <Form.Label>Álbum</Form.Label>
                            <Form.Control
                                name="album"
                                placeholder="Ex: That's The Spirit"
                                value={album}
                                onChange={alteraDadosMusica}
                                isInvalid={!!erros.album}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {erros.album}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="genero">
                            <Form.Label>Gênero</Form.Label>
                            <Form.Control
                                name="genero"
                                placeholder="Ex: Rock"
                                value={genero}
                                onChange={alteraDadosMusica}
                                isInvalid={!!erros.genero}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {erros.genero}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="lancamento">
                            <Form.Label>Lançamento</Form.Label>
                            <Form.Control
                                name="lancamento"
                                type="date"
                                value={lancamento}
                                onChange={alteraDadosMusica}
                                isInvalid={!!erros.lancamento}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {erros.lancamento}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit"
                            onClick={(e) => salvarMusica(e)}
                            title="Salvar o registro">
                            {salvandoMusicas
                                ? <><Spinner animation="border" size="sm" /> Aguarde... </>
                                : <><MdSave />Salvar</>
                            }
                        </Button>

                    </Form>
                </Col>
                <Col xs={12} lg={6}>
                    <h4><MdSubject /> Listagem das Músicas</h4>
                    {carregandoMusicas &&
                        <>
                            <Spinner animation="border" variant="primary" />
                            <p>Carregando...</p>
                        </>
                    }
                    <Table striped bordered>
                        <thead>
                            <tr className="bg-danger text-dark">
                                <th>Nome</th>
                                <th>Banda</th>
                                <th>Album</th>
                                <th>Gênero</th>
                                <th>Lançamento</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {musicas.map(item => (
                                <tr key={item._id}>
                                    <td>{item.nome}</td>
                                    <td>{item.banda}</td>
                                    <td>{item.album}</td>
                                    <td>{item.genero}</td>
                                    <td>{new Date(item.lancamento).toLocaleDateString()}</td>
                                    <td>
                                        <Button variant="outline-secondary" title="Editar a música"
                                            onClick={() => setMusica(item)}
                                        >
                                            <MdModeEdit />
                                        </Button>
                                        &nbsp;
                                        <Button variant="outline-danger" title="Apagar a música"
                                            onClick={() => {
                                                setConfirmaExclusao(true)
                                                setMusica(item)
                                            }}
                                        >
                                            <MdDelete />
                                        </Button>
                                    </td>

                                </tr>
                            ))}
                            <tr className="bg-danger text-dark">
                                <td colSpan="5">Quantidade de Músicas:</td>
                                <td>{musicas.length}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Toast
                onClose={() => setAviso('')}
                show={aviso.length > 0}
                animation={false}
                delay={4000}
                autohide
                className="bg-success"
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 10
                }}>
                <Toast.Header closeButton={false}>Aviso</Toast.Header>
                <Toast.Body>{aviso}</Toast.Body>
            </Toast>
            <Modal animation={false} show={confirmaExclusao}
                onHide={() => setConfirmaExclusao(false)}>
                <Modal.Header>
                    <Modal.Title>Confirmação da Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Confirma a exclusão da música?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setConfirmaExclusao(!confirmaExclusao)}>
                        ❌Cancelar
                    </Button>
                    <Button variant="success"
                        onClick={() => {
                            excluirMusica()
                            setConfirmaExclusao(!confirmaExclusao)
                        }}>
                        ✅Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Rodape />
        </Container>
    )
}



export default Musicas