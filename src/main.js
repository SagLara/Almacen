const { app, BrowserWindow, Notification, ipcMain, ipcRenderer } = require('electron');
const { getConnection } = require('./database');
const path = require("path");
const fs = require("fs");
const Alert = require("electron-alert");


let window;
let window2;

function createWindow() {
    window = new BrowserWindow({
        width: 1200,
        height: 720,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true
        }
    });
    window.loadFile('src/ui/index.html');
}

function categoryWindow() {
    window2 = new BrowserWindow({
        width: 600,
        height: 600,
        parent: window,
        modal: true,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            enableRemoteModule: true
        }
    });
    window2.loadFile('src/ui/categoria.html');
    window2.once('ready-to-show', () => {
        window2.show();
    });
}

async function crearProducto(producto) {
    const conn = await getConnection();

    producto.precio = parseFloat(producto.precio);
    producto.stock = parseInt(producto.stock);
    producto.id_categoria = parseInt(producto.id_categoria);

    const res = await conn.query('INSERT INTO producto SET ?', producto);

    producto.id = res.insertId;

    new Notification({
        title: 'Almacen JIS',
        body: 'El producto se agrego correctamente',
    }).show();

    return producto;
}

async function crearCategoria(categoria) {
    const conn = await getConnection();

    const res = await conn.query('INSERT INTO categoria SET ?', categoria);

    categoria.id = res.insertId;

    new Notification({
        title: 'Almacen JIS',
        body: 'Exito!. Se creo una nueva categoria.',
    }).show();

    return categoria;
}

async function getProductoById(id) {
    const conn = await getConnection();
    const res = await conn.query('SELECT * FROM producto WHERE ID_PRODUCTO = ?', id);
    console.log(res);
    return res[0];
}

async function getCategoriaById(id) {
    const conn = await getConnection();
    const res = await conn.query('SELECT * FROM categoria WHERE ID_CATEGORIA= ?', id);
    console.log(res);
    return res[0];
}

async function getProductos() {
    const conn = await getConnection();
    const results = await conn.query('SELECT * FROM producto ORDER BY ID_PRODUCTO DESC LIMIT 25');
    return results;
}

async function getCategorias() {
    const conn = await getConnection();
    const categorias = await conn.query('SELECT * FROM categoria ORDER BY ID_CATEGORIA DESC');
    return categorias;
}

async function deleteProducto(id) {
    let alert = new Alert();
    let swalOptions = {
        title: "¿Esta segur@ de eliminar este producto?",
        text: "No podra revetir la eliminación del producto.",
        type: "warning",
        showCancelButton: true,
    };

    let promise = alert.fireFrameless(swalOptions, null, true, false);
    promise.then(async(result) => {
        if (result.value) {
            console.log("lo logramoosss");
        } else if (result.dismiss === Alert.DismissReason.cancel) {
            // canceled
            console.log("Se cancelo");
        }
    });
    const conn = await getConnection();
    const result = await conn.query('DELETE FROM producto WHERE ID_PRODUCTO = ?', id);
    console.log("del", result);
    return result;
}

async function updateProducto(id, producto) {
    const conn = await getConnection();
    const result = await conn.query('UPDATE producto SET ? WHERE ID_PRODUCTO = ?', [producto, id]);
    console.log(result);
    return result;
}

async function deleteCategoria(id) {
    const conn = await getConnection();
    const resCat = await conn.query('DELETE FROM categoria WHERE ID_CATEGORIA = ?', id);
    console.log("del", resCat);
    return resCat;
}

async function updateCategoria(id, categoria) {
    const conn = await getConnection();
    const result = await conn.query('UPDATE categoria SET ? WHERE ID_CATEGORIA = ?', [categoria, id]);
    console.log(result);
    return result;
}

module.exports = {
    createWindow,
    categoryWindow,
    crearProducto,
    getProductos,
    getCategorias,
    crearCategoria,
    updateCategoria,
    deleteCategoria,
    getCategorias,
    getProductoById,
    getCategoriaById,
    updateProducto,
    deleteProducto,
}