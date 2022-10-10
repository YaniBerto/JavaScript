
class Articulo {
constructor(Id, Modelo, Imagen, Marca, precio) {
        this.Id = Id,
        this.Modelo = Modelo,
        this.Imagen = Imagen,      
        this.Marca = Marca,
        this.precio = precio
}}
let Arts = []

const cargarArticulos = async()=>{
    const response = await fetch("articulos.json")
    const data = await response.json()
    console.log(data)
        for (let Articulo of data){
            let ArticuloNuevo = new Articulo(Articulo.Id, Articulo.Modelo, Articulo.Imagen, Articulo.Marca, Articulo.precio)
        Arts.push(ArticuloNuevo)
    }
}
// const Articulo1 = new Articulo(1,"CS_516","MoboxCS516.jpg", "Mobox",50000)
// const Articulo2 = new Articulo(2,"F500 F10", "F500F10.jpg","Fiat", 75000)
// const Articulo3 = new Articulo(3,"C85","KanyC85.jpg","Kany",200000)
// const Articulo4 = new Articulo(4,"Max G30P","NineBotG30P.jpg","Ninebot", 400000)
// const Articulo5 = new Articulo(5,"M365","xiaomi m365.png","Xiaomi",500000)
// const Articulo6 = new Articulo(6,"Dualtron Spider","dualtron-spider.png","Minimotors",45000)
// const Articulo7 = new Articulo(7,"8","Vsett 8 web 1.jpg","Vsett", 300000)
// const Articulo8 = new Articulo(8,"10","Zero10x.jpg","Zero", 480000)


localStorage.setItem("Arts", JSON.stringify(Arts))

let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []

let divProductos = document.getElementById("Productos")
function mostrarProductos(array){

    if(localStorage.getItem("Arts")){
    Arts = JSON.parse(localStorage.getItem("Arts"))
}
else{
    console.log("seteando por primera vez")
}
    cargarArticulos()
    
divProductos.innerHTML = ""
Arts.forEach((Articulo)=>{
let nuevoProducto = document.createElement("div")
nuevoProducto.innerHTML =`<div id="${Articulo.Modelo}"class="card" style="width: 18rem;">
                        <img class="card-img-top" style="height:250px;" src="images/${Articulo.Imagen}" alt="${Articulo.Modelo}">
                        <div class="card-body">
                        <h4 class="card-title">${Articulo.Marca}</h4>
                        <p class="card-text">${Articulo.precio}.</p>
                        <button id="agregarBtn${Articulo.Modelo}">Añadir al carrito</button>
                        </div>
    </div>`
    divProductos.append(nuevoProducto)
    
    let agregarBtn = document.getElementById(`agregarBtn${Articulo.Modelo}`)
    agregarBtn.addEventListener("click", ()=>{
        agregarAlCarrito(Articulo)

    })
})
}
    function agregarAlCarrito(Articulo){
        let articuloAgregado = productosEnCarrito.find((elem)=> (elem.Id == Articulo.Id))
                if (articuloAgregado == undefined){
                productosEnCarrito.push(Articulo)
            localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
            Toastify({
                text: "El producto ya se encuentra en el carrito",
                duration:2000,
                gravity: "top",
                position: "center",
                className: "Info",
                    style: {background: "linear-gradiente(to right, #00b09b, #96c93d)",
                }
            })
        }else{
        Toastify({
            text:"Producto agregado al carrito",
            duration: 2000,
            gravity: "top",
            position: "center",
            className: "Info",
                style:{
                background: "linear-gradiente(to right, #00b09b, #96c93d)",
        }
        }).showToast();
        
        }
        
let productosEnCarrito = []
    
    //let botonCompra = document.getElementById(`agregarBtn${Articulo.Modelo}`)
    //    for(let compra of botonCompra){
    //        compra.addEventListener("click", ()=>{
    //        agregarAlCarrito(Articulo)
     //   })


let botonBusqueda = document.getElementById("btnBuscar")
botonBusqueda.addEventListener('click',buscarPorMarca)
function buscarPorMarca() {
    let busqueda = document.getElementById("busqueda") 
    console.log(busqueda.value)
    let marcaingresada = Arts.filter((brand) => brand.Marca.toLowerCase() == busqueda.value.toLowerCase())

    marcaingresada.length == 0 ?  
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se encontró ningún artículo de esa marca',
        }) 
        : 
        marcaingresada.forEach((Articulo) => {
        Swal.fire({
        imageUrl: src=`images/${Articulo.Imagen}`,
        text: `El modelo encontrado es: ${Articulo.Modelo}`,
        imageHeight: 500,
        imageAlt: 'A tall image'
        })
    
})}
let input = document.getElementById("busqueda")
    input.value = ""

let botonCarrito = document.getElementById("botonCarrito")
let modalBody = document.getElementById("modal-body")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
let parrafoCompra = document.getElementById('precioTotal')

botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
})
function cargarProductosCarrito(array){
    
    modalBody.innerHTML =""
    array.forEach((productoCarrito)=>{

        modalBody.innerHTML +=
        `<div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.Modelo}"
        style="max-width: 540px;">
            <img class="card-img-top" src="images/${productoCarrito.Imagen}" alt="${productoCarrito.Modelo}">
            <div class="card-body">
                <h4 class="card-title">${productoCarrito.Modelo}</h4>
                <p class="card-text">$${productoCarrito.precio}</p><button class= "btn btn-danger" id="botonEliminar"><i class="fas fa-trash-alt"></i></
                button>
            </div>
    </div>`
})
    compraTotal(array)
   
}
function compraTotal(array){
    let acumulador = 0
    acumulador = array.reduce((acumulador, productoCarrito)=>{
    return acumulador + productoCarrito.precio
    },0) 
    acumulador == 0?parrafoCompra.innerHTML = `<p>No hay productos en el carrito</p>`
    :
    parrafoCompra.innerHTML = `El total de su carrito es ${acumulador}`
}
botonFinalizarCompra.addEventListener("click", ()=>{finalizarCompra()})
function finalizarCompra(){
Swal.fire({
    title:`Está seguro de realizar la compra?`,
    icon: `info`,
    showCancelButton: true,
    confirmButtonText: `Si`,
    cancelButtonText: `No`,
    confirmButtonColor: `blue`,
    cancelButtonColor: `Black`
})
}}
