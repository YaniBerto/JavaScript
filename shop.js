let preguntaCliente = prompt("Busca un producto para un adulto?")
if (preguntaCliente.toLowerCase() == "si") {
    console.log("éstos son nuestros productos para adultos")

    let respuesta = prompt("monopatin?Respuesta: si o no")
    do {
        let precio = prompt("ingrese precio")
        const iva = (1.21)
        respuesta = alert("el precio con IVA es" + " " + "$" + precio * iva)
    }

    while (respuesta == "si")
}
else { console.log("estos son nuestros productos para niños") }

class Articulo {
    constructor(Marca, modelo, precio) {
        this.Marca = Marca,
            this.modelo = modelo,
            this.precio = precio
    }
    mostrarArts() {
        console.log(`La Marca es ${this.Marca}, el modelo es ${this.modelo}, y el precio es ${this.precio}`)
    }
}

const Articulo1 = new Articulo("Fiat", "f500", 50.000)
const Articulo2 = new Articulo("kany", "c85", 75.000)
const Articulo3 = new Articulo("ninebot", "g30p", 200.000)
const Articulo4 = new Articulo("xiaomi", "m365", 400.000)
const Articulo5 = new Articulo("minimotors", "spider", 500.000)

const Arts = []
Arts.push(Articulo1, Articulo2, Articulo3, Articulo4, Articulo5)
console.log(Arts)

for (let props of Arts) {
    props.mostrarArts()
}

function verModelos() {
    alert("En la consola puede ver los modelos")
    console.log("disfrute nuestro catalogo:")
    Arts.forEach((modelo) => {
        modelo.mostrarArts()
    })
}
function buscarPorMarca() {
    let buscarMarca = prompt("Ingrese Marca")
    let busqueda = Arts.filter((brand) => brand.Marca.toLowerCase() == buscarMarca.toLowerCase())
    if (busqueda.length == 0) { alert("No se encontró ningún artículo") }
    else { console.log(`los articulos encontrados son:`) }
    for (let articuloencontrado of busqueda) {
        console.log(articuloencontrado.mostrarArts())
    }
}

function pedirOpcion() {
    let opcion = parseInt(prompt(`Ingrese opción:
        1 - Ver modelos
        2 - Agregar modelos
        3 - Eliminar modelos
        4 - Encontrar por marca
        5 - salir
        `
    ))
    menu(opcion)
}

function menu(opcionSeleccionada) {
    switch (opcionSeleccionada) {
        case 5:
            salir = true
            alert(`gracias por su visita`)
            break
        case 1:
            verModelos()
            break
        case 4:
            buscarPorMarca()
            break
        default:
            alert(`Ingrese opción de la lista`)
    }
}
let salir
while (salir != true) {
    pedirOpcion()
}