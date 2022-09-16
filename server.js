const express = require("express");
const app = express();
const morgan = require("morgan");
const indexAPI= require("./routes/index");

app.set("port", 8080); 
app.set("json spaces", 2); 
app.set('views', __dirname + '/views')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/", express.static(__dirname + "/public"));


const { engine } = require("express-handlebars");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: (__dirname + "/views/layouts/layout.hbs"),
    layoutsDir: (__dirname + "/views/layout"),
    partialsDir: (__dirname + "/views/partials"),
  })
);

! app.set('view engine', 'hbs')


app.use("/", indexAPI);
app.use("/", (req, res)=>{
      res.render("index")
    })

const server = app.listen(app.get("port"), () => {
  console.log(`Servidor express iniciado en puerto ${app.get("port")}`);
});


server.on("error", (error) => {
  console.log(`Error !!!: ${error}`);
});