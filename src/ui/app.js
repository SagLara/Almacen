console.log("Holi");
const productForm = document.getElementById('productForm');

const procesador = require('./procesarTexto');

const { remote } = require('electron');
const main = remote.require('./main');

/*
    REVISAR CATEGORIAS
*/

let productos = [];
let categorias = [];

let edit = false;
let editIdProducto = '';

const nombreProducto = document.getElementById('nombre');
const precioProducto = document.getElementById('precio');
const stockProducto = document.getElementById('stock');
const categoria = document.getElementById('categoria');
const marca = document.getElementById('marca');
const descProducto = document.getElementById('descripcion');
const referencia = document.getElementById('referencia');

const listProductos = document.getElementById('productos');

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

    let aviso;
    let status = null;
    let title = "";
    let statement = "";
    if (!edit) {
        statement = "INSERT INTO producto SET NOMBRE='" + nombreProducto.value + "'," +
            "PRECIO=" + precioProducto.value + "," +
            "STOCK=" + stockProducto.value + "," +
            "MARCA='" + marca.value + "'," +
            "DESCRIPCION='" + descProducto.value + "'," +
            "REFERENCIA='" + referencia.value + "'," +
            "ID_CATEGORIA=" + categoria.value + ";";
        console.log(statement);
        const res = await main.crearProducto(newProduct);
        console.log(res);
        title = "Producto creado";
        aviso = `Se creo el producto con el id: ${res.id}`;
    } else {
        statement = "UPDATE producto SET NOMBRE='" + nombreProducto.value + "'," +
            "PRECIO=" + precioProducto.value + "," +
            "STOCK=" + stockProducto.value + "," +
            "MARCA='" + marca.value + "'," +
            "DESCRIPCION='" + descProducto.value + "'," +
            "REFERENCIA='" + referencia.value + "'," +
            "ID_CATEGORIA=" + categoria.value + "  WHERE ID_PRODUCTO =" + editIdProducto + ";";
        console.log(statement);
        const res = await main.updateProducto(editIdProducto, newProduct);
        console.log(res);
        title = "Producto Actualizado";
        aviso = `Se actualizo el producto con el id: ${editIdProducto}`;
        status = "warning";
        edit = false;
        editIdProducto = '';
    }

    createAlert(title, aviso, status);
    createToast(title, aviso, status);

    //console.log(`Se creo el producto con el id: ${res.id}`);

    productForm.reset();
    nombreProducto.focus();
    getProductos();
    await procesador.writeDoc(statement);
});

function renderProductos(products) {
    listProductos.innerHTML = "";
    products.forEach(prod => {
        listProductos.innerHTML += `
            <div class="card my-2">
                <div class="card-header text-white bg-dark">
                    <h6 class="text-light"><b class="text-warning">Nombre:</b> ${prod.NOMBRE} 
                    &ensp; <b class="text-warning">Ref:</b> ${prod.REFERENCIA}</h6>
                </div>
                <div class="card-body text-white bg-primary">
                    <p> <b class="text-white-50"> Descripción: &ensp; </b>
                    <b class="crud"> ${prod.DESCRIPCION} &ensp;</b> </p>
                    <p><b class="text-white-50"> Marca: &ensp; </b> 
                    <b class="crud"> ${prod.MARCA}</b> &ensp; 
                    </p>
                    <h5> 
                        <b class="text-dark"> Precio: </b>  $ ${prod.PRECIO} &ensp; 
                        <b class="text-dark"> Stock: </b> ${prod.STOCK} &ensp; 
                    </h5>
                </div>
                <div class="card-footer bg-dark">
                    <h5 class="text-light"> <b class="text-warning"> ID: </b> ${prod.ID_PRODUCTO} &ensp; </h5>
                    <button class="btn btn-warning" onclick="editarProducto(${prod.ID_PRODUCTO})">
                        <i class="bi bi-pencil-square text-dark"></i>
                        <b class="text-dark crud"> Editar </b>
                    </button>
                    <button class="btn btn-danger" onclick="borrarProducto(${prod.ID_PRODUCTO})">
                        <i class="bi bi-trash"></i>
                        <b class="text-light crud"> Borrar </b>
                    </button>
                </div>
            </div>
        `;
    });
}

async function borrarProducto(id) {
    let statement = "";
    statement = "DELETE FROM producto WHERE ID_PRODUCTO = " + id;
    console.log(statement);
    const response = confirm("¿Esta segur@ de eliminar este producto?");
    if (response) {
        await main.deleteProducto(id);
        await getProductos();
        await procesador.writeDoc(statement);
        createAlert("Producto Eliminado", `Se elimino el producto de id: ${id}`, "danger");
        createToast("Producto Eliminado", `Se elimino el producto de id: ${id}`, "danger");
    }
    return;
}

async function editarProducto(id) {
    const producto = await main.getProductoById(id);
    console.log(producto);
    nombreProducto.value = producto.NOMBRE;
    precioProducto.value = producto.PRECIO;
    stockProducto.value = producto.STOCK;
    marca.value = producto.MARCA;
    descProducto.value = producto.DESCRIPCION;
    referencia.value = producto.REFERENCIA;
    categoria.value = producto.ID_CATEGORIA;

    edit = true;
    editIdProducto = producto.ID_PRODUCTO;
}


const getProductos = async() => {
    productos = await main.getProductos();
    renderProductos(productos);
}

async function init() {
    await getProductos();
}

init();

function createToast(title, msj, status) {
    const add = document.getElementById('add');
    if (status == null) {
        status = 'success';
    }
    let textColor = "text-white";
    if (edit) {
        textColor = "text-dark"
    }
    add.innerHTML = "";
    add.innerHTML = `
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header bg-${status} ${textColor}">
                <strong class="mr-auto">
                    <i class="bi bi-check-circle"></i>
                    ${title}
                </strong>
                <small>Hace 2 segundos</small>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="toast-body bg-dark text-white">
                <p> ${msj} </p>
            </div>
        </div>
    `;

    $('.toast').toast({ delay: 2000 });
    $('.toast').toast('show');
}

function createAlert(title, msj, status) {
    const alert = document.getElementById('mensaje');
    let textColor = "text-white";
    if (status == null) {
        status = 'success';
    }
    if (edit) {
        textColor = "text-dark";
    }
    alert.innerHTML += `
    <div id="create-alert" class="alert alert-${status} ${textColor} alert-dismissible fade show collapse" role="alert">
        <strong>${title}! </strong> ${msj}.
        <button type="button" class="close" data-dismiss="alert" ata-toggle="collapse" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
    </div> 
    `;
}