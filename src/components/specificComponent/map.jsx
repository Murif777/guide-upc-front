import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { getLugares } from '../../services/LugarService';
import { getServer } from '../../helpers/axios_helper';
const libraries = ["marker"];

const Mapa = () => {
  const [lugares, setLugares] = useState([]);
  const [Foto, setFoto] = useState("");

  const mapStyles = {
    height: "100%",
    width: "100%"
  };
  const defaultCenter = {
    lat: 10.451239242379094,
    lng: -73.2617245380028
  };
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDeZYRwlUuizazIYTXuen0DfeP0cQdOZeM",
    libraries
  });

  useEffect(() => {
    const fetchLugares = async () => {
      try {
        const lugares = await getLugares();
        setLugares(lugares);
      } catch (error) {
        console.error('Error al obtener los lugares:', error);
      }
    };

    fetchLugares();
  }, []);

  let activeInfoWindow = null;
  const onLoad = (map) => {
    if (google && google.maps && google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
      lugares.forEach(lugar => {
        if (lugar.latitud!=0||lugar.longitud!=0) {
          const content = document.createElement('div');
          content.style.width = '30px';
          content.style.height = '40px';
          const img = document.createElement('img');

          img.src = lugar.icono || "https://img.freepik.com/vector-gratis/ilustracion-icono-galeria_53876-27002.jpg";
          img.style.width = '100%';
          img.style.height = '100%';
          content.appendChild(img);
  
          const marker = new google.maps.marker.AdvancedMarkerElement({
            position: { lat: lugar.latitud, lng: lugar.longitud },
            map: map,
            title: lugar.nombre,
            content: content
          });
          const infoWindowContent = ` 
          <div> 
            <img src="${lugar.foto = lugar.foto == null ? "https://img.freepik.com/vector-gratis/ilustracion-icono-galeria_53876-27002.jpg" : `http://${getServer()}:8080/${lugar.foto}`}" alt="${lugar.nombre}" style="width: 100%; height: 100%; max-width: 350px;max-height: 200px;" /> 
            <h3>${lugar.nombre}</h3> 
            <p>${lugar.descripcion}</p> 
          </div> `;
          const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent
          });
  
          marker.addListener("click", () => {
            if (activeInfoWindow) {
              activeInfoWindow.close();
            }
            infoWindow.open(map, marker);
            activeInfoWindow = infoWindow;
          });
        }
      });
    } else {
      console.error("google.maps.marker.AdvancedMarkerElement no está definido");
    }
  };

  const mapOptions = {
    disableDefaultUI: true,
    mapId: "3360607fc40391f1",
  };

  if (loadError) {
    return <div>Error al cargar el mapa</div>;
  }

  if (!isLoaded) {
    return <div>Cargando...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={18}
      center={defaultCenter}
      onLoad={onLoad}
      options={mapOptions}
    />
  );
};

export default Mapa;
