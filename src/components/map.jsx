import { GoogleMap, useJsApiLoader  } from "@react-google-maps/api";

const libraries = ["marker"];

const Mapa = () => {
  const mapStyles = {
    height: "100%",
    width: "100%"
  };
  const defaultCenter = {
    lat: 10.451239242379094,
    lng: -73.2617245380028
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "key",
    libraries
  });
  
  let activeInfoWindow = null;
  const onLoad = (map) => {
    if (google && google.maps && google.maps.marker) {
      markers.forEach(markerData => {
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: markerData.position,    
          map: map,
          title: markerData.title,
          content: document.createElement('img')
        });
        marker.content.src = markerData.icon;
        marker.content.style.width = `${markerData.width}px`;
        marker.content.style.height = `${markerData.height}px`;

        const infoWindow = new google.maps.InfoWindow({
            content: `<div><h3>${markerData.title}</h3></div>`
          });
          // Evento click en el marcador
        marker.addListener("click", () => {
            // Cerrar la ventana de información activa
            if (activeInfoWindow) {
              activeInfoWindow.close();
            }
  
            // Abrir la nueva ventana de información
            infoWindow.open(map, marker);
  
            // Actualizar la referencia al InfoWindow actual
            activeInfoWindow = infoWindow;
          });
      });
    } else {
      console.error("google.maps.marker no está definido");
    }
  };
  const mapOptions = {
    disableDefaultUI: true,
    mapId: "3360607fc40391f1",
  };
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

