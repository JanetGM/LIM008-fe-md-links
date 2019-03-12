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
![imagen](img\flujo.png)
- Planificación en GitHub con el uso de Project-milestone-issues
![imagen](img\tablero.png)

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

```
CLI (Línea de comandos)
md-links <path> <options>
Por ejemplo: Retorna las propiedades file, href y text

$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
Retorna las propiedades file, href, text, status y value
```
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
Retorna las propiedades total(cantidad total de links) y unique(cantidad de links unicos)
````
```
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
Retorna las propiedades total(cantidad total de links) y unique(cantidad de links unicos) y broken cantidad de links inactivos)
``` 
$ md-links ./some/example.md --s --v
Total: 3
Unique: 3
Broken: 1
