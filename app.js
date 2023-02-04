const imagen1 = document.getElementById('imageAparecer');
const imagen2 = document.getElementById('phone');
const imagen3 = document.getElementById('man');
const imagen4 = document.getElementById('computer');

const $form = document.getElementById("form");
const nombre = document.getElementById("name");
const email = document.getElementById("email");
const servicio = document.getElementById("servicio");
const parrafo = document.getElementById("warnings");

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle("bajar", window.scrollY > 0);
});

const cargarImagen = (entradas, observador) => {
    entradas.forEach((entrada) => {
        if(entrada.isIntersecting){
            entrada.target.classList.add('visible');
        }
    });
};

const observador = new IntersectionObserver(cargarImagen, {
    root: null,
    rootMargin:'0px 0px 0px 0px',
    threshold: 1
});


$form.addEventListener('submit', handleSubmit)

async function handleSubmit (event) {
    event.preventDefault();
    let warnings = " ";
    let entrar = false;
    let regexEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/ ;
    if (nombre.value.length < 6 ) {
        warnings += `El nombre no es valido <br>`;
        entrar = true;
    }
    if(!regexEmail.test(email.value)){
        warnings += `El correo no es valido <br>`;
        entrar = true;
    }
    if(servicio.value === ""){
        warnings += `El servicio no es valido <br>`;
        entrar = true;
    }
    if(entrar){
        parrafo.innerHTML = warnings;
    }else{
        const form = new FormData(this);
        const response = await fetch(this.action, {
        method: this.method,
        body: form,
        headers: {
            'Accept' : 'application/json'
        } 
    });
    if (response.ok){
        this.reset();
        alert("Gracias por contactar a la marca");
    }
        parrafo.innerHTML = "";
    }
};

observador.observe(imagen1);
observador.observe(imagen2);
observador.observe(imagen3);
observador.observe(imagen4);