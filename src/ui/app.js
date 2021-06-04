console.log("Holi");
const productForm = document.getElementById('productForm');

const { remote } = require('electron');
const main = remote.require('./main');


const nombreProducto = document.getElementById('nombre');
const precioProducto = document.getElementById('precio');
const stockProducto = document.getElementById('stock');
const categoria = document.getElementById('categoria');
const marca = document.getElementById('marca');
const descProducto = document.getElementById('descripcion');
const referencia = document.getElementById('referencia');


productForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    console.log("Subiending");

    const newProduct = {
        nombre: nombreProducto.value,
        precio: precioProducto.value,
        stock: stockProducto.value,
        marca: marca.value,
        descripcion: descProducto.value,
        referencia: referencia.value,
        id_categoria: categoria.value,
    }

    console.log(nombreProducto.value);
    console.log(precioProducto.value);
    console.log(stockProducto.value);
    console.log(categoria.value);
    console.log(marca.value);
    console.log(descProducto.value);
    console.log(referencia.value);

    const res = await main.crearProducto(newProduct);
    console.log(res);

    const msj = document.getElementById('create');
    msj.innerText = "Se creo el producto con el id: " + res.id;

    $('.toast').toast({ delay: 3000 });
    $('.toast').toast('show');

    //console.log(`Se creo el producto con el id: ${res.id}`);

    productForm.reset();

});