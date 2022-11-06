const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

const PORT = 8080;

app.listen(PORT, ()=>console.log(`Servidor inicializado en el puerto ${PORT}`));

//Indicar donde están las vistas
app.set("views", __dirname + "/views");

//Indicar el motor que usaré en express
app.set("view engine", "pug");


//Array productos
products = [{
    "title": "Remera",
    "price": 2000,
    "thumbnail": "https://cuestablanca.vteximg.com.br/arquivos/ids/360395-1000-1500/remera-manga-corta-negro-6.jpg?v=637801799423470000",
    "id": 1
},
{
    "title": "Pantalon",
    "price": 5000,
    "thumbnail": "https://www.doiteargentina.com.ar/wp-content/uploads/2018/12/pantalon-doite-kawescar-desmontable-trekking-hombre-01.jpg",
    "id": 2,
}]

//Rutas
app.get("/", (req,res)=>{
    res.render("home")
})

app.get("/productos/:id", (req,res)=>{
    const id = req.params.id;
    const productId = products.find(product=> product.id == id);
    if(!productId){
        res.json({
            error: "Producto no encontrado"
        })
    }else{
        res.json(
            productId
        )
    }
})

app.get("/productos", (req,res)=>{
    if(products.length == 0){
        res.render("noProductos")
    }else{
        res.render("productos",{
        productos:products
    })}
})

app.post("/productos", (req,res)=>{
    let producto = req.body;
    let lastProduct = parseInt(products.length) + 1;
    if(products == []){
        producto.id = 1
    }else{
        producto.id = parseInt(lastProduct);
    }
    products.push(producto);
    res.redirect("/")
})

app.put("/productos/:id", (req,res)=>{
    let product = req.body;
    const id = parseInt(req.params.id)-1;
    let last = products[id];
    let newProduct = products[id]; 
    newProduct = product;
    newProduct.id = id + 1;
    products.splice(id, 1, newProduct)

    res.json({
        last,
        newProduct
    })
})

app.delete("/productos/:id", (req,res)=>{
    let id = parseInt(req.params.id);
    let newArray = products.filter(product => product.id != id);
    products = newArray;

    res.json(
        "Producto eliminado con éxito"
    )
})