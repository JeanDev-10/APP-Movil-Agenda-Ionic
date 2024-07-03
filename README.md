<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1>Aplicación Móvil de Agenda con Ionic</h1>

  <p>Este proyecto consiste en una aplicación móvil desarrollada en Ionic para gestionar una agenda personal. La aplicación consume una API desarrollada en Laravel que proporciona operaciones CRUD completas y autenticación segura mediante JWT (JSON Web Tokens).</p>

  <h2>Características</h2>
  <ul>
    <li><strong>Operaciones CRUD:</strong> Permite crear, leer, actualizar y eliminar registros en la agenda.</li>
    <li><strong>Autenticación Segura:</strong> Utiliza JWT para autenticar usuarios y asegurar el acceso a los recursos.</li>
    <li><strong>UI Interactiva:</strong> Interfaz de usuario diseñada con Ionic para ofrecer una experiencia fluida y moderna.</li>
    <li><strong>Documentación de API:</strong> La API backend está documentada con Swagger para facilitar el uso y la comprensión de los endpoints.</li>
    <li><strong>Integración con Backend Laravel:</strong> Consumirá la API desarrollada en Laravel para todas las operaciones de gestión de datos.</li>
  </ul>

  <h2>Tecnologías Utilizadas</h2>
  <ul>
    <li><strong>Backend:</strong> Laravel</li>
    <li><strong>Frontend Móvil:</strong> Ionic</li>
    <li><strong>Autenticación:</strong> JWT (JSON Web Tokens)</li>
    <li><strong>Base de Datos:</strong> MySQL</li>
    <li><strong>Documentación de API:</strong> Swagger</li>
    <li><strong>Lenguaje:</strong> TypeScript</li>
  </ul>

  <h2>Instalación y Configuración del Frontend (Ionic)</h2>
  <ol>
    <li><strong>Clonar el repositorio:</strong></li>
    <pre><code>git clone https://github.com/Jean10112002/APP-Movil-Agenda-Ionic.git
cd APP-Movil-Agenda-Ionic</code></pre>
    <li><strong>Instalar dependencias:</strong></li>
    <pre><code>npm install</code></pre>
    <li><strong>Configurar la API URL:</strong></li>
    <p>Abre el archivo <code>src/environments/environment.ts</code> y asegúrate de que la variable <code>apiUrl</code> apunte a la URL de tu API Laravel:</p>
    <pre><code>export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api', // Cambiar la URL según tu configuración
};</code></pre>
    <li><strong>Iniciar el servidor de desarrollo:</strong></li>
    <pre><code>ionic serve</code></pre>
    <p>Esto iniciará el servidor de desarrollo de Ionic. Puedes acceder a la aplicación en tu navegador en <code>http://localhost:8100</code>.</p>
  </ol>

  <h2>Uso</h2>
  <p>Una vez que el servidor esté en funcionamiento, la aplicación móvil consumirá la API de Laravel para realizar las operaciones CRUD. Asegúrate de que el backend Laravel esté configurado y en funcionamiento correctamente.</p>

  <h2>Contribución</h2>
  <p>¡Contribuciones son bienvenidas! Si deseas colaborar, por favor abre un issue o envía un pull request con tus cambios.</p>

  <h2>Licencia</h2>
  <p>Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.</p>
</body>
</html>
