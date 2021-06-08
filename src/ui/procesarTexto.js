/* const { remote } = require('electron');
const main = remote.require('./main'); */

const { error } = require('console');
const fs = require('fs');


//btnAdd.addEventListener('click', writeDoc);

function writeDoc(contenido) {
    contenido += "\n";

    fs.appendFile('src/utils/sentencias.txt', contenido, (err, evento) => {
        console.log("Escribo");
        //console.log(evento);
        //evento.preventDefault();
        if (err) {
            throw ('No se pudo crear');
        }
        console.log("Se escribio new info");
    });
}

/* fs.writeFileSync('src/utils/v1.txt', contenido);
    console.log("Se escribio");


    fs.writeFile('src/utils/v2.txt', contenido, (err) => {
        if (err) {
            throw ('No se pudo crear');
        }
        console.log("x2");
    });
    console.log("x2");
} */

function docExist() {

    fs.access('src/utils/sentencias.txt', fs.constants.F_OK, (err) => {
        if (err) {
            console.log(err);
            console.log("Existe");
            return false;
        } else {
            console.log("Existe");
            return true;
        }


    });

    /*  fs.access('src/utils/sentencias.txt', fs.constants.F_OK, (err) => {
         if (err) {
             return console.log(err);
         } else {
             console.log("data");
         }


     }); */
}

function loadDoc() {

    fs.readFile('src/utils/sentencias.txt', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        //console.log(data);
        //console.log("Leo veo");
        console.log("Lol");
    });
}

function readDir() {
    fs.readdir('./', (error, files) => {

        if (error) {
            throw error;
        }

        console.log(files);
        //const file = fs.readFileSync('src/utils/sentencias.txt', 'utf-8');

        fs.readFile('src/utils/sentencias.txt', 'utf-8', (error, archivo) => {
            if (error) {
                throw error;
            }

            console.log(archivo);
        });

        console.log("Cargando doc");

    });
}


module.exports = {
    loadDoc,
    writeDoc,
    docExist,
}