import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request, setAuthHeader } from '../helpers/axios_helper';
import classNames from 'classnames';

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
      request(
          "POST",
          "/login",
          { login, contraseña }
      ).then(
          (response) => {
              console.log(response.data);
              if (response.data && response.data.token) {
                  setAuthHeader(response.data.token); // Almacenar el token en el almacenamiento local
                  navigate('/inicio');
              } else {
                  console.error("Token no presente en la respuesta");
              }
          }).catch(
          (error) => {
              setAuthHeader(null);
              console.error(error);
          }
      );
  };
  

    const onSubmitRegister = (e) => {
        e.preventDefault();
        const formData = {
            nombre,
            apellido,
            login,
            contraseña,
            foto: null // Pasar null por defecto para la foto
        };

        request(
            "POST",
            "/register",
            formData
        ).then(
            (response) => {
                console.log(response.data);
                console.log(formData);
                setAuthHeader(response.data.token);
                navigate('/inicio'); // Redirigir a /inicio
            }).catch(
            (error) => {
                console.error("Error en la solicitud:", error);
                if (error.response && error.response.data) {
                    console.error(error.response.data);
                }
                setAuthHeader(null);
            }
        );
    };

    return (
        <div className="row justify-content-center">
            <div className="col-4">
                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className={classNames("nav-link", active === "login" ? "active" : "")} id="tab-login"
                            onClick={() => setActive("login")}>Login</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className={classNames("nav-link", active === "register" ? "active" : "")} id="tab-register"
                            onClick={() => setActive("register")}>Register</button>
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
    );
}
