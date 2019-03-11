# Markdown Links

## Índice
* [Descripción](#descripción)
* [Instalación](#instalación)
* [Guía_de_Uso](#guía-de-uso)

## Descripción
Esta es una librería desarrollada con Javascript y node.js , la cual nos permite visualizar el nombre,la dirección de los links de un archivo de formato MD. (Markdown)

![imagen](/img/consola.png)


## Instalación 
```
 npm i @janetgutierrezmontalban/md-links
```
```
En la terminal : 

md-links <path> <options>
 1. path : 
   Es la ruta de la carpeta o Archivo
 2. option : 
   
   . --validate : esta opción  valida si el link está activo o no
   . --stats : estas opciones muestran estadisticas de los links(activos , rotos y unicos)
   

```

### `README.md`

- [ ] Colocar el *pseudo codigo* o *diagrama de flujo* con el algoritmo que
  soluciona el problema.
- [ ] Un board con el backlog para la implementación de la librería.
- [ ] Documentación técnica de la librería.
- [ ] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

- [ ] El módulo exporta una función con la interfaz (API) esperada.
- [ ] Implementa soporte para archivo individual
- [ ] Implementa soporte para directorios
- [ ] Implementa `options.validate`

### CLI

- [ ] Expone ejecutable `md-links` en el path (configurado en `package.json`)
- [ ] Se ejecuta sin errores / output esperado
- [ ] Implementa `--validate`
- [ ] Implementa `--stats`

### Pruebas / tests

- [ ] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
  lines, y branches.
- [ ] Pasa tests (y linters) (`npm test`).
