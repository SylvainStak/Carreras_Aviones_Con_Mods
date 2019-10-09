//inicializa el numero de pasos realizados en la carrera
var pasos = 0;
var contenedor = document.getElementById("recorrido");
const meta = 250;

var nubes = new Array();
var rayos = new Array();

//251 filas para que la casilla de salida no cuente
var tablero = generaTabla(3, meta+1);
contenedor.innerHTML += tablero;

var tablaRecorrido = document.getElementById("tablaRecorrido");

var avioneta = new Avion(
  "avioneta",
  "recursos/imagenes/avioneta.jpg",
  5,
  4,
  0,
  60,
  85,
  tablaRecorrido.rows[0]
);
var airbus = new Avion(
  "airbus",
  "recursos/imagenes/airbus.jpg",
  12,
  8,
  -3,
  33,
  66,
  tablaRecorrido.rows[1]
);
var f18 = new Avion(
  "f18",
  "recursos/imagenes/f18.jpg",
  16,
  10,
  -20,
  45,
  90,
  tablaRecorrido.rows[2]
);

var listaAviones = new Array();
var listaPodium = new Array();

listaAviones.push(avioneta);
listaPodium.push(avioneta);

listaAviones.push(airbus);
listaPodium.push(airbus);

listaAviones.push(f18);
listaPodium.push(f18);

var podium = {
  PRI: "",
  SEC: "",
  TER: ""
};

nuevaCarrera();

aplicaModificaciones();