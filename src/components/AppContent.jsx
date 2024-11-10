import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { request, setAuthHeader, getAuthToken } from '../helpers/axios_helper';

import LoginForm from './LoginForm';
import Inicio from './Inicio'; // Asegúrate de importar el componente Inicio

class AppContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false
        };
    }

    componentDidMount() {
        const token = getAuthToken();
        if (token) {
            this.setState({ isAuthenticated: true });
            console.log("autenticado "+token);
        }else{
            console.log("no autenticado "+ token);

        }
    }

    login = () => {
        this.setState({ componentToShow: "login" });
    };

    logout = () => {
        this.setState({ isAuthenticated: false });
        setAuthHeader(null);
    };

    onLogin = (e, username, contraseña) => {
        //e.preventDefault();
        request(
            "POST",
            "/login",
            {
                login: username,
                contraseña: contraseña
            }).then(
            (response) => {
                setAuthHeader(response.data.token);
                this.setState({ isAuthenticated: true });
                // Redirigir a /inicio después de login exitoso
                window.location.href = '/inicio'; // Usar window.location.href para redirigir de manera simple
            }).catch(
            (error) => {
                setAuthHeader(null);
                console.log(error);
            }
        );
    };

    onRegister = (event, nombre, apellido, username, contraseña) => {
       // event.preventDefault();
        request(
            "POST",
            "/register",
            {
                nombre: nombre,
                apellido: apellido,
                login: username,
                contraseña: contraseña
            }).then(
            (response) => {
                setAuthHeader(response.data.token);
                this.setState({ isAuthenticated: true });
            }).catch(
            (error) => {
                setAuthHeader(null);
            }
        );
    };

    render() {
        return (
            <Routes>
                <Route 
                    path="/login" 
                    element={!this.state.isAuthenticated ? <LoginForm onLogin={this.onLogin} onRegister={this.onRegister} /> : <Navigate to="/inicio" />} 
                />
                <Route 
                    path="/inicio" 
                    element={this.state.isAuthenticated ? <Inicio /> : <Navigate to="/login" />} 
                />
                <Route 
                    path="/" 
                    element={<Navigate to={this.state.isAuthenticated ? "/inicio" : "/login"} />} 
                />
            </Routes>
        );
    }
}

export default AppContent;
