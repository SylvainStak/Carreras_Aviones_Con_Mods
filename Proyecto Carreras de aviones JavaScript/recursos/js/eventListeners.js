//boton paso a paso
document.getElementById("next").addEventListener("click", () => {
  nuevoPaso();
});

//boton nueva carrera
document.getElementById("new").addEventListener("click", () => {
  nuevaCarrera();
});

//boton carrera automatica
document.getElementById("forward").addEventListener("click", () => {
  do {
    nuevoPaso();
  } while (!carreraHaFinalizado());
});


//Bindeos de teclas a los botones
var input = document.getElementsByTagName("body")[0];

input.addEventListener("keyup", event => {
  if (event.keyCode === 88) {
    event.preventDefault();
    document.getElementById("next").click();
  } else if (event.keyCode === 70) {
    event.preventDefault();
    document.getElementById("forward").click();
  } else if (event.keyCode === 78) {
    event.preventDefault();
    document.getElementById("new").click();
  }
});