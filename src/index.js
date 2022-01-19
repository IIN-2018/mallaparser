const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const getCarreraData = (pathName, carrera) => {
    const completePath = path.join(__dirname, pathName);

    const ext = path.extname(completePath);

    if (ext !== '.xlsx' || ext !== '.xls') throw new Error('File extension must be .xlsx or .xls');

    if (!fs.existsSync(completePath)) throw Error('The file does not exist!');

    const file = XLSX.readFile(completePath);

    if (!file.SheetNames.includes(carrera)) throw Error('The specified sheet does not exist!');

    const sheet = file.Sheets[carrera];

    let data = XLSX.utils.sheet_to_json(sheet);

    const arregloSemestres = [];

    let semestre = [];

    data.forEach((row, index) => {
        let filaMateria = row["Semestre 1"];
        let filaPrerequisito = row["__EMPTY"];
        let materia = {};
        if (!filaMateria.includes("Semestre")) {
            materia["nombre"] = filaMateria;
            materia["prerequisitos"] =
                filaPrerequisito === "null" || !filaPrerequisito
                    ? []
                    : filaPrerequisito.split(",");
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
getCarreraData("public", "IIN");

module.exports = {
    getCarreraData,
}

