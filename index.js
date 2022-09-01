const express = require('express');
const app = express();
const Container = require("./contenedor");
const contenedor = new Container("./productos.json");

app.set("port", 8080);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1 style='color:pink'> BIENVENIDO</h1>");
});

app.get("/productos", async (req, res) => {
  let data = await contenedor.getAll();
  res.send(data);
});

app.get("/randomProduct", async (req, res) => {
  let randomNum = Math.floor(Math.random() * 9 + 1);
  let data = await contenedor.getById(randomNum);
  data === null
    ? res.send(
        `<h4>ID:${randomNum} >> [[ERROR]] No se ha encontrado el producto</h4>`
      )
    : res.json(data);
});


const server = app.listen(app.get("port"), () => {
  console.log(`Servidor express iniciado en puerto ${app.get("port")}`);
});

server.on("error", (error) => {
  console.log(`Error!: ${error}`);
});