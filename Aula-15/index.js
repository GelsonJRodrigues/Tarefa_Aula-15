import express from 'express';
import bodyParser from 'body-parser'
const app = express();
import userRoutes from './routes/router.js'

const PORT = 5000;

app.use(bodyParser.json());

app.use('/users', userRoutes);

app.listen(PORT, () => console.log(`Servidor em execução na porta: http://localhost:${PORT}`));