    //do {
      //  let precio = prompt("ingrese precio")
        //const iva = (1.21)
        //respuesta = alert("el precio con IVA es" + " " + "$" + precio * iva)
   // }

    //while (respuesta == "si")
//}

//let boton = document.getElementsByClassName("boton")
//for(let compra of boton){
 //   compra.addEventListener("click", ()=>{
   //     alert(`Agregado al carrito ${this.Marca}`)
   // }
//    )}
class Articulo {
constructor(Marca, imagen, precio, boton) {
        this.Marca = Marca,
        this.imagen = imagen,
        this.precio = precio,
        this.boton = boton
}
mostrarArts(){
    console.log(`La marca es ${this.marca}`)
}}
const Articulo1 = new Articulo("Fiat", "imagenFiat", 50.000, "b1")
const Articulo2 = new Articulo("kany", "imgKany", 75.000, "b2")
const Articulo3 = new Articulo("ninebot", "IMGg30p", 200.000, "b3")
const Articulo4 = new Articulo("xiaomi", "Imgm365", 400.000, "b4")
const Articulo5 = new Articulo("minimotors", "Imgspider", 500.000, "b5")
const Articulo6 = new Articulo("Mobox","imgmobox", 45000, "b6")
const Articulo7 = new Articulo("Vset", "imgVset", 300000, "b7")
const Articulo8 = new Articulo("zero", "imgZero", 480000, "b8")

const Arts = []
Arts.push(Articulo1, Articulo2, Articulo3, Articulo4, Articulo5, Articulo6, Articulo7, Articulo8)

let divProductos = document.getElementsByClassName("Productos")
Arts.forEach((Articulo)=>{
    let nuevoProducto = document.createElement("div")
    nuevoProducto.innerHTML = `<div class="card">
                            <h3>"${Articulo.Marca}"</h3>      
                            <img class="card_img"src="./images/Eagle.jpg">
                            <p class="">Precio:"${Articulo.precio}"</p>
                            <button class="boton">AÑADIR AL CARRITO</button>
                            </div>`
divProductos.append(nuevoProducto)                        
})
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
//function buscarPorMarca() {
//    let buscarMarca = prompt("Ingrese Marca")
//    let busqueda = Arts.filter((brand) => brand.Marca.toLowerCase() == buscarMarca.toLowerCase())
//    if (busqueda.length == 0) { alert("No se encontró ningún artículo") }
//    else { console.log(`los articulos encontrados son:`) }
//    for (let articuloencontrado of busqueda) {
//        console.log(articuloencontrado.mostrarArts())
//    }
//}

//function pedirOpcion() {
   // let opcion = parseInt(prompt(`Ingrese opción:
     //   1 - Ver modelos
       // 2 - Agregar modelos
        //3 - Eliminar modelos
        //4 - Encontrar por marca
        //5 - salir
        //`
    //))
//    menu(opcion)
//}
//function menu(opcionSeleccionada) {
  //  switch (opcionSeleccionada) {
  //      case 5:
  //          salir = true
  //          alert(`gracias por su visita`)
  //          break
  //      case 1:
  //          verModelos()
  //          break
  //      case 4:
  //          buscarPorMarca()
  //          break
  //      default:
  //          alert(`Ingrese opción de la lista`)