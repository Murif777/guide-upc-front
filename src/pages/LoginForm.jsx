import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitLogin, SubmitRegister } from '../services/UsuarioService';
import classNames from 'classnames';
import '../assets/styles/LoginForm.css'; 

export default function LoginForm() {
    const [active, setActive] = useState("login");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [login, setLogin] = useState("");
    const [contraseña, setContraseña] = useState("");
    const navigate = useNavigate();
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
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
        SubmitRegister(nombre,apellido,login,contraseña,navigate);
    };

    return (
        <div className="login-page">
            <div className="fullscreen">
                <div className="login-container">
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
                                    <input type="text" id="loginName" name="login" className="form-control" onChange={onChangeHandler} />
                                    <label className="form-label" htmlFor="loginName">Usuario/Correo electrónico</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="password" id="loginPassword" name="contraseña" className="form-control" onChange={onChangeHandler} />
                                    <label className="form-label" htmlFor="loginPassword">Contraseña</label>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mb-4">Iniciar sesión</button>
                            </form>
                        </div>
                        <div className={classNames("tab-pane", "fade", active === "register" ? "show active" : "")} id="pills-register">
                            <form onSubmit={onSubmitRegister}>
                                <div className="form-outline mb-4">
                                    <input type="text" id="nombre" name="nombre" className="form-control" onChange={onChangeHandler} />
                                    <label className="form-label" htmlFor="nombre">Nombre</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="text" id="apellido" name="apellido" className="form-control" onChange={onChangeHandler} />
                                    <label className="form-label" htmlFor="apellido">Apellido</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="text" id="login" name="login" className="form-control" onChange={onChangeHandler} />
                                    <label className="form-label" htmlFor="login">Usuario/Correo electrónico</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="password" id="registerPassword" name="contraseña" className="form-control" onChange={onChangeHandler} />
                                    <label className="form-label" htmlFor="registerPassword">Contraseña</label>
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
