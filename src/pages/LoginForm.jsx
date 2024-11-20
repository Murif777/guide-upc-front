import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitLogin, SubmitRegister } from '../services/UsuarioService';
import classNames from 'classnames';
import '../assets/styles/LoginForm.css'; 
import logo from '../assets/images/logotipo.png'

export default function LoginForm() {
    const [active, setActive] = useState("login");
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [login, setLogin] = useState("");
    const [contraseña, setContraseña] = useState("");
    const navigate = useNavigate();
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        if (name === 'id') setId(value);
        if (name === 'nombre') setNombre(value);
        if (name === 'apellido') setApellido(value);
        if (name === 'login') setLogin(value);
        if (name === 'contraseña') setContraseña(value);
    };

    const onSubmitLogin = (e) => {
        e.preventDefault();
        SubmitLogin(login,contraseña,navigate);
    };
    const onSubmitRegister = (e) => {
        e.preventDefault();
        SubmitRegister(id,nombre,apellido,login,contraseña,navigate);
    };

    return (
        <div className="login-page">
            <div className="fullscreen">
                <div className="login-container">
                <img
                    src={logo}
                    alt="guide-upc logo"
                    style={{ 
                    height:'100%',
                    width:'100%'
                    }}
                />
                    <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className={classNames("nav-link", active === "login" ? "active" : "")} id="tab-login"
                                onClick={() => setActive("login")}>Login</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className={classNames("nav-link", active === "register" ? "active" : "")} id="tab-register"
                                onClick={() => setActive("register")}>Registrarse</button>
                        </li>
                    </ul>

                    <div className="tab-content">
                        <div className={classNames("tab-pane", "fade", active === "login" ? "show active" : "")} id="pills-login">
                            <form onSubmit={onSubmitLogin}>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="loginName">Correo electrónico</label>
                                    <input type="text" id="loginName" name="login" className="form-control" onChange={onChangeHandler} />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="loginPassword">Contraseña</label>
                                    <input type="password" id="loginPassword" name="contraseña" className="form-control" onChange={onChangeHandler} />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mb-4">Iniciar sesión</button>
                            </form>
                        </div>
                        <div className={classNames("tab-pane", "fade", active === "register" ? "show active" : "")} id="pills-register">
                            <form onSubmit={onSubmitRegister}>
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="id">N.Identificacion</label>
                                    <input type="text" id="id" name="id" className="form-control" onChange={onChangeHandler} />
                                </div>
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="nombre">Nombre</label>
                                    <input type="text" id="nombre" name="nombre" className="form-control" onChange={onChangeHandler} />
                                </div>
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="apellido">Apellido</label>
                                    <input type="text" id="apellido" name="apellido" className="form-control" onChange={onChangeHandler} />
                                </div>
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="login">Correo electrónico</label>
                                    <input type="text" id="login" name="login" className="form-control" onChange={onChangeHandler} />
                                </div>
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="registerPassword">Contraseña</label>
                                    <input type="password" id="registerPassword" name="contraseña" className="form-control" onChange={onChangeHandler} />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mb-3">Registrarse</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
