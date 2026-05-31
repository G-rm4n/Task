import * as http from 'node:http'
import { readFile } from './readFile.js';
import { routes } from './routes.js';
import { writeLogs } from './WriteLogs.js';
import { createLogsDir } from './createLogsDir.js';

createLogsDir("./logs");


const server = http.createServer(async (req, res) => {

  if (req.url === '/favicon.ico') {
    res.writeHead(204)
    res.end()
    return res
  }

  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'text/html' });
    res.statusMessage = "Metodo no permitido";
    res.end("Metodo no permitido");
    return res;
  }

  const paginaSolicitada = (req.url) as keyof typeof routes;

  const data = await readFile(paginaSolicitada);

  if (data) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.statusMessage = "Pagina Hallada";
    res.end(data);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.statusMessage = "Pagina no encontrada";
    res.end("pagina no encontrada");
  }

  writeLogs(req.method as string, req.url as string, res.statusCode as number, res.statusMessage as string);

  return res;
});


server.listen(3000, "localhost", () => {
  console.log("server escuchando en el puerto 3000");
})

console.log(server.listening)