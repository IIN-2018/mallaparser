const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

/**
 * 
 * @param {string} pathName Path del Excel que se va a parsear
 * @param {string} carrera Iniciales de la Carrera la cual se va a parsear (En README.md)
 * @returns Retorna un objeto de tipo JSON con los datos del Excel que serian cada carreras con sus semestres.
 */
const getCarreraData = (pathName, carrera) => {
    const completePath = path.join(pathName);

    const ext = path.extname(completePath);

    if (ext !== '.xlsx') {
        if (ext !== '.xls') throw new Error('File extension must be .xls');
        throw new Error('File extension must be .xlsx');
    }


    if (!fs.existsSync(completePath)) throw Error('The file does not exist!');

    const file = XLSX.readFile(completePath);

    if (!file.SheetNames.includes(carrera)) throw Error('The specified sheet does not exist!');

    const sheet = file.Sheets[carrera];

    let data = XLSX.utils.sheet_to_json(sheet);

    const arregloSemestres = [];

    let semestre = [];


    data.forEach((row, index) => {
        //Cada fileMateria contiene:
        //Nombre de la materia 
        //Ejemplo: "Algoritmos y Estructuras de Datos 2"
        //Lista de materias que son prerequisitos entre coma
        //Ejemplo: "Algoritmos y Estructuras de Datos 1,Matemática Discreta" 
        let filaMateria = row["Semestre 1"];
        let filaPrerequisito = row["__EMPTY"];

        //En caso que la fila no tenga el string Semestre
        //Indica que tiene una materia
        let materia = {};
        if (!filaMateria.includes("Semestre")) {
            materia["nombre"] = filaMateria;
            let preRequisitos = getPreRequisitos(filaPrerequisito);
            materia["prerequisitos"] = preRequisitos;
            semestre.push(materia);
        } else {
            arregloSemestres.push(semestre);
            semestre = [];
        }

        if (index === data.length - 1) {
            arregloSemestres.push(semestre);
        }
    });

    return arregloSemestres;
}

module.exports = {
    getCarreraData,
}

/**
 * 
 * @param {string || null} filaPrerequisito Informacion de los prerequisitos de la materia obtenido del excel.
 * @returns null en caso que no tengo prerequisitos osino un arreglo con los prerequisitos. 
 */
function getPreRequisitos(filaPrerequisito) {
    let preRequisitos;
    if (filaPrerequisito === "null" || !filaPrerequisito) {
        preRequisitos = [];
    } else {
        preRequisitos = filaPrerequisito.split(",");
    }
    return preRequisitos;
}

