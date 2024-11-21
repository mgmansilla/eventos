import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, InputGroup, Form } from 'react-bootstrap';
import { IoCloseSharp } from "react-icons/io5";
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { FaRegTrashCan } from "react-icons/fa6";
import { LuClipboardEdit } from "react-icons/lu";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { IoCheckmarkOutline } from "react-icons/io5";
import Swal from 'sweetalert2';
import { FaCalendarAlt } from 'react-icons/fa';

const Eventos = ({ show, handleClose }) => {
    const [tablaevento, setTablaevento] = useState([]);
    const [apagadescripcion, setApagadescripcion] = useState(true);
    const [banderaevento, setBanderaevento] = useState(0);
    const [eventoSeleccionado, setEventoSeleccionado] = useState(null);  // Estado para evento seleccionado
    const directorio = import.meta.env.VITE_API_URL;

    useEffect(() => {
        // Cargar la lista de eventos cuando el componente se monte
        const data = { tarea: "busca_eventos" };
        axios.post(`${directorio}php/evento.php`, JSON.stringify(data))
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    setTablaevento(response.data);
                } else {
                    setTablaevento([]);
                }
            })
            .catch((error) => console.log('Error al cargar los eventos', error));
    }, [directorio]);

    // Reaccionar ante cambios en el directorio

    const handleClose1 = () => {
        setBanderaevento(0);
        setEventoSeleccionado(null);  // Resetear evento seleccionado
        handleClose();
    };

    const nuevoevento = () => {
        setBanderaevento(0);
        setEventoSeleccionado(null);  // Nuevo evento no tiene datos predefinidos
    };

    const modievento = (evento) => {
        setBanderaevento(1);
        setEventoSeleccionado(evento);  // Pasar el evento seleccionado con el ID correcto
    };
    
    

    // Eliminar evento
    const eliminarEvento = (idEvento) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡Este evento se eliminará permanentemente!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                const data = { tarea: "eliminar_evento", id_evento: idEvento };
                axios.post(`${directorio}php/evento.php`, JSON.stringify(data))
                    .then(() => {
                        // Recargar la tabla después de eliminar el evento
                        setTablaevento(tablaevento.filter(evento => evento.id_evento !== idEvento));
                        Swal.fire('¡Eliminado!', 'El evento ha sido eliminado.', 'success');
                    })
                    .catch((error) => {
                        console.error('Error al eliminar evento:', error);
                        Swal.fire('Error', 'No se pudo eliminar el evento', 'error');
                    });
            }
        });
    };

    const aceptar = () => {
        const evento = {
            nombre: eventoSeleccionado?.nombre || '',
            organiza: eventoSeleccionado?.organiza || '',
            lugar: eventoSeleccionado?.lugar || '',
            fecha: eventoSeleccionado?.fecha || '',
            hora: eventoSeleccionado?.hora || '',
            cupo: eventoSeleccionado?.cupo || '',
            descripcion: eventoSeleccionado?.descripcion || '',
        };
    
        const data = {
            tarea: banderaevento === 0 ? "crear_evento" : "modificar_evento",
            evento,
        };
    
        axios.post(`${directorio}php/evento.php`, JSON.stringify(data))
            .then((response) => {
                // Si es un nuevo evento, lo agregamos a la tabla
                if (banderaevento === 0) {
                    setTablaevento((prevTabla) => [...prevTabla, response.data]);  // Usar el estado anterior correctamente
                } else {
                    // Si es una modificación, reemplazamos el evento modificado en la tabla
                    setTablaevento((prevTabla) =>
                        prevTabla.map((e) =>
                            e.id_evento === eventoSeleccionado.id_evento ? response.data : e
                        )
                    );
                }
    
                handleClose1();  // Cerrar modal solo después de actualizar la tabla
            })
            .catch((error) => {
                console.error('Error al guardar evento:', error);
                Swal.fire('Error', 'Hubo un problema al guardar el evento', 'error');
            });
    };
    
    
    return (
        <Modal show={show} onHide={handleClose1} centered size="lg" backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title><FaCalendarAlt size={20} />&nbsp;Eventos - Listado de Eventos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className='pb-1'>
                    <Col>
                        <Button onClick={nuevoevento} variant="success" size="sm"><AiOutlinePlus size={20} /> Nuevo Evento</Button>
                    </Col>
                </Row>
                <Row className='pb-1'>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Organiza</th>
                                <th>Lugar</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Cupo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tablaevento.length > 0 ? (
                                tablaevento.map((evento) => (
                                    <tr key={evento.id_evento}>
                                        <td>{evento.id_evento}</td>
                                        <td>{evento.nombre}</td>
                                        <td>{evento.organiza}</td>
                                        <td>{evento.lugar}</td>
                                        <td>
                                            {console.log("Fecha recibida:", evento.fecha)}  {/* Verifica qué valor llega */}
                                            {evento.fecha
                                                ? new Date(evento.fecha.split(' ')[0]).toLocaleDateString()  // Solo toma la parte de la fecha (YYYY-MM-DD)
                                                : 'Fecha no disponible'}
                                        </td>

                                        <td>
                                            {evento.hora
                                                ? new Date('1970-01-01T' + evento.hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                : 'Hora no disponible'}
                                        </td>



                                        <td>{evento.cupo}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <FaRegTrashCan
                                                title='Eliminar'
                                                size={16}
                                                onClick={() => eliminarEvento(evento.id_evento)}
                                                style={{ cursor: 'pointer', marginRight: '10px' }}
                                            />
                                            <LuClipboardEdit
                                                title='Modificar'
                                                size={16}
                                                onClick={() => modievento(evento)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: 'center' }}>No hay eventos disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Row>

                <Card>
                    <Card.Body>
                        <Row>
                            <Col md={6}>
                                <FloatingLabel controlId="floatingInput" label="Fecha Evento" className="mb-3">
                                    <Form.Control
                                        type="date"
                                        value={eventoSeleccionado?.fecha || ''}
                                        onChange={(e) => setEventoSeleccionado({ ...eventoSeleccionado, fecha: e.target.value })}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FloatingLabel controlId="floatingInput" label="Nombre" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        value={eventoSeleccionado?.nombre || ''}
                                        onChange={(e) => setEventoSeleccionado({ ...eventoSeleccionado, nombre: e.target.value })}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FloatingLabel controlId="floatingInput" label="Lugar" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        value={eventoSeleccionado?.lugar || ''}
                                        onChange={(e) => setEventoSeleccionado({ ...eventoSeleccionado, lugar: e.target.value })}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={6}>
                                <FloatingLabel controlId="floatingInput" label="Cupo" className="mb-3">
                                    <Form.Control
                                        type="number"
                                        value={eventoSeleccionado?.cupo || ''}
                                        onChange={(e) => setEventoSeleccionado({ ...eventoSeleccionado, cupo: e.target.value })}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <FloatingLabel controlId="floatingInput" label="Descripción" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        value={eventoSeleccionado?.descripcion || ''}
                                        onChange={(e) => setEventoSeleccionado({ ...eventoSeleccionado, descripcion: e.target.value })}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" size='sm' onClick={handleClose1}>
                    <IoCloseSharp size={20} />&nbsp;Cerrar
                </Button>
                <Button variant="primary" size='sm' onClick={aceptar}>
                    <IoCheckmarkOutline size={20} />&nbsp;Aceptar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Eventos;
