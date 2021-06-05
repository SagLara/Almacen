const { app, BrowserWindow, Notification, ipcMain, ipcRenderer } = require('electron');
const { getConnection } = require('./database');
const path = require("path");
const fs = require("fs");
const readline = require('readline');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


let window;

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

async function getProductoById(id) {
    const conn = await getConnection();
    const res = await conn.query('SELECT * FROM producto WHERE ID_PRODUCTO = ?', id);
    console.log(res);
    return res[0];
}

async function getProductos() {
    const conn = await getConnection();
    const results = await conn.query('SELECT * FROM producto ORDER BY ID_PRODUCTO DESC LIMIT 25');
    return results;
}

async function deleteProducto(id) {
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

function hello() {
    console.log('Hello World');
}

module.exports = {
    createWindow,
    hello,
    crearProducto,
    getProductos,
    deleteProducto,
    getProductoById,
    updateProducto,
}