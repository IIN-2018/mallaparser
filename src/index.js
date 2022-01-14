const XLSX = require('xlsx');
const fs = require('fs');

const getCarreraData = ( pathName, carrera ) => {

    if(!fs.existsSync(pathName)) throw Error('The file does not exist!');

    const file = XLSX.readFile(pathName);

    if(!file.SheetNames.includes(carrera)) throw Error('The specified sheet does not exist!');
    
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
            : filaMateria.split(",");
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

