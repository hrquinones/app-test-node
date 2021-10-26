# Titulo Proyecto
Developer Applicant Interview Test - FINTECH TECO
# Descripción del proyecto
La siguiente prueba plantea el desarrollo de una aplicación de consulta de clima que pueda visualizar el 
pronóstico actual, próximos 5 días para la ciudad actual y de una ciudad en específico.
Se requiere implementar una API que provea en formato JSON el estado del tiempo basado en 
diferentes endpoints. 
Ruta base: /v1

Endpoints:
- /location           {Devuelve los datos de ubicación city según ip-api.}
- /current[/city]     {City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual y el estado del tiempo actual.}
- /forecast[/city]    {City es un parámetro opcional. Devuelve los datos de ubicación city o la ubicación actual y el estado del tiempo a 5 días}

# Comenzando 🚀
Repositorio:
https://github.com/hrquinones/app-test-node.git

# Pre-requisitos 📋
-Node 
-Npm
-Git
-Docker (opcional)
# Instalación 🔧
Para la instalacion del proyecto es necesario seguir los siguientes pasos:

1. Clonar el proyecto desde el repositorio con el comando git clone
    git clone https://github.com/hrquinones/app-test-node.git

2. Realizar la instalacion de las librerias y sus dependencias con npm. Para ello se debe posicionar en la carpeta raiz del proyecto (donde se encuentra el archivo package.json) y escribir: 
    npm install
3. Hacer una copia del archivo .env.sample y renombrarlo como .env.
4. Para lanzar el proyecto en un entorno de desarrollo se debe ejecutar el comando:
    npm run dev

-  **** Otra alternativa es usar Docker****  
1. Abrir una terminal, ubicandose en la carpeta raiz del proyecto. Asegurarse que exista el archivo "Dockerfile". Ejecutar el siguiente comando para crear la imagen:
    docker build -t developer/node-web-app .
2. Una vez creada la imagen, se puede crear el contenedor en el puerto que se desee montar:
    docker run -p [puerto]:8000 -d developer/node-web-app
    Ejemplo:
    
        docker run -p 4000:8000 -d developer/node-web-app
3. Para probar el nuevo servicio se puede usar el comando curl:
    curl -i localhost:4000/v1/current

    O abrir el navegador web
# Ejecutando las pruebas ⚙️

    Para ejecutar las pruebas unitarias, se usa el modulo "Supertest" para probar servicios http. 
    En el archivo package.json se agrego el script para lanzar las pruebas
    Para lanzar el test, se puede ejecutar el comando en una terminal ubicandose en el directorio raiz del proyecto, o abrir el terminal en el editor Visual Code:

    npm test

# Construido con 🛠️
- JavaScript
- Node
- NPM
# Autor ✒️
Ricardo Quiñones 
ricardo.quinones@hotmail.com