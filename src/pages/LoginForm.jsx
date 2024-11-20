import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitLogin, SubmitRegister } from '../services/UsuarioService';
import classNames from 'classnames';
import '../assets/styles/LoginForm.css'; 
import logo from '../assets/images/logotipo.png'

export default function LoginForm() {
    const [active, setActive] = useState("login");
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        apellido: '',
        login: '',
        contraseña: '',
        confirmarContraseña: ''
    });
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validateForm = (type) => {
        const newErrors = {};

        if (type === 'register') {
            // ID validation (only numbers)
            if (!/^\d+$/.test(formData.id)) {
                newErrors.id = 'El ID debe contener solo números';
            }

            // Name validation (only letters)
            if (!/^[A-Za-zÁ-ÿ\s]+$/.test(formData.nombre)) {
                newErrors.nombre = 'El nombre debe contener solo letras';
            }

            // Lastname validation (only letters)
            if (!/^[A-Za-zÁ-ÿ\s]+$/.test(formData.apellido)) {
                newErrors.apellido = 'El apellido debe contener solo letras';
            }

            // Confirm password validation
            if (formData.contraseña !== formData.confirmarContraseña) {
                newErrors.confirmarContraseña = 'Las contraseñas no coinciden';
            }
        }

        // Email validation
        if (!validateEmail(formData.login)) {
            newErrors.login = 'Ingrese un correo electrónico válido';
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear specific error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        
        // Clear login error
        if (loginError) {
            setLoginError('');
        }
    };

    const onSubmitLogin = async (e) => {
        e.preventDefault();
        if (validateForm('login')) {
            try {
                await SubmitLogin(
                    formData.login, 
                    formData.contraseña, 
                    navigate,
                    (errorMessage) => setLoginError(errorMessage)
                );
            } catch (error) {
                setLoginError('Error al iniciar sesión');
            }
        }
    };

    const onSubmitRegister = (e) => {
        e.preventDefault();
        if (validateForm('register')) {
            SubmitRegister(
                formData.id, 
                formData.nombre, 
                formData.apellido, 
                formData.login, 
                formData.contraseña, 
                navigate
            );
        }
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
                            <button 
                                className={classNames("nav-link", active === "login" ? "active" : "")} 
                                id="tab-login"
                                onClick={() => setActive("login")}
                            >
                                Login
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button 
                                className={classNames("nav-link", active === "register" ? "active" : "")} 
                                id="tab-register"
                                onClick={() => setActive("register")}
                            >
                                Registrarse
                            </button>
                        </li>
                    </ul>

                    <div className="tab-content">
                        {/* Login Form */}
                        <div 
                            className={classNames("tab-pane", "fade", active === "login" ? "show active" : "")} 
                            id="pills-login"
                        >
                            {loginError && (
                                <div className="alert alert-danger mb-3">
                                    {loginError}
                                </div>
                            )}
                            <form onSubmit={onSubmitLogin}>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="loginName">Correo electrónico</label>
                                    <input 
                                        type="text" 
                                        id="loginName" 
                                        name="login" 
                                        className={`form-control ${errors.login ? 'is-invalid' : ''}`}
                                        onChange={onChangeHandler} 
                                    />
                                    {errors.login && (
                                        <div className="invalid-feedback">
                                            {errors.login}
                                        </div>
                                    )}
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="loginPassword">Contraseña</label>
                                    <input 
                                        type="password" 
                                        id="loginPassword" 
                                        name="contraseña" 
                                        className={`form-control ${errors.contraseña ? 'is-invalid' : ''}`}
                                        onChange={onChangeHandler} 
                                    />
                                    {errors.contraseña && (
                                        <div className="invalid-feedback">
                                            {errors.contraseña}
                                        </div>
                                    )}
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mb-4">
                                    Iniciar sesión
                                </button>
                            </form>
                        </div>

                        {/* Register Form */}
                        <div 
                            className={classNames("tab-pane", "fade", active === "register" ? "show active" : "")} 
                            id="pills-register"
                        >
                            <form onSubmit={onSubmitRegister}>
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="id">N.Identificacion</label>
                                    <input 
                                        type="text" 
                                        id="id" 
                                        name="id" 
                                        className={`form-control ${errors.id ? 'is-invalid' : ''}`}
                                        onChange={onChangeHandler} 
                                    />
                                    {errors.id && (
                                        <div className="invalid-feedback">
                                            {errors.id}
                                        </div>
                                    )}
                                </div>
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="nombre">Nombre</label>
                                    <input 
                                        type="text" 
                                        id="nombre" 
                                        name="nombre" 
                                        className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                                        onChange={onChangeHandler} 
                                    />
                                    {errors.nombre && (
                                        <div className="invalid-feedback">
                                            {errors.nombre}
                                        </div>
                                    )}
                                </div>
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="apellido">Apellido</label>
                                    <input 
                                        type="text" 
                                        id="apellido" 
                                        name="apellido" 
                                        className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
                                        onChange={onChangeHandler} 
                                    />
                                    {errors.apellido && (
                                        <div className="invalid-feedback">
                                            {errors.apellido}
                                        </div>
                                    )}
                                </div>
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="login">Correo electrónico</label>
                                    <input 
                                        type="text" 
                                        id="login" 
                                        name="login" 
                                        className={`form-control ${errors.login ? 'is-invalid' : ''}`}
                                        onChange={onChangeHandler} 
                                    />
                                    {errors.login && (
                                        <div className="invalid-feedback">
                                            {errors.login}
                                        </div>
                                    )}
                                </div>
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="registerPassword">Contraseña</label>
                                    <input 
                                        type="password" 
                                        id="registerPassword" 
                                        name="contraseña" 
                                        className={`form-control ${errors.contraseña ? 'is-invalid' : ''}`}
                                        onChange={onChangeHandler} 
                                    />
                                    {errors.contraseña && (
                                        <div className="invalid-feedback">
                                            {errors.contraseña}
                                        </div>
                                    )}
                                </div>
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="confirmPassword">Confirmar Contraseña</label>
                                    <input 
                                        type="password" 
                                        id="confirmPassword" 
                                        name="confirmarContraseña" 
                                        className={`form-control ${errors.confirmarContraseña ? 'is-invalid' : ''}`}
                                        onChange={onChangeHandler} 
                                    />
                                    {errors.confirmarContraseña && (
                                        <div className="invalid-feedback">
                                            {errors.confirmarContraseña}
                                        </div>
                                    )}
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mb-3">
                                    Registrarse
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}