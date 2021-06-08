//const procesador = require('./procesarTexto');
let editCat = false;
let editIdCategoria = '';

let categoryForm;
let nombreCategoria;
let descCategoria;

//const app = require('./app');

const { ipcMain, ipcRenderer } = require('electron');
const { remote } = require('electron');
const main = remote.require('./main');
const procesador = require('./procesarTexto');

const back = document.getElementById('volver');

categoryForm = document.getElementById('categoryForm');
nombreCategoria = document.getElementById('nameCategoria');
descCategoria = document.getElementById('descCategoria');

async function addCategory(e) {
    e.preventDefault();
    console.log("Categoring");

    const newCategory = {
        nombre: nombreCategoria.value,
        descripcion: descCategoria.value,
    }

    console.log(nombreCategoria.value);
    console.log(descCategoria.value);

    let aviso;
    let status = null;
    let title = "";
    let statement = "";
    if (!editCat) {
        statement = "INSERT INTO categoria SET NOMBRE='" + nombreCategoria.value + "'," +
            "DESCRIPCION='" + descCategoria.value + "';";
        console.log(statement);
        const res = await main.crearCategoria(newCategory);
        console.log(res);
        title = "Categoria creada";
        aviso = `Se creo la categoria con el id: ${res.id}`;
    } else {
        statement = "UPDATE categoria SET NOMBRE='" + nombreProducto.value + "'," +
            "DESCRIPCION='" + descProducto.value +
            "'  WHERE ID_CATEGORIA =" + editIdCategoria + ";";
        console.log(statement);
        const res = await main.updateProducto(editIdCategoria, newProduct);
        console.log(res);
        title = "Categoria Actualizada";
        aviso = `Se actualizo la categoria con el id: ${editIdCategoria}`;
        status = "warning";
        editCat = false;
        editIdCategoria = '';
    }

    //console.log(`Se creo el producto con el id: ${res.id}`);
    categoryForm.reset();
    nombreCategoria.focus();
    //getCategorias();
    await procesador.writeDoc(statement);
    await remote.getGlobal().reload();
    await remote.getCurrentWindow().close();
}

async function closeWindow(e) {
    e.preventDefault();
    await remote.getCurrentWindow().close();
}

ipcRenderer.on('categoria:editar', function(evento, id) {
    console.log("ENTREEEEEEEEE");
    evento.preventDefault();
    editCategory(id);
    console.log("ENTREEEEEEEEE");
});

async function editCategory(id) {
    console.log("CARGANDING");
    const categoria = await main.getCategoriaById(id);
    console.log(categoria);

    const nombreCategoria = document.getElementById('nameCategoria');
    const descCategoria = document.getElementById('descCategoria');

    nombreCategoria.value = categoria.NOMBRE;
    descCategoria.value = categoria.DESCRIPCION;

    console.log("NEW");
    console.log(nombreCategoria.value);
    console.log(descCategoria.value);
    editCat = true;
    editIdCategoria = categoria.ID_PRODUCTO;
}


function init() {
    nombreCategoria.focus();
    if (categoria == null || categoria == undefined) {
        console.log("VACIO");
    } else {
        console.log("PASA");
    }
}

function charge(id) {
    if (id > 0) {
        editCategory(id);
    }
    const btnAdd = document.getElementById('addCategoria');
    btnAdd.addEventListener('click', addCategory);
}

//init();

categoryForm.addEventListener('submit', addCategory);
back.addEventListener('click', closeWindow);

module.exports = {
    editCategory,
    addCategory,
    init,
    charge,
}