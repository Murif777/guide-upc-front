```markdown
# Guide-UPC

Guide-UPC es un sistema de navegación accesible desarrollado para personas con discapacidad visual en el campus de la Universidad Popular del Cesar. Este sistema permite a los usuarios moverse de forma autónoma dentro del campus, aprovechando tecnologías de asistencia como narraciones automáticas, descripciones auditivas y compatibilidad con lectores de pantalla. La aplicación frontend está construida en React con Vite y se conecta a un backend desarrollado en Spring Boot.

## Índice
- [Instalación](#instalación)
- [Uso](#uso)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Instalación

### Frontend
1. Clona el repositorio del frontend:
   ```bash
   git clone https://github.com/tu_usuario/guide-upc-front.git
   ```
2. Navega a la carpeta del proyecto:
   ```bash
   cd guide-upc-front
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```

### Backend
El backend del proyecto se encuentra en un repositorio separado. Para configurarlo, sigue las instrucciones en [guide-upc-back](https://github.com/Murif777/guide-upc-back).

## Uso
Para correr el proyecto completo:
1. Asegúrate de que tanto el frontend como el backend estén corriendo.
2. Accede al frontend en `http://localhost:3000` y sigue las instrucciones de navegación.

## Tecnologías Utilizadas
- **Frontend**: React + Vite
- **Backend**: Spring Boot (Maven)
- **API de Google Maps**: Usada para el mapa interactivo dentro de la aplicación
- **Compatibilidad con Lector de Pantalla**: Mejora la accesibilidad para personas con discapacidad visual

## Estructura del Proyecto

### Frontend
```plaintext
src
├── assets
│   ├── images
│   └── styles
├── components
│   ├── common
│   ├── layout
│   └── specificComponents
├── contexts
├── hooks
├── pages
├── services
├── utils
└── App.js
```

### Backend
Para más detalles sobre la estructura del backend, revisa la [documentación en su repositorio](https://github.com/Murif777/guide-upc-back).

## Contribución
Las contribuciones son bienvenidas. Para contribuir:
1. Realiza un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un pull request.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT.
```

Este archivo `README.md` proporciona toda la información esencial y facilita la comprensión del proyecto, su instalación y su uso para cualquier colaborador.
