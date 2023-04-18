/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

let TodasPersonas = null;
let pos = null;

Plantilla.formBusqueda = {
    busqueda: "form-busqueda"    
}


/// Nombre de los campos del formulario para editar una persona
Plantilla.form = {
    NOMBRE: "form-persona-nombre",
    DIA: "form-persona-dia", 
    MES: "form-persona-mes", 
    ANIO: "form-persona-anio" ,
    PAIS: "form-persona-pais",
    CUMBRES: "form-persona-cumbres",
    PICOS_8KM: "form-persona-picos_8km",
}

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}

/// Objeto para almacenar los datos de la persona que se está mostrando
Plantilla.personaMostrada = null

// Tags que voy a usar para sustituir los campos
Plantilla.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "FECHA": {"DIA": "### DIA ###", "MES": "### MES ###", "ANIO": "### ANIO ###"},
    "PAIS": "### PAIS ###",
    "CUMBRES": "### CUMBRES ###",
    "PICOS 8KM": "### PICOS_8KM ###"
}

/// Plantilla para poner los datos de una persona en un tabla dentro de un formulario
Plantilla.plantillaFormularioPersona = {}


// Cabecera del formulario
Plantilla.plantillaFormularioPersona.formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-personas">
        <thead>
            <th width="10%">Id</th><th width="15%">Nombre</th><th width="10%">Dia</th><th width="10%">Mes</th><th width="10%">Año</th><th width="10%">País</th>
            <th width="15%">Grandes Cumbres alcanzadas</th><th width="20%">Picos 8Km</th><th width="10%"></th>
        </thead>
        <tbody>
            <tr title="${Plantilla.plantillaTags.ID}">
                <td><input type="text" class="form-persona-elemento" disabled id="form-persona-id"
                        value="${Plantilla.plantillaTags.ID}" 
                        name="id_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-nombre" required value="${Plantilla.plantillaTags.NOMBRE}" 
                        name="nombre_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-dia" value="${Plantilla.plantillaTags.FECHA.DIA}" 
                        name="dia_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-mes" value="${Plantilla.plantillaTags.FECHA.MES}" 
                        name="mes_persona"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-anio" value="${Plantilla.plantillaTags.FECHA.ANIO}" 
                        name="anio_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-pais" required value="${Plantilla.plantillaTags.PAIS}" 
                        name="pais_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-cumbres" required
                        value="${Plantilla.plantillaTags.CUMBRES}" 
                        name="cumbres_escaladas"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-picos_8km" required value="${Plantilla.plantillaTags["PICOS 8KM"]}" 
                        name="picos_8km"/></td>
                <td>
                    <div><a href="javascript:Plantilla.editar()" class="opcion-secundaria mostrar">Editar</a></div>
                    <div><a href="javascript:Plantilla.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Plantilla.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                </td>
            </tr>
        </tbody>
    </table>
    <center><div><a href="javascript:Plantilla.siguiente(false)" class="opcion-secundaria mostrar">Anterior</a>
                <a href="javascript:Plantilla.siguiente(true)" class="opcion-secundaria mostrar">Siguiente</a></div></center>
</form>
`;

/// Plantilla para poner los datos de varias personas dentro de una tabla
Plantilla.plantillaTablaPersonas = {}

// Cabecera de la tabla
Plantilla.plantillaTablaPersonas.cabecera = `
            <form method='post' action=''>
                <input type="text" value="" id="form-busqueda"/> 
                <div><a href="javascript:Plantilla.listarBusqueda()" class="opcion-secundaria mostrar">Buscar</a></div>
            </form>
                <table width="100%" class="listado-personas">
                    <thead>
                        <th width="10%">ID</th>
                        <th width="10%">Nombre</th>
                        <th width="20%">Fecha de nacimiento</th>
                        <th width="20%">Pais de nacimiento</th>
                        <th width="30%">Grandes Cumbres Alcanzadas</th>
                        <th width="10%">Picos 8km</th>
                        <th width="10%"></th>
                    </thead>
                    <tbody>
    `;

// Cabecera de la tabla de nombres
Plantilla.plantillaTablaPersonas.cabeceraNombres = `<table width="100%" class="listado-personas">
<thead>
    <th width="10%">Nombre</th>
