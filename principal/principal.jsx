import { useNavigate } from "react-router-dom";
import logo from '/Logo_SMT_neg_1.png';
import { useEffect, useState } from "react";
import { Container, Row, Col, Dropdown, ButtonGroup } from "react-bootstrap";
import { FaRegCircleUser, FaRegCalendarCheck, FaPeopleArrows } from "react-icons/fa6"; 
import { IoIosOptions } from "react-icons/io";
import { GiExitDoor } from "react-icons/gi";
import Eventos from '../evento/evento';
import Asistentes from '../asistente/asistente';
import './Principal.css';

function Principal() {
    const [showModal_eventos, setShowModal_eventos] = useState(false);
    const handleOpen_eventos = () => setShowModal_eventos(true);
    const handleClose_eventos = () => setShowModal_eventos(false);
    const [showModal_asistentes, setShowModal_asistentes] = useState(false);
    const handleOpen_asistentes = () => setShowModal_asistentes(true);
    const handleClose_asistentes = () => setShowModal_asistentes(false);
    const navega = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('usuario')) {
            navega('/login');
        }
    }, [navega]);

    const cerrarsesion = () => {
        navega('/login');
    };

    return (
        <Container fluid className="main-container">
            {/* Encabezado */}
            <Row className="fondo navCont">
                <Col md={2} className="d-flex align-items-center">
                    <img src={logo} alt="Logo" className="logo" />
                </Col>
                <Col md={10} className="text-center">
                    <h1 className="fw-bold text-white eventoNav">Eventos</h1>
                </Col>
            </Row>
            
            {/* Barra de usuario */}
            <Row className="user-bar">
                <Col md={2} className="d-flex align-items-center">
                    <FaRegCircleUser className="fs-4 me-2" style={{ color: '#0056b3' }} />
                    <span className="fw-bold text-dark">{localStorage.getItem('usuario')}</span>
                </Col>
                <Col md={2} className="d-flex offset-mod-8 justify-content-end">
                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" className="w-100">
                            <IoIosOptions size={20} style={{ color: '#0056b3' }} />&nbsp;Opciones
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleOpen_eventos}>
                                <FaRegCalendarCheck size={20} style={{ color: '#0056b3' }} /> &nbsp;Eventos
                            </Dropdown.Item>
                            <Dropdown.Item onClick={handleOpen_asistentes}>
                                <FaPeopleArrows size={20} style={{ color: '#0056b3' }} /> &nbsp;Asistentes
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <FaRegCircleUser size={20} style={{ color: '#0056b3' }} /> &nbsp;Usuarios
                            </Dropdown.Item>
                            <Dropdown.Item onClick={cerrarsesion}>
                                <GiExitDoor size={20} style={{ color: '#0056b3' }} /> &nbsp;Cerrar Sesión
                            </Dropdown.Item>
                            <Dropdown.Item divider />
                            <Dropdown.Item disabled style={{ textAlign: 'center', display: 'block', width: '100%', lineHeight: '235px', height: '135px',fontSize: '0.8rem' }}>
                                Desarrollado por DITEC - Sitec © 2024
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

            {/* Incluye modales */}
            <Eventos show={showModal_eventos} handleClose={handleClose_eventos} />
            <Asistentes show={showModal_asistentes} handleClose={handleClose_asistentes} />
        </Container>
    );
}

export default Principal;
