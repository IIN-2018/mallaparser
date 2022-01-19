# Malla Parser
## Permite parsear el excel de la malla de los semestres de las carreras.
Excel:
https://docs.google.com/spreadsheets/d/14H_6GhLDCcWcdrVYBNNJrnagThesPS38Y64ZpR7IPH4/edit#gid=0

## Para poder usar ejecutar:
```bash
    npm login --registry=https://npm.pkg.github.com --scope=@iin-2018
```
Luego te va a pedir username, password (Que seria token personal) y correo.

## Instalacion
```bash
    npm install @iin-2018/mallaparser@1.0.0
    or
    yarn add @iin-2018/mallaparser@1.0.0
```

### Parser API
1. getCarreraData(pathName,carrera)
pathName -> Path del Excel
carrera -> La carrera que necesitas

Obs:
- pathName -> Path del Excel
- carrera -> La carrera que necesitas
- Las carreras disponibles son:
    - IIN
    - IEN
    - ICM
    - IAE
    - IEL
    - IEK-Control Industrial
    - LCI
    - IEK-Mecatronica
    - IEK-Teleprocesamiento de Informacion
    - IEK-Electronica Medica
    - LGH-Gastronomia
    - LGH-Hoteleria
    - LGH-Turismo
    - IMK
    - ISP
    - LCIK-Analisis de Sistemas Informatico
    - LCIK-Programacion de Computadoras
    - LEL
    - LCA
