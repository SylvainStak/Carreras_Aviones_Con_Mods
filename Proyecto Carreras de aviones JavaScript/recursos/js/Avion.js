class Avion{
    constructor(nombre, imagen, vTurbo, vNormal, vProblema,
                limitTurbo, limitNormal, lineaCarrera){

        this.nombre = nombre;
        this.imagen = imagen;
        this.posicionActual = 0;
        this.posicionInicio = 0;
        this.vTurbo = vTurbo;
        this.vNormal = vNormal;
        this.vProblema = vProblema;
        this.limitTurbo = limitTurbo;
        this.limitNormal = limitNormal;
        this.lineaCarrera = lineaCarrera;
        this.bonus = '';
    }

    colocarInicio(){
        this.lineaCarrera.cells[0].innerHTML = '<img src="'+ this.imagen + '" alt="imagen avion">';
    }

    nuevoMov(probabilidad){
        var mod = 0;
        this.bonus = '';

        

        if (this.posicionActual < this.lineaCarrera.cells.length){
            if (probabilidad <= this.limitTurbo)
                (this.posicionActual + this.vTurbo >= meta) ? this.posicionActual = meta : this.posicionActual += this.vTurbo;
            else if (probabilidad <= this.limitNormal)
                (this.posicionActual + this.vNormal >= meta) ? this.posicionActual = meta : this.posicionActual += this.vNormal;
            else if (this.posicionActual + this.vProblema > 0)
                if(this.posicionActual != meta)
                    this.posicionActual += this.vProblema;
        }
        
        nubes.forEach(nube => {
            if(this.posicionActual == nube){
                this.posicionActual += 3;
                this.bonus = 'nube';
                console.log(this.nombre.toUpperCase() + ' Ha pasado por una nube');
            }
        });

        rayos.forEach(rayo => {
            if(this.posicionActual == rayo){
                this.posicionActual -= 4;
                this.bonus = 'rayo';
                console.log(this.nombre.toUpperCase() + ' Ha sido aturdido por un rayo');
            }
        });        
    }    

    colocarCasilla(){
        if(this.posicionActual < this.lineaCarrera.cells.length)
            this.lineaCarrera.cells[this.posicionActual].innerHTML = '<img src="'+ this.imagen + '" alt="imagen avion">';
        else
            this.lineaCarrera.cells[this.lineaCarrera.cells.length-1].innerHTML = '<img src="'+ this.imagen + '" alt="imagen avion">';
    }

    reset(){
        this.posicionActual = 0;
    }
}