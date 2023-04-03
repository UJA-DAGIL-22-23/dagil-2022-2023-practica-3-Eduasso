/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

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
            <th width="10%">Id</th><th width="20%">Nombre</th><th width="20%">Fecha Nacimiento</th><th width="10%">País</th>
            <th width="15%">Grandes Cumbres alcanzadas</th><th width="25%">Picos 8Km</th>
        </thead>
        <tbody>
            <tr title="${Plantilla.plantillaTags.ID}">
                <td><input type="text" class="form-persona-elemento" disabled id="form-persona-id"
                        value="${Plantilla.plantillaTags.ID}" 
                        name="id_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-nombre" required value="${Plantilla.plantillaTags.NOMBRE}" 
                        name="nombre_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-apellidos" value="${Plantilla.plantillaTags.FECHA.DIA}/${Plantilla.plantillaTags.FECHA.MES}/${Plantilla.plantillaTags.FECHA.ANIO}" 
                        name="fecha_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-email" required value="${Plantilla.plantillaTags.PAIS}" 
                        name="pais_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-anio" required
                        value="${Plantilla.plantillaTags.CUMBRES}" 
                        name="cumbres_escaladas"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-email" required value="${Plantilla.plantillaTags["PICOS 8KM"]}" 
                        name="picos_8km"/></td>
                
            </tr>
        </tbody>
    </table>
</form>
`;

/// Plantilla para poner los datos de varias personas dentro de una tabla
Plantilla.plantillaTablaPersonas = {}

// Cabecera de la tabla
Plantilla.plantillaTablaPersonas.cabecera = `<table width="100%" class="listado-personas">
                    <thead>
                        <th width="10%">ID</th>
                        <th width="10%">Nombre</th>
                        <th width="20%">Fecha de nacimiento</th>
                        <th width="20%">Pais de nacimiento</th>
                        <th width="30%">Grandes Cumbres Alcanzadas</th>
                        <th width="10%">Picos 8km</th>
                    </thead>
                    <tbody>
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
    Frontend.Article.actualizar("Listado de persona", msj)
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
    Plantilla.recupera(Plantilla.imprimeMuchasPersonas);
}

/**
 * Función principal para mostrar los datos de una persona desde el MS y, posteriormente, imprimirla.
 * @param {String} idPersona Identificador de la persona a mostrar
 */
Plantilla.mostrar = function (idPersona) {
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
}