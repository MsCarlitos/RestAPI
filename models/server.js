const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.database')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            auth: '/api/auth',
            categorias: '/api/categorias',
            usuarios: '/api/usuarios',
            productos: '/api/productos',
        }
        this.conectDB();

        //middlewares de la aplicacion
        this.middlewares();

        //Rutas de la aplicacion
        this.routes();
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
    }

    routes() {
        this.app.use(this.path.auth, require('../routes/auth.routes'));
        this.app.use(this.path.categorias, require('../routes/categorias.routes'));
        this.app.use(this.path.usuarios, require('../routes/user.routes'));
        this.app.use(this.path.productos, require('../routes/productos.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor Corriendo en el puerto ${this.port}`);
        })
    }
}

module.exports = Server;