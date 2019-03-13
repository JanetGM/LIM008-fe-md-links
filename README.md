# Markdown Links

## Índice
* [Descripción](#descripción)
* [Implementación](#implementación)
* [Instalación](#instalación)
* [Guía_de_Uso](#guía-de-uso)

## Descripción
Esta es una librería desarrollada con Javascript y node.js , la cual nos permite visualizar el nombre,la dirección de los links de un archivo de formato MD. (Markdown)

![imagen](/img/consola.png)

## Implementación
- Diagrama de Flujo
![imagen](/img/flujo.png)
- Planificación en GitHub con el uso de Project-milestone-issues
![imagen](/img/tablero.png)

## Instalación
 ```
 npm i JanetGM/LIM008-fe-md-links
 ```

## Guía de uso como módulo
 ```
md-links <path> <options>
 ```

- `path` : es la ruta de la carpeta o archivo.
- `option` : pueden ser dos
- `--validate` : estas opciones validan si el link esta activo o no.

## CLI (Línea de comandos)
 ```
md-links <path> <options>
 ```
Por ejemplo: Retorna las propiedades file, href y text
```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```
Retorna las propiedades file, href, text, status y value
```sh 
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```
Retorna las propiedades total(cantidad total de links) y unique(cantidad de links unicos)
```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```
Retorna las propiedades total(cantidad total de links) y unique(cantidad de links unicos) y broken cantidad de links inactivos)
```sh
$ md-links ./some/example.md --s --v
Total: 3
Unique: 3
Broken: 1
```