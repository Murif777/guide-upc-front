import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { getProfile, updateUserProfile } from '../../services/UsuarioService';
import '../../assets/styles/EditarPerfil.css';

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
        console.log("----ID: "+data.id)
        setNombre(data.nombre);
        setApellido(data.apellido);
        setFoto(data.foto);
        setPreviewFoto(`http://localhost:8080/${data.foto}`);
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
    console.log("foto: "+previewFoto)
    updateUserProfile(login, id, nombre, apellido, foto)
      .then(response => {
        console.log('Perfil actualizado:', response.data);
        navigate('/inicio');
      })
      .catch(error => {
        console.log("datos intentados enviar : " +id,nombre);
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
                        roundedCircle/>
                        }
      <form onSubmit={onSubmit}>
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
        <div>
          <input
            type="text"
            id="id"
            name="id"
            className="form-control"
            value={id}
            onChange={onChangeHandler}
            disabled
          />
          <label className="form-label" htmlFor="id">N.Identificacion</label>
        </div>
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
        <button type="submit" className="btn btn-primary btn-block mb-3">Guardar Cambios</button>
      </form>
    </>
  );
}
