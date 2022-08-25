/*class Usuario{
    constructor(nombre, apellido, libro, mascota){
        this.nombre=nombre;
        this.apellido=apellido;
        this.libro=[];
        this.mascota=[];
    }


getFullName(nombre, apellido){
    return `${nombre} , ${apellido}`;
}
addMascota(nombreMascota){
  this.mascota.push(nombreMascota)
}

countMascota(){
    return this.mascota.length;
}

addBook(titulo, autor) {
    this.libro.push({ titulo, autor });
  }
  getBookNames() {
    return this.libro.map(({ titulo }) => titulo);
  }
}


const usuario= new Usuario ("Shaya" , "Suarez")

usuario.getFullName();
usuario.addMascota('Renata')
usuario.addMascota('Roma')
usuario.countMascota();
usuario.addBook("La caida de la casa Usher", "Edgar Allan Poe")
usuario.addBook("Lazos de amor", "Brian Weiss")
usuario.getBookNames();
*/

const fs = require("fs");

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

const file = "productos.txt";
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