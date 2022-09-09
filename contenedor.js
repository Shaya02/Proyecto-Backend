/*const fs = require("fs");

class Container {
  constructor(file) {
    this.file = file;
  }

  async save(object) {
      const dataToParse = await fs.readFileSync(this.file, "utf-8");
    const dataParsed = JSON.parse(dataToParse);
    const productFound = dataParsed.find(({ title }) => title == object.title);

    try {
      if (productFound) {
        console.log("El producto ya existe en el archivo");
      } else {
        object.id = dataParsed.length + 1;
        dataParsed.push(object);
        const updatedFile = JSON.stringify(dataParsed, null, " ");
        fs.writeFileSync(this.file, updatedFile);
        console.log(
          `Se ha agregado el producto: ${object.title} con el id ${object.id}`
        );
        return object.id;
      }
    } catch (error) {
      console.error(`Se produjo un error:${error}`);
    }
  }

  async getById(idEntered) {

    const dataToParse = await fs.readFileSync(this.file, "utf-8");
    const dataParsed = JSON.parse(dataToParse);
    const idFound = dataParsed.find(({ id }) => id === idEntered);

    try {
      if (idFound) {
        console.table(idFound);
        return idFound;
      } else {
        console.log("No se ha encontrado el producto");
        return null;
      }
    } catch (error) {
      console.error(`Se produjo un error: ${error}`);
    }
  }

  async getAll() {

    const dataToParse = await fs.readFileSync(this.file, "utf-8");
    const dataParsed = JSON.parse(dataToParse);

    try {
      if (dataParsed.length > 0) {
        console.log(dataParsed);
        return dataParsed;
      } else {
        console.log("No hay elementos disponibles");
      }
    } catch (error) {
      console.error(`Se ha producido un error: ${error}`);
    }
  }

  async deleteById(idEntered) {

    const dataToParse = await fs.readFileSync(this.file, "utf-8");
    const dataParsed = JSON.parse(dataToParse);
    const leakedID = dataParsed.filter(({ id }) => id !== idEntered);
    const idFound = dataParsed.find(({ id }) => id === idEntered);

    try {
      if (idFound) {
        console.log(
          `Se ha eliminado el objeto con id:${idEntered} >> [[${idFound.title}]]`
        );
        const updatedFile = JSON.stringify(leakedID, null, " ");
        fs.writeFileSync(this.file, updatedFile);
      } else {
        console.log(`No se ha encontrado el objeto con id: ${idEntered}`);
      }
    } catch (error) {
      console.error(`Se ha producido un error: ${error}`);
    }
  }

  async deleteAll() {
    try {
      console.log("Todos los objetos fueron eliminados");
      await fs.writeFileSync(this.file, "[]");
    } catch (error) {
      console.error(`Se ha producido un error en deleteAll: ${error}`);
    }
  }
}

const file = "productos.json";
const contenedor = new Container(file);

let newObject = {
  title: "Lemon pie",
  price: 2000,
};

let anotherObject = {
  title: "Cookies",
  price: 950,
   
};

contenedor.save(newObject);
contenedor.save(anotherObject);

module.exports = Container; */

const express = require("express");
const { Router } = express;
const router = Router();
const Contenedor = require("../clase4/desafio-clase4");
const constructor = new Contenedor("./productos.txt");

router.get("/", (req, res) => {
  try {
    res.send(constructor.getAll());
  } catch (err) {
    res.status(404).send(err);
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    res.send(constructor.getById(parseInt(id)));
  } catch (err) {
    res.status(404).send(err);
  }
});

router.post("/", (req, res) => {
  try {
    const data = req.body;
    const ID = constructor.save(data);
    res.send({ ID });
  } catch (err) {
    res.status(404).send(err);
  }
});

router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const prodNuevo = req.body;
    const idInt = parseInt(id);
    res.send(constructor.updateById(idInt, prodNuevo));
  } catch (err) {
    res.status(404).send(err.msg);
  }
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    res.send(constructor.deleteById(parseInt(id)));
  } catch (err) {
    res.status(404).send(err.msg);
  }
});

module.exports = router;