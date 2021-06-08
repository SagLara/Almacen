console.log("Holi");
const productForm = document.getElementById('productForm');
const Alert = require("electron-alert");
const procesador = require('./procesarTexto');
//const cate = require('./categoria');

const { ipcMain, ipcRenderer } = require('electron');
const { remote } = require('electron');
const main = remote.require('./main');

/* ipcMain.on('request-update-label-in-second-window', (event, arg) => {
    // Solicitud para actualizar la etiqueta en el proceso de renderizado de la segunda ventana
    // Enviaremos los mismos datos que se enviaron al proceso principal
    // Nota: obviamente puede enviar el
    secondWindow.webContents.send('action-update-label', arg);
});
let Data = {
    message: "Hello World !"
};

// Trigger the event listener action to this event in the renderer process and send the data
ipcRenderer.send('request-update-label-in-second-window', Data); */
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
const listCategorias = document.getElementById('categorias');

const btnAdd = document.getElementById('newCategoria');
btnAdd.addEventListener('click', agregarCategoria);


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
                <div class="card-header prods text-white bg-dark">
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
    statement = "DELETE FROM producto WHERE ID_PRODUCTO = " + id + " ;";
    console.log(statement);
    const response = confirm("¿Esta segur@ de eliminar este producto?");
    if (response) {
        await main.deleteProducto(id);
        await getProductos();
        await procesador.writeDoc(statement);
        createAlert("Producto Eliminado", `Se elimino el producto de id: ${id}`, "danger");
        createToast("Producto Eliminado", `Se elimino el producto de id: ${id}`, "danger");
        productForm.reset();
        nombreProducto.focus();
        console.log("llegue");
        remote.getCurrentWindow().focus();
    } else {
        return;
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


const getProductos = (async() => {
    productos = await main.getProductos();
    renderProductos(productos);
});

const getCategorias = (async() => {
    categorias = await main.getCategorias();
    renderCategorias(categorias);
    renderSelect(categorias);
});

function renderCategorias(categories) {
    listCategorias.innerHTML = "";
    categories.forEach(cat => {
        listCategorias.innerHTML += `
        <div class="row table">
            <div class="col-md-2">
            <h6 class="text-light">${cat.ID_CATEGORIA}</h6>
            </div>
            <div class="col-md-4">
            <h6 class="text-light">${cat.NOMBRE}</h6>
            </div>
            <div class="col-md-4">
            <p class="text-light">  ${cat.DESCRIPCION} </p>
            </div>
            <div class="col-md-2 opcions">
                <button class="btn btn-danger" onclick="borrarCategoria(${cat.ID_CATEGORIA})">
                    <i class="bi bi-trash"></i>
                    <b class="text-light"> Borrar </b>
                </button>
            </div>
        </div>
        `;
    });
}

function renderSelect(categorias) {
    categoria.innerHTML = `<option value="">Selecione una categoria</option>`;
    categorias.forEach(cat => {
        categoria.innerHTML += `
                <option value="${cat.ID_CATEGORIA}">${cat.NOMBRE}</option>
        `;
    });
}

async function showCategory(id) {
    console.info(typeof(id));
    await main.categoryWindow();
    /*  if (typeof(id) == 'object') {
         console.log("agrego");
         await cate.charge(-1);
     } else {
         console.log("edito");
         await cate.charge(id);
     } */
}

async function borrarCategoria(id) {
    let statement = "";
    statement = "DELETE FROM categoria WHERE ID_CATEGORIA = " + id + ";";
    console.log(statement);
    const response = confirm("¿Esta segur@ de eliminar esta categoria?");
    if (response) {
        await main.deleteCategoria(id);
        await getCategorias();
        await procesador.writeDoc(statement);
        createAlert("Categoria Eliminado", `Se elimino la categoria de id: ${id}`, "danger");
        createToast("Categoria Eliminado", `Se elimino la categoria de id: ${id}`, "danger");
    }
    return;
}

async function agregarCategoria() {
    await showCategory(-1);
}

async function editarCategoria(id) {

    console.log("RENDER");
    await ipcRenderer.send('producto:editar', id);
    await showCategory(id);
    console.log("Creo Alerta");

}

async function init() {
    await getProductos();
    await getCategorias();
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


module.exports = {
    createAlert,
    createToast,
    main,
}