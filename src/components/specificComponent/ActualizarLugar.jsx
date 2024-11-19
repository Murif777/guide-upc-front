import { useState } from 'react';
import { Image } from 'react-bootstrap';
import { updateLugarPic } from '../../services/LugarService';

export default function EditarLugarPic() {
  const [id, setId] = useState("");
  const [foto, setFoto] = useState("");
  const [previewFoto, setPreviewFoto] = useState("");

  
  const onChangeHandler = (event) => {
    const { name, value, files } = event.target;
    if (name === 'id') setId(value);
    if (name === 'foto' && files.length > 0) {
      const file = files[0];
      setFoto(file);
      setPreviewFoto(URL.createObjectURL(file));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("foto: "+previewFoto)
    updateLugarPic(id,foto)
      .then(response => {
        console.log('lugar actualizado:', response.data);
      })
      .catch(error => {
        console.log("datos intentados enviar : " +id,nombre);
        console.error('Error al actualizar el perfil:', error);
      });
  };

  return (
    <>
      <h2>Editar lugar</h2>
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
          />
          <label className="form-label" htmlFor="id">ID</label>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-3">Guardar Cambios</button>
      </form>
    </>
  );
}
