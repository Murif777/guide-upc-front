import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { getProfile, updateUserProfile } from '../../services/UsuarioService';
import '../../assets/styles/LoginForm.css';
import { getServer } from '../../helpers/axios_helper';
export default function EditarPerfil() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [login, setlogin] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [foto, setFoto] = useState("");
  const [previewFoto, setPreviewFoto] = useState("");

  useEffect(() => {
    getProfile()
      .then(data => {
        setId(data.id);
        setlogin(data.login);
        setNombre(data.nombre);
        setApellido(data.apellido);
        setFoto(data.foto);
        setPreviewFoto(`http://${getServer()}:8080/${data.foto}`);
      })
      .catch(error => {
        console.error('Error al obtener el perfil del usuario:', error);
      });
  }, []);
  
  const onChangeHandler = (event) => {
    const { name, value, files } = event.target;
    if (name === 'id') setId(value);
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
    updateUserProfile(login, id, nombre, apellido, foto)
      .then(response => {
        console.log('Perfil actualizado:', response.data);
        navigate('/inicio');
      })
      .catch(error => {
        console.error('Error al actualizar el perfil:', error);
      });
  };

  const handleEdit = () => {
    navigate("/inicio/cambiar-contra");
  };

  return (
    <div className="login-page">
      <div className="login-container" id='container'>
        <h2 className="text-center mb-4">Editar Perfil</h2>
        
        {previewFoto && (
          <div className="text-center mb-3">
            <Image 
              src={previewFoto} 
              alt="Foto de perfil"
              width={150}
              height={150}
              className="profile-photo rounded-circle" 
            />
          </div>
        )}
        
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="foto">Seleccionar Foto</label>
            <input
              type="file"
              id="foto"
              name="foto"
              className="form-control"
              accept="image/*"
              onChange={onChangeHandler}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="id">N.Identificacion</label>
            <input
              type="text"
              id="id"
              name="id"
              className="form-control"
              value={id}
              onChange={onChangeHandler}
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="form-control"
              value={nombre}
              onChange={onChangeHandler}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              className="form-control"
              value={apellido}
              onChange={onChangeHandler}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Guardar Cambios
          </button>
        </form>

        <button 
          type="button" 
          className="btn btn-primary w-100"
          onClick={handleEdit}
        >
          Cambiar contraseña
        </button>
      </div>
    </div>
  );
}