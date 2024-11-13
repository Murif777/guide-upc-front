import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Image } from 'react-bootstrap';
import { getProfile } from '../../services/UsuarioService';
import classNames from 'classnames';
import '../../assets/styles/EditarPerfil.css';

export default function EditarPerfil() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [foto, setFoto] = useState("");
  const [previewFoto, setPreviewFoto] = useState("");

  useEffect(() => {
    getProfile()
      .then(data => {
        setNombre(data.nombre);
        setApellido(data.apellido);
        setFoto(data.foto);
        setPreviewFoto(data.foto);
      })
      .catch(error => {
        console.error('Error al obtener el perfil del usuario:', error);
      });
  }, []);

  const onChangeHandler = (event) => {
    const { name, value, files } = event.target;
    if (name === 'nombre') setNombre(value);
    if (name === 'apellido') setApellido(value);
    if (name === 'foto' && files.length > 0) {
      const file = files[0];
      setFoto(file);
      setPreviewFoto(URL.createObjectURL(file));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('foto', foto);

    updateUserProfile(formData)
      .then(response => {
        console.log('Perfil actualizado:', response.data);
        navigate('/inicio');
      })
      .catch(error => {
        console.error('Error al actualizar el perfil:', error);
      });
  };

  return (
    <>
      <h2>Editar Perfil</h2>
      {previewFoto && <Image 
                        src={previewFoto} 
                        alt="Foto de perfil"
                        width={150}
                        height={150}
                        className="profile-photo" 
                        roundedCircle/>}
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="form-control"
            value={nombre}
            onChange={onChangeHandler}
          />
          <label className="form-label" htmlFor="nombre">Nombre</label>
        </div>
        <div>
          <input
            type="text"
            id="apellido"
            name="apellido"
            className="form-control"
            value={apellido}
            onChange={onChangeHandler}
          />
          <label className="form-label" htmlFor="apellido">Apellido</label>
        </div>
        <div>
          <input
            type="file"
            id="foto"
            name="foto"
            className="form-control"
            accept="image/*"
            onChange={onChangeHandler}
          />
          <label className="form-label" htmlFor="foto">Seleccionar Foto</label>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-3">Guardar Cambios</button>
      </form>
    </>
  );
}
