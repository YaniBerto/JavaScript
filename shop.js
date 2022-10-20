
class Articulo {
    constructor(Id, Modelo, Imagen, Marca, precio) {
        this.Id = Id,
        this.Modelo = Modelo,
        this.Imagen = Imagen,
        this.Marca = Marca,
        this.precio = precio
    }
}

let compra = []

let Arts = []

const cargarArticulos = async() => {
    const response = await fetch("./articulos.json")
    const data = await response.json()
    //console.log(data)
    Arts = []
    for (let Producto of data) {
        let ArticuloNuevo = new Articulo (Producto.Id, Producto.Modelo, Producto.Imagen, Producto.Marca, Producto.precio)
        Arts.push(ArticuloNuevo)
    }
    
    localStorage.setItem("Arts", JSON.stringify(Arts))
    mostrarProductos(Arts)
}

cargarArticulos()

let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []

if(localStorage.getItem("Arts")){
    Arts = JSON.parse(localStorage.getItem("Arts"))
}else{
    console.log("seteando por primera vez")
    cargarArticulos()
    //window.location.reload()
}

function mostrarProductos(array) {
    let divProductos = document.getElementById("Productos")
    divProductos.innerHTML = ""
    array.forEach((Articulo) => {        
        let nuevoProducto = document.createElement("div")
        nuevoProducto.innerHTML = `<div id="${Articulo.Id}"class="card" style="width: 18rem;">
            <img class="card-img-top" style="height:250px;" src="images/${Articulo.Imagen}" alt="${Articulo.Modelo}">
            <div class="card-body">
            <h4 class="card-title">${Articulo.Marca}</h4>
            <p class="card-text">$${Articulo.precio}</p>
            <button id="agregarBtn${Articulo.Modelo}">Añadir al carrito</button>
            </div>
            </div>`

        divProductos.append(nuevoProducto)

        let agregarBtn = document.getElementById(`agregarBtn${Articulo.Modelo}`)
            agregarBtn.addEventListener("click", () => {
            agregarAlCarrito(Articulo)
        })
    })
}

function agregarAlCarrito(Articulo){
    let articuloAgregado = productosEnCarrito.find((elem)=> (elem.Id == Articulo.Id))
            if (articuloAgregado == null){
                let item = {
                    articulo: Articulo,
                    cantidad: 1
                }
            compra.push(item)
            productosEnCarrito.push(Articulo)
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
        localStorage.setItem("compra", JSON.stringify(compra))
        Toastify({
            text: "El producto ha sido agregado al carrito",
            duration:2000,
            gravity: "top",
            position: "center",
            className: "Info",
                style: {background: "linear-gradiente(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    }else{
        compra.forEach(element => {
            if(element.articulo.Id == Articulo.Id) {
                element.cantidad ++
            } 
        })       
        localStorage.setItem("compra", JSON.stringify(compra))
    Toastify({
        text:"El producto ya se encuentra en el carrito",
        duration: 2000,
        gravity: "top",
        position: "center",
        className: "Info",
            style:{
            background: "linear-gradiente(to right, #00b09b, #96c93d)",
    }
    }).showToast();
    }
    console.log(compra)
    }

let botonBusqueda = document.getElementById("btnBuscar")

botonBusqueda.addEventListener('click', buscarPorMarca)

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
    })
}
let input = document.getElementById("busqueda")
    input.value = ""

let botonCarrito = document.getElementById("botonCarrito")
let modalBody = document.getElementById("modal-body")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
let parrafoCompra = document.getElementById('precioTotal')

botonCarrito.addEventListener("click", ()=>{
cargarProductosCarrito(compra)
})

function cargarProductosCarrito(array){   

    modalBody.innerHTML = ""
    array.forEach((element) => {
        if (element.cantidad > 0) {
            let subtotal = element.cantidad * element.articulo.precio
            modalBody.innerHTML +=
            `<div class="card border-primary mb-3" id ="productoCarrito${element.articulo.Id}"
            style="max-width: 540px;">
                <img class="card-img-top" src="images/${element.articulo.Imagen}" alt="${element.articulo.Modelo}">
                <div class="card-body">            
                    <h4 class="card-title">${element.articulo.Modelo}</h4>                
                    <div class="card-text mb-1">${element.cantidad} x $${element.articulo.precio}</div>
                    <span>Subtotal: $${subtotal}</span>
                    <br>
                    <br>
                    <button class= "btn btn-danger" id="botonEliminar${element.articulo.Id}"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>`
                       
        } else {
            let card = document.getElementById(`productoCarrito${element.articulo.Id}`)
            if(card) {
                card.remove()
            }
        }
    })
    //document.getElementById(`botonEliminar${element.articulo.Id}`) 

    

    array.forEach(element => {
        let btnEliminar = document.getElementById(`botonEliminar${element.articulo.Id}`)
        if(btnEliminar) {
            btnEliminar.addEventListener("click", () => {     
                let id = element.articulo.Id   
                compra.forEach(element2 => {
                    if(element2.articulo.Id == id) {
                        element2.cantidad --                   
                        localStorage.setItem("compra", JSON.stringify(array)) 
                        cargarProductosCarrito(array)                       
                    }
                })
            })
        }
    })   

    compraTotal(array)
}
function compraTotal(array){
    let acumulador = 0
    acumulador = array.reduce((acumulador, element)=>{
    return acumulador + element.cantidad * element.articulo.precio
    },0) 
    acumulador == 0 ? parrafoCompra.innerHTML = `<p>No hay productos en el carrito</p>`
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
}).then((result)=>{
    if (result.isConfirmed){
        Swal.fire({
            title: `Compra Realizada`,
            icon: `success`,
            confirmButtonColor: `blue`,
            text: `Muchas Gracias por su compra`,
    })
    productosEnCarrito=[]
    localStorage.removeItem("carrito")
    }else{
        Swal.fire({
            title: `Compra no realizada`,
            icon: `info`,
            text: `La compra no se realizó`,
            confirmButtonColor: `grey`,
            timer:2000
        })
    }
})
}

