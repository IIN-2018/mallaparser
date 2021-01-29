import XLSX from "xlsx";

const BASE_PATH = "./data/Malla.xlsx";

//Leer Excel
const file = XLSX.readFile(BASE_PATH);

const sheets = file.SheetNames;

sheets.forEach((sheetName) => {
  const sheet = file.Sheets[sheetName];

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
  console.log(sheetName);
  console.log(arregloSemestres);
  console.log();
});