</thead>
<tbody>
<center><div><a href="javascript:Plantilla.listarOrdenados()" class="opcion-secundaria mostrar">Ordenar</a></div></center>
`;

// Elemento TR que muestra los datos de una persona
Plantilla.plantillaTablaPersonas.cuerpo = `
    <tr title="${Plantilla.plantillaTags.ID}">
        <td>${Plantilla.plantillaTags.ID}</td>
        <td>${Plantilla.plantillaTags.NOMBRE}</td>
        <td>${Plantilla.plantillaTags.FECHA.DIA}/${Plantilla.plantillaTags.FECHA.MES}/${Plantilla.plantillaTags.FECHA.ANIO}</td>
        <td>${Plantilla.plantillaTags.PAIS}</td>
        <td>${Plantilla.plantillaTags.CUMBRES}</td>
        <td>${Plantilla.plantillaTags["PICOS 8KM"]}</td>
        <td>
                    <div><a href="javascript:Plantilla.mostrar('${Plantilla.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>
    `;

// Elemento TR que muestra los datos de una persona
Plantilla.plantillaTablaPersonas.cuerpoNombres = `
    <tr title="${Plantilla.plantillaTags.NOMBRE}">
        <td>${Plantilla.plantillaTags.NOMBRE}</td>
    </tr>
    `;

// Pie de la tabla
Plantilla.plantillaTablaPersonas.pie = `        </tbody>
             </table>
             `;

/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}

/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */           
Plantilla.sustituyeTags = function (plantilla, persona) {
    //console.log(persona)
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), persona.data.Nombre)
        .replace(new RegExp(Plantilla.plantillaTags.FECHA.DIA, 'g'), persona.data.Fecha_nacimiento.Dia)
        .replace(new RegExp(Plantilla.plantillaTags.FECHA.MES, 'g'), persona.data.Fecha_nacimiento.Mes)
        .replace(new RegExp(Plantilla.plantillaTags.FECHA.ANIO, 'g'), persona.data.Fecha_nacimiento.Año)
        .replace(new RegExp(Plantilla.plantillaTags.PAIS, 'g'), persona.data.País)
        .replace(new RegExp(Plantilla.plantillaTags.CUMBRES, 'g'), persona.data.Grandes_Cumbre)
        .replace(new RegExp(Plantilla.plantillaTags["PICOS 8KM"], 'g'), persona.data.cantidad_picos_8km)
}

/**
 * Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Plantilla.plantillaTablaPersonas.actualiza = function (persona) {
    return Plantilla.sustituyeTags(this.cuerpo, persona)
}

/**
 * Actualiza el cuerpo de la tabla con los nombres ordenados que se le pasa
 * @param {Persona} Persona Objeto con los nombres que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Plantilla.plantillaTablaPersonas.actualizaNombres = function (persona) {
    return Plantilla.sustituyeTags(this.cuerpoNombres, persona)
}

/**
 * Actualiza el formulario con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Plantilla.plantillaFormularioPersona.actualiza = function (persona) {
    return Plantilla.sustituyeTags(this.formulario, persona)
}

/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

Plantilla.recupera = async function (callBackFn){
    let response = null

    //Intento conectar con el microservicio personas
    try{
        const url = Frontend.API_GATEWAY + "/plantilla/getTodas"
        response = await fetch(url)
    }catch(error){
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    //Muestro todas las personas que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        TodasPersonas = vectorPersonas
        callBackFn(vectorPersonas.data)
    }
}

/**
 * Función que recuperar todas las personas llamando al MS Personas. 
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idPersona Identificador de la persona a mostrar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.recuperaUnaPersona = async function (idPersona, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getPorId/" + idPersona
        const response = await fetch(url);
        if (response) {
            const persona = await response.json()
            callBackFn(persona)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}

/**
 * Imprime los datos de una persona como una tabla dentro de un formulario usando la plantilla del formulario.
 * @param {persona} Persona Objeto con los datos de la persona
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Plantilla.personaComoFormulario = function (persona) {
    return Plantilla.plantillaFormularioPersona.actualiza( persona );
}

/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */

Plantilla.imprimeMuchasPersonas = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaPersonas.cabecera
    
    vector.forEach(e => msj += Plantilla.plantillaTablaPersonas.actualiza(e))
    msj += Plantilla.plantillaTablaPersonas.pie

    //Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas", msj)
}

/**
 * Función para mostrar en pantalla todas las personas que cumplen con el requisito de busqueda.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */
Plantilla.imprimePersonasBusqueda = function (vector, buscar) {
    // console.log(vector) // Para comprobar lo que hay en vector
    let vectorBusqueda = []
    let vectorBusquedaMostrar = {
        data: []
    }
    //console.log("La busqueda es: ", document.getElementById("form-busqueda").value)
    buscar = buscar || document.getElementById("form-busqueda").value
    for(let i = 0; i < vector.length; ++i){
        if(vector[i].data.Nombre.includes(buscar)){
            vectorBusqueda.push(vector[i])
            vectorBusquedaMostrar.data.push(vector[i])
        }
    }
    TodasPersonas = vectorBusquedaMostrar
    console.log("Vector que coinciden con los nombres: ", vectorBusqueda)
    // Compongo el contenido que se va a mostrar dentro de la tabla
    
    let msj = Plantilla.plantillaTablaPersonas.cabecera
    
    vectorBusqueda.forEach(e => msj += Plantilla.plantillaTablaPersonas.actualiza(e))
    msj += Plantilla.plantillaTablaPersonas.pie

    //Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Resultado de la Búsqueda", msj)
    return vectorBusqueda
}

/**
 * Función para mostrar en pantalla todas lo nombres ordenados alfabéticamente que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */

Plantilla.imprimeNombresOrdenados = function(vector) {
    //console.log(vector) // Para comprobar lo que hay en vector
     
    vector.sort((a, b) => {
        if (a.data.Nombre == b.data.Nombre) {
          return 0;
        }
        if (a.data.Nombre < b.data.Nombre) {
          return -1;
        }
        return 1;
      });
      
    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaPersonas.cabeceraNombres
    
    vector.forEach(e => msj += Plantilla.plantillaTablaPersonas.actualizaNombres(e))
    msj += Plantilla.plantillaTablaPersonas.pie

    //Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Nombres de personas ordenadas alfabéticamente", msj)
}

Plantilla.imprimeNombres = function(vector) {
    let msj = Plantilla.plantillaTablaPersonas.cabeceraNombres
    
    vector.forEach(e => msj += Plantilla.plantillaTablaPersonas.actualizaNombres(e))
    msj += Plantilla.plantillaTablaPersonas.pie

    //Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Nombres de personas", msj)
}

/**
 * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
 * @param {Persona} persona Datos de la persona a mostrar
 */

Plantilla.imprimeUnaPersona = function (persona) {
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = Plantilla.personaComoFormulario(persona);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Plantilla.almacenaDatos(persona)
}

/**
 * Almacena los datos de la persona que se está mostrando
 * @param {Persona} persona Datos de la persona a almacenar
 */

Plantilla.almacenaDatos = function (persona) {
    Plantilla.personaMostrada = persona;
}

/**
 * Recupera los valores almacenados de la persona que se estaba mostrando
 * @return Datos de la persona a almacenada
 */

Plantilla.recuperaDatosAlmacenados = function () {
    return this.personaMostrada;
}

/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}

/**
 * Función principal para recuperar las personas desde el MS y, posteriormente, imprimirlas.
 */
Plantilla.listar = function (){
    //console.log("La busqueda es:",document.getElementById("form-busqueda").value)
    Plantilla.recupera(Plantilla.imprimeMuchasPersonas);
}

Plantilla.listarBusqueda = function (){
    Plantilla.recupera(Plantilla.imprimePersonasBusqueda);
}

Plantilla.listarNombres = function (){
    Plantilla.recupera(Plantilla.imprimeNombres)
}

/**
 * Función principal para recuperar las personas desde el MS y, ordenarlas por nombre e imprimirlas.
 */
Plantilla.listarOrdenados = function (){
    Plantilla.recupera(Plantilla.imprimeNombresOrdenados);
}

/**
 * Función principal para mostrar los datos de una persona desde el MS y, posteriormente, imprimirla.
 * @param {String} idPersona Identificador de la persona a mostrar
 */
Plantilla.mostrar = function (idPersona) {
    for (let i = 0; i < TodasPersonas.data.length; i++) {
        //console.log(TodasPersonas.data[i].ref['@ref'].id);
        if(TodasPersonas.data[i].ref['@ref'].id == idPersona){
            pos = i;
        }
    }
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
}

/**
 * Función principal para visualizar el siguiente/anterior jugador.
 * @param {Boolean} siguiente Valor para saber si avanza o retrocede
 */
Plantilla.siguiente = function (siguiente) {
    if(siguiente){
        pos = (pos + 1) % TodasPersonas.data.length;
    }else{
        pos = pos - 1;
        if(pos < 0){
            pos = TodasPersonas.data.length - 1;
        }
    }
    let idPersona = TodasPersonas.data[pos].ref['@ref'].id;
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
}

/**
 * Establece disable = habilitando en los campos editables
 * @param {boolean} Deshabilitando Indica si queremos deshabilitar o habilitar los campos
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Plantilla.habilitarDeshabilitarCamposEditables = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    for (let campo in Plantilla.form) {
        document.getElementById(Plantilla.form[campo]).disabled = deshabilitando
    }
    return this
}

/**
 * Establece disable = true en los campos editables
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Plantilla.deshabilitarCamposEditables = function () {
    Plantilla.habilitarDeshabilitarCamposEditables(true)
    return this
}

/**
 * Establece disable = false en los campos editables
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Plantilla.habilitarCamposEditables = function () {
    Plantilla.habilitarDeshabilitarCamposEditables(false)
    return this
}

/**
 * ????Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Plantilla.opcionesMostrarOcultar = function (classname, mostrando) {
    let opciones = document.getElementsByClassName(classname)
    let claseQuitar = mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR
    let claseAniadir = !mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR

    for (let i = 0; i < opciones.length; ++i) {
        Frontend.quitarClase(opciones[i], claseQuitar)
            .aniadirClase(opciones[i], claseAniadir)
    }
    return this
}

/**
 * Oculta todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Plantilla.ocultarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", false)
    return this
}

/**
 * Muestra todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Plantilla.mostrarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", true)
    return this
}


/**
 * Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Plantilla.mostrarOpcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", true)
    return this
}

/**
 * Oculta las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Plantilla.ocultarOpcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", false)
    return this
}

/**
 * Función que permite modificar los datos de una persona
 */
Plantilla.editar = function () {
    this.ocultarOpcionesSecundarias()
    this.mostrarOpcionesTerciariasEditar()
    this.habilitarCamposEditables()
}

/**
 * Función que permite cancelar la acción sobre los datos de una persona
 */
Plantilla.cancelar = function () {
    this.imprimeUnaPersona(this.recuperaDatosAlmacenados())
    this.deshabilitarCamposEditables()
    this.ocultarOpcionesTerciariasEditar()
    this.mostrarOpcionesSecundarias()
}

/**
 * Función para guardar los nuevos datos de una persona
 */
Plantilla.guardar = async function () {
    try {
        let url = Frontend.API_GATEWAY + "/plantilla/setTodo/"
        let id_persona = document.getElementById("form-persona-id").value
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                "id_persona": id_persona,
                "nombre_persona": document.getElementById("form-persona-nombre").value,
                "dia_persona":  parseInt(document.getElementById("form-persona-dia").value),
                "mes_persona":  parseInt(document.getElementById("form-persona-mes").value),
                "anio_persona":  parseInt(document.getElementById("form-persona-anio").value),
                "pais_persona": document.getElementById("form-persona-pais").value,
                "cumbres_escaladas": document.getElementById("form-persona-cumbres").value.split(','),
                "picos_8km": parseInt(document.getElementById("form-persona-picos_8km").value)
            }), // body data type must match "Content-Type" header
        })
        /*
        Error: No procesa bien la respuesta devuelta
        if (response) {
            const persona = await response.json()
            alert(persona)
        }
        */
        Plantilla.mostrar(id_persona)
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}