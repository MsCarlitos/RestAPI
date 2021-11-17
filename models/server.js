const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config.database');
const { socketController } = require('../sockets/socketController');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer( this.app );
        this.io = require('socket.io')(this.server);
        this.path = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            upload:     '/api/upload',
            categorias: '/api/categorias',
            usuarios:   '/api/usuarios',
            productos:  '/api/productos',
        }
        this.conectDB();

        //middlewares de la aplicacion
        this.middlewares();

        //Rutas de la aplicacion
        this.routes();

        //Sockets
        this.sockets();
    }

    async conectDB(){
        await dbConnection();
    }
    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio Publico
        this.app.use(express.static('public'));

        //Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.path.auth,       require('../routes/auth.routes'));
        this.app.use(this.path.buscar,     require('../routes/buscar.routes'));
        this.app.use(this.path.categorias, require('../routes/categorias.routes'));
        this.app.use(this.path.productos,  require('../routes/productos.routes'));
        this.app.use(this.path.upload,     require('../routes/uploads.routes'));
        this.app.use(this.path.usuarios,   require('../routes/user.routes'));
    }

    sockets() {
        this.io.on('connection', socketController )
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor Corriendo en el puerto ${this.port}`);
        })
    }
}

module.exports = Server;