const markers = [
  {
    title: "Bloque A",
    position: { lat: 10.451131944448289, lng: -73.2618933710878 },
    icon: "https://img.icons8.com/?size=100&id=XieTOK4V0QEI&format=png&color=000000",
    width: 40,
    height: 40
  },
  {
    title: "Bloque B",
    position: { lat: 10.45123162795249, lng: -73.26191349016116 },
    icon: "https://img.icons8.com/?size=100&id=XieTOK4V0QEI&format=png&color=000000",
    width: 40,
    height: 40
  },
  {
      title: "Bloque C",
      position: { lat: 10.45142896433331, lng: -73.26190354715881 },
      icon: "https://img.icons8.com/?size=100&id=XieTOK4V0QEI&format=png&color=000000",
      width: 40,
      height: 40
  },
  {
      title: "Bloque D",
      position: { lat: 10.451525828829178, lng: -73.2619175896623 },
      icon: "https://img.icons8.com/?size=100&id=XieTOK4V0QEI&format=png&color=000000",
      width: 40,
      height: 40
  },   
  {
      title: "Bloque E",
      position: { lat: 10.451341582233113, lng: -73.26170994486792 },
      icon: "https://img.icons8.com/?size=100&id=XieTOK4V0QEI&format=png&color=000000",
      width: 40,
      height: 40
  },
  {
      title: "Bloque F",
      position: { lat:10.451588764350829, lng: -73.26153206475344 },
      icon: "https://img.icons8.com/?size=100&id=XieTOK4V0QEI&format=png&color=000000",
      width: 40,
      height: 40
  },
  {
      title: "Bloque G",
      position: { lat: 10.451507004133669, lng: -73.2615223973559 },
      icon: "https://img.icons8.com/?size=100&id=XieTOK4V0QEI&format=png&color=000000",
      width: 40,
      height: 40
  },
  {
      title: "Bloque H",
      position: { lat: 10.452043480589724, lng: -73.2618529921872 },
      icon: "https://img.icons8.com/?size=100&id=XieTOK4V0QEI&format=png&color=000000",
      width: 40,
      height: 40
  },
  {
      title: "Bloque I",
      position: { lat:10.451221005234194, lng: -73.26116240454544 },
      icon: "https://img.icons8.com/?size=100&id=XieTOK4V0QEI&format=png&color=000000",
      width: 40,
      height: 40
  },
  {
      title: "Bloque P",
      position: { lat: 10.451089408962533, lng: -73.2609353947713 },
      icon: "https://img.icons8.com/?size=100&id=XieTOK4V0QEI&format=png&color=000000",
      width: 40,
      height: 40
  },
  {
      title: "Entrada La Vallenata",
      position: { lat: 10.449814373430872, lng: -73.26150219280397 },
      icon: "https://img.icons8.com/?size=100&id=60989&format=png&color=000000",
      width: 40,
      height: 40
  },
  {
      title: "Entrada peatonal principal",
      position: { lat: 10.450301205304632, lng: -73.26079280112495 },
      icon: "https://img.icons8.com/?size=100&id=60989&format=png&color=000000",
      width: 40,
      height: 40
  },
  {
      title: "Entrada peatonal y para bicletas",
      position: { lat: 10.450713942061679, lng: -73.26186140942801 },
      icon: "https://img.icons8.com/?size=100&id=60989&format=png&color=000000",
      width: 40,
      height: 40
  },
  {
      title: "Entrada para motos",
      position: { lat: 10.452356129081986, lng: -73.26178793251891 },
      icon: "https://img.icons8.com/?size=100&id=60989&format=png&color=000000",
      width: 40,
      height: 40
  },
  {
      title: "Salida para motos",
      position: { lat: 10.452109996995441, lng: -73.26153313082057 },
      icon: "https://img.icons8.com/?size=100&id=59781&format=png&color=000000",
      width: 40,
      height: 40
  },
  {
      title: "Entrada ------",
      position: { lat: 10.451195210873628, lng: -73.26051733053507 },
      icon: "https://img.icons8.com/?size=100&id=60989&format=png&color=000000",
      width: 40,
      height: 40
  },
  {
      title: "Entrada para carros",
      position: { lat: 10.450466015907427, lng: -73.26070030830748 },
      icon: "https://img.icons8.com/?size=100&id=60989&format=png&color=000000",
      width: 40,
      height: 40
  },
  {
      title: "Salida para carros",
      position: { lat: 10.449525693342745, lng: -73.26092452143159 },
      icon: "https://img.icons8.com/?size=100&id=59781&format=png&color=000000",
      width: 40,
      height: 40
  },
  {
      title: "Bloque administrativo",
      position: { lat: 10.450750008302888, lng: -73.26046334158053 },
      icon: "https://img.icons8.com/?size=100&id=2gsR2g07AQvu&format=png&color=000000",
      width: 40,
      height: 40
  },
  {
      title: "Auditorio",
      position: { lat: 10.450166627245059, lng: -73.26084732595696 },
      icon: "https://img.icons8.com/?size=100&id=2gsR2g07AQvu&format=png&color=000000",
      width: 40,
      height: 40
  },
  {
      title: "Biblioteca",
      position: { lat: 10.450222254517653, lng: -73.26109798218471 },
      icon: "https://img.icons8.com/?size=100&id=2gsR2g07AQvu&format=png&color=000000",
      width: 40,
      height: 40
  },
  {
      title: "Aulas libres",
      position: { lat: 10.45094085601959, lng: -73.26148445661599 },
      icon: "https://img.icons8.com/?size=100&id=2gsR2g07AQvu&format=png&color=000000",
      width: 40,
      height: 40
  },
  {
      title: "Plazoleta Las Palmas",
      position: { lat: 10.451245385911978, lng: -73.26145651352812 },
      icon: "https://img.icons8.com/?size=100&id=2gsR2g07AQvu&format=png&color=000000",
      width: 40,
      height: 40
  },
  {
      title: "La gallera",
      position: { lat: 10.451530199627125, lng: -73.26217551906635 },
      icon: "https://img.icons8.com/?size=100&id=2gsR2g07AQvu&format=png&color=000000",
      width: 40,
      height: 40
  },
  {
      title: "Oficina de emprendimiento",
      position: { lat: 10.451849362092519, lng: -73.26213796813896 },
      icon: "https://img.icons8.com/?size=100&id=2gsR2g07AQvu&format=png&color=000000",
      width: 40,
      height: 40
  },
  {
      title: "Comedor universitario",
      position: { lat: 10.451793991492988, lng: -73.26237944842141 },
      icon: "https://img.icons8.com/?size=100&id=2gsR2g07AQvu&format=png&color=000000",
      width: 40,
      height: 40
  },
];

export default Mapa;
