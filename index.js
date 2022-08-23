class Usuario{
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

