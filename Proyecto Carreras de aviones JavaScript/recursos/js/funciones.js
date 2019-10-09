/**
 * Funcion que genera una tabla con el numero de filas y columnas especificadas
 * 
 *  @param row - numero de filas 
 *  @param col - numero de columnas
 * 
 *  @return string con el contenido de la tabla para insertar en el HTML 
 * 
 * //TO-DO
 * * Comprobar si estoy en posicion de nube o de rayo y añadirlo a su clase
 */
const generaTabla = (row, col) => {
    var tabla = '<table id="tablaRecorrido">';

    for (let fila = 0; fila < row; fila++){
        tabla += '<tr>';
        for (let columna = 0; columna < col; columna++)
            tabla += '<td></td>';

        tabla += '</tr>';
    }

    tabla += '</table>';
    return tabla;
}

/**
 * Funcion que añade una nueva tabla de resultados con la posicion actual del paso que se este dando
 * 
 * @param avioneta
 * @param airbus
 * @param f18 
 */
const addResultados = (avioneta, airbus, f18) => {
    var contenedor = document.getElementById('resultados');
    contenedor.innerHTML += '<table class="results"><caption>Paso ' + ++pasos + '</caption><tr><td><em>Avioneta</em></br><span>' + avioneta.posicionActual +  ' ' + avioneta.bonus + '</span></td><td><em>Airbus</em></br><span>' + airbus.posicionActual + ' ' + airbus.bonus + '</span></td><td><em>F18</em></br><span>' + f18.posicionActual + ' ' + f18.bonus +'</span></td></tr></table>';
}

/**
 * Funcion que prepara todo para iniciar una nueva carrera
 */
const nuevaCarrera = () => {
    limpiarCasillas();
    limpiarResultados();
    resetPasos();
    nubes = [];
    rayos = [];
    generaModificaciones(20,20);
    document.getElementById('next').disabled = false;
    document.getElementById('forward').disabled = false;

    listaAviones.forEach(avion => {
        avion.colocarInicio();
        avion.reset();
    });

    listaPodium = [];
    listaPodium.push(avioneta);
    listaPodium.push(airbus);
    listaPodium.push(f18);
}

/**
 * Funcion que realiza un nuevo paso en la carrera actualizando la posicion de los aviones en la misma
 */
const nuevoPaso = () => {
    limpiarCasillas();

    var probabilidad = Math.floor(Math.random() * 100) + 1;

    listaAviones.forEach(avion => {
        avion.nuevoMov(probabilidad);
        avion.colocarCasilla();
    });

    if(podium.PRI == '' || podium.SEC == '' || podium.TER == '')
        addResultados(avioneta, airbus, f18);

    listaPodium.forEach((avion, i) => {
        if(avion.posicionActual == meta){
            if(podium.PRI == ''){
                podium.PRI = avion.nombre;
                listaPodium.splice(i,1)
            }else if(podium.SEC == ''){
                podium.SEC = avion.nombre;
                listaPodium.splice(i,1)
            }else if(podium.TER == ''){
                podium.TER = avion.nombre;
                listaPodium.splice(i,1)
            }
        }
    });

    if(carreraHaFinalizado()){
        alert('1º: ' + podium.PRI + '\n2º: ' + podium.SEC + '\n3º: ' + podium.TER);
        podium.PRI = '';
        podium.SEC = '';
        podium.TER = '';

        document.getElementById('next').disabled = true;
        document.getElementById('forward').disabled = true;
    }         
}

/**
 * Limpia las casillas de la carrera para que no se superpongan las imagenes de los aviones
 */
const limpiarCasillas = () => {
    var celdas = document.getElementById('tablaRecorrido').getElementsByTagName('td');

    for(let celda of celdas){
        celda.innerHTML = '';
    }
}

/**
 * Limpia el contenedor donde se almacenan los resultados de cada paso de la carrera
 */
const limpiarResultados = () => {
    document.getElementById('resultados').innerHTML = '';
}

/**
 * reseta el numero de pasos realizados en la carrera
 */
const resetPasos = () => pasos = 0;


/**
 * Funcion que determina si la carrera ha finalizado o no
 * 
 * @return true si ha finalizado
 * @return false si no ha finalizado aun
 */
const carreraHaFinalizado = () => (listaAviones.reduce((acc, valor) => acc + valor.posicionActual, 0) == 750) ? true : false;


const generaModificaciones = (xNubes, xRayos) => {
    var i = 0;

    while(i < xNubes){
        nubes.push(Math.floor(Math.random() * meta) + 1);
        i++;
    }

    i = 0;

    while(i < xRayos){
        rayos.push(Math.floor(Math.random() * meta) + 1);
        i++
    }
}

const aplicaModificaciones = () => {
    for (let fila = 0; fila < 3; fila++) 
        for (let i = 0; i < tablaRecorrido.rows[fila].cells.length; i++) {
            var celdaActual = tablaRecorrido.rows[fila].cells[i];
    
            nubes.forEach(nube => {
                if(nube == i){
                    celdaActual.classList.add('nube');
                }
            })
    
            rayos.forEach(rayo => {
                if(rayo == i){
                    celdaActual.classList.add('rayo');
                }
            })
        }   
       
}