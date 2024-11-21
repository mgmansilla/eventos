
import logo from "/Logo_SMT_pos_1.png";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { CardFooter, CardText, InputGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import bcrypt from 'bcryptjs'



function Login() {

    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("")
    const [clave, setClave] = useState("")
    const directorio = import.meta.env.VITE_API_URL


    useEffect(() => {
        localStorage.removeItem('usuario')
    }, [])


    const validarlogin = async () => {
        try {
            const data = {
                tarea: "valida_login",
                usuario: usuario,
            };
            if (!directorio) {
                alert("El directorio no está disponible.");
                return;
            }
            const response = await axios.post(`${directorio}php/login.php`, JSON.stringify(data));
            if (response.data && response.data.length > 0) {

                const hashAlmacenado = response.data[0].clave;
                // Compara la clave en texto plano con el hash almacenado usando await
                const esCorrecto = await bcrypt.compare(clave, hashAlmacenado);
                if (esCorrecto) {
                    localStorage.setItem('usuario', usuario + ' - ' + response.data[0].nombre_persona);
                    navigate("/principal");
                } else {
                    alert('Contraseña incorrecta');
                }
            } else {
                alert("El usuario no tiene login REGISTRADO");
            }
        } catch (error) {
            alert(error);
        }
    };



    return (
        <>
            <div className="container-fluid" style={{ backgroundColor: '#AFAFAF', minHeight: '100vh' }}>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-3 mt-5 pt-3" style={{ height: '80vh' }}>
                        <Card style={{ height: '75vh' }} >
                            <Card.Img variant="top" src={logo} alt="Logo" style={{
                                maxWidth: '60%',
                                height: 'auto',
                                maxHeight: '200px',
                                objectFit: 'contain',
                                paddingTop: '20px',
                                margin: '0 auto'
                            }} />
                            <Card.Body className="pt-5">
                                <Form>
                                    <Form.Group className="mb-3 mt-5">
                                        <Form.Label>Usuario</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FaUser />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                value={usuario}
                                                onChange={(e) => {
                                                    // Solo permite números
                                                    const valor = e.target.value;
                                                    if (/^\d*$/.test(valor)) {
                                                        setUsuario(valor);
                                                    }
                                                }}
                                                
                                                placeholder="Ingrese su usuario"
                                                maxLength={5}
                                               
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className="mb-5">
                                        <Form.Label>Contraseña</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FaLock />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="password"
                                                value={clave}
                                                onChange={(e) => setClave(e.target.value)}
                                                placeholder="Ingrese su contraseña"
                                                maxLength={15}
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Button variant="primary" type="button" onClick={validarlogin} className="w-100">
                                        Aceptar
                                    </Button>
                                </Form>
                            </Card.Body>
                            <CardText className="text-center" style={{ fontSize: '0.7em' }} >Ditec - Direccion de Innovacion Tecnologica - 2024</CardText>
                        </Card>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Login;
