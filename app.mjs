import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import USER_API from './routes/usersRoute.mjs';
import cors from 'cors';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = express();
server.use(cors());


const port = process.env.PORT || 8080;
server.set('port', port);

import path from 'path';
server.use(express.static(path.join(__dirname, 'public')));

server.use('/api/users', USER_API);

server.get('/', (req, res, next) => {
    res.status(200).send(JSON.stringify({ msg: 'god did' })).end();
});

server.listen(server.get('port'), () => {
    console.log('Server is running on http://localhost:' + server.get('port'));
});
