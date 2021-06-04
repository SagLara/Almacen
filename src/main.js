const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');
const { getConnection } = require('./database');
const path = require("path");
const fs = require("fs");

let window;

function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 600,
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

    producto.precio = parseFloat(producto.precio)
    producto.stock = parseInt(producto.stock)
    producto.id_categoria = parseInt(producto.id_categoria)

    const res = await conn.query('INSERT INTO producto SET ?', producto);

    producto.id = res.insertId;

    return producto;
}

function hello() {
    console.log('Hello World');
}

module.exports = {
    createWindow,
    hello,
    crearProducto,
}