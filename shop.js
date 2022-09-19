    //do {
      //  let precio = prompt("ingrese precio")
        //const iva = (1.21)
        //respuesta = alert("el precio con IVA es" + " " + "$" + precio * iva)
   // }

    //while (respuesta == "si")
//}
class Articulo {
constructor(Marca, precio, boton) {
        this.Marca = Marca,
        this.precio = precio
        this.boton = boton
}}
let boton = document.getElementsByClassName("boton")
for(let compra of boton){
    compra.addEventListener("click", ()=>{
    alert(`Agregado al carrito`)
    })
  

const Articulo1 = new Articulo("Fiat", 50.000, "b1")
const Articulo2 = new Articulo("kany", 75.000, "b2")
const Articulo3 = new Articulo("ninebot", 200.000, "b3")
const Articulo4 = new Articulo("xiaomi", 400.000, "b4")
const Articulo5 = new Articulo("minimotors", 500.000, "b5")
const Articulo6 = new Articulo("Mobox", 45000, "b6")
const Articulo7 = new Articulo("Vset", 300000, "b7")
const Articulo8 = new Articulo("zero", 480000, "b8")

const Arts = []
Arts.push(Articulo1, Articulo2, Articulo3, Articulo4, Articulo5, Articulo6, Articulo7, Articulo8)

let botonBusqueda = document.getElementById("btnBuscar")
botonBusqueda.onclick = buscarPorMarca()

function buscarPorMarca() {
let busqueda = document.querySelector(".busqueda")
Arts.filter((brand) => brand.Marca.toLowerCase() == buscarMarca.toLowerCase())
    if (busqueda.length == 0) { alert("No se encontró ningún artículo") }
    else { console.log(`los articulos encontrados son:`) }}}

    buscarPorMarca()
//for (let articuloencontrado of busqueda) {
//        console.log(articuloencontrado.mostrarArts())
//    }
//}
//for (let props of Arts) {
//    props.mostrarArts()
//}

//function verModelos() {
//    alert("En la consola puede ver los modelos")
//    console.log("disfrute nuestro catalogo:")
// //   Arts.forEach((modelo) => {
//        modelo.mostrarArts()
//    })
//}

