import React from 'react';
import { Container, Row, Col, Card, Button, InputGroup, Form } from 'react-bootstrap';
import { IoCloseSharp } from "react-icons/io5";
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from "react";
import axios from "axios";
import { FaComputer, FaPeopleArrows } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuClipboardEdit } from "react-icons/lu";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { IoCheckmarkOutline } from "react-icons/io5";
import Swal from 'sweetalert2';



const Asistentes = ({ show, handleClose }) => {
    const directorio = import.meta.env.VITE_API_URL
        
    
        const handleClose1 = () => {
           
            handleClose()
        }
   
    return (
        <Modal show={show} onHide={handleClose1} centered size="lg" backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title><FaPeopleArrows size={30} />&nbsp;Asistentes - Listado de Asistentes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className='pb-1'>
                    <Col>
                        <Button variant="success" size="sm" ><AiOutlinePlus size={20} /></Button>
                    </Col>
                </Row>
                <Row className='pb-1'>
                    <div className="table-container-cabecera">
                        <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '15px' }}>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ fontSize: 'smaller' }}>#</th>
                                        <th style={{ fontSize: 'smaller' }}>Nombre</th>
                                        <th style={{ fontSize: 'smaller' }}>Rol</th>
                                        <th style={{ fontSize: 'smaller' }}>Entidad</th>
                                        <th style={{ fontSize: 'smaller' }}>Asistencia</th>
                                        <th style={{ fontSize: 'smaller', textAlign: 'center' }}>Accion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {}
                                </tbody>
                            </Table>
                        </div>
                        <Card>
                            <Card.Header>{/*  */}
                        </Card.Header>
                            <Card.Body>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Descripcion"
                                    className="mb-3"
                                >
                                    <Form.Control type="text" maxLength={100} placeholder="Asistentes"
                                        style={{ textTransform: 'uppercase' }} />
                                </FloatingLabel>
                            </Card.Body>
                        </Card>
                    </div>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" size='sm' onClick={handleClose1}>
                    <IoCloseSharp size={20} />&nbsp;Cerrar
                </Button>
                <Button variant="primary" size='sm' >
                    <IoCheckmarkOutline size={20} />&nbsp;Aceptar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Asistentes;
