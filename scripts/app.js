import Anuncio from "./Anuncio.js";
import { CrearTabla, Add, Clean, actualizarTablaArray } from "./DinamicTable.js";
import { Insert, GetAll, Delete, GetById} from "./DbManager.js";

window.onload = function (x)  {
    x.preventDefault()
};

const $btn_eliminar = document.getElementById("btn_delete");
$btn_eliminar.style.display = "none";
// Conseguimos el container de la table y le agregamos la tabla dinamica
const $tableDiv = document.getElementById("table_container");
$tableDiv.appendChild(CrearTabla(await GetAll()));
const $formulario = document.getElementById("formulario");

$formulario.addEventListener("submit", (e) =>{
    e.preventDefault();
    // var caracteristicas = new Array(document.getElementById("id-gnc-caract").checked ? "GNC" : null,
    //                                 document.getElementById("id-nafta-caract").checked ? "NAFTA" : null,
    //                                 document.getElementById("id-diesel-caract").checked ? "DIESEL" : null );
    //Consigo los datos del formulario y los asigno en las respectivas variables
    const {txtId, txtTitle, venta_alquiler, txtDescription, txtPrecio, txtBanios, txtAutos, txtDormitorios} = $formulario;
    const anuncio = new Anuncio(txtId.value, txtTitle.value, venta_alquiler.value, txtDescription.value, parseInt(txtPrecio.value), txtBanios.value, txtAutos.value, txtDormitorios.value);
    Clean();
    if(txtId.value === ''){
        Add(anuncio);
    }
    else{
        Update(anuncio);
    }
});


function CalcularPromedio(elementos){
  // Obtenemos un array con los precios de cada producto
  const precios = elementos.map((producto) => producto.precio);
  console.log(precios);
  // Calculamos la suma de los precios
  const sumaPrecios = elementos.reduce((acumulador, precio) => acumulador + parseInt(precio), 0);
//   console.log(sumaPrecios);

  // Calculamos el promedio
  return sumaPrecios / elementos.length;
}

const $select = document.getElementById("select_filter");
const $promedio = document.getElementById("promedio");
$select.addEventListener("change", async (e)=>{
    e.preventDefault();
    const value = $select.value;
    const list = await GetAll();
    if(value != "Todos"){
        const filteredList = list.filter((x) => x.transaccion == value);
        actualizarTablaArray(filteredList);
        $promedio.value = CalcularPromedio(filteredList);
    }else{
        actualizarTablaArray(list);
        $promedio.value = CalcularPromedio(list);
    }
});

window.addEventListener("click", async (e) => {
    var newArray = new Array();
    const list = await GetAll();
    $btn_eliminar.style.display = "block";
    if (e.target.matches("tr td")) {
        var newArray = new Array();
        list.forEach(element => {
          newArray.push(element);
        });
        let id = e.target.parentElement.dataset.id;

        const anuncio = newArray.find((anuncio)=>anuncio.id==id);
        const {txtId, txtTitle, venta_alquiler, txtDescription, txtPrecio, txtBanios, txtAutos, txtDormitorios} = $formulario;
        txtId.value = anuncio.id;
        txtTitle.value = anuncio.titulo;
        venta_alquiler.value = anuncio.transaccion;
        txtDescription.value = anuncio.descripcion;
        txtPrecio.value = anuncio.precio;
        txtBanios.value = anuncio.banios;
        txtAutos.value = anuncio.autos;
        txtDormitorios.value = anuncio.dormitorios;
      } 
      else if(e.target.matches('#btn_delete')){
        const {txtId} = $formulario;
        Delete(txtId.value);
      }
  });
  