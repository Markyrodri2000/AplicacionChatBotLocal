const chat = document.querySelector(".chat-messages")
const header = document.querySelector(".chat-header")
const aplicar = document.querySelector(".send-style")
const restablecer = document.querySelector(".restablecer-style")
const abrir_descargar = document.querySelector(".widget")
const guardar = document.querySelector(".guardar")
const entregar = document.querySelector(".entregar")
const validar = document.querySelector(".validar_key")
const descargar = document.querySelector(".entregar_codigo")
const copiar = document.querySelector(".copiar")
const cerrar = document.querySelector(".cerrar")
const guardar_desp = document.querySelector(".guardar_desp")
const cerrar_guardar = document.querySelector(".cerrar-guardar")
const mis_chats = document.querySelector(".mis-chats")
const entrenar = document.querySelector(".train")
const probar = document.querySelector(".probar")
const restablecer_chat = document.querySelector(".restablecer-chat")

const input_titulo = document.querySelector(".tit")
const input_nombre = document.querySelector(".nombre_chat")
const color_fondo = document.querySelector(".color-fondo")
const color_nav = document.querySelector(".color-nav")
const color_servidor = document.querySelector(".color-servidor")
const color_cliente = document.querySelector(".color-cliente")
const color_fuente = document.querySelector(".color-fuente")

function cambiar(titulo,nombre,color_f,color_n,color_s,color_c,fuente){
    if(titulo!=""){
        const actual = document.querySelector(".chat-header h2")
        actual.innerHTML = titulo
        const input_titulo = document.querySelector(".tit")
        input_titulo.value = ""
        input_titulo.placeholder = titulo
    }

    if(nombre!=""){
        const chat = document.querySelector(".chat-messages")
        const actual = chat.querySelector("li text")
        actual.innerHTML = nombre
        const input_nombre = document.querySelector(".nombre_chat")
        input_nombre.value = ""
        input_nombre.placeholder = nombre
    }
    if(color_f !="#DB930B"){
        const chat = document.querySelector(".chat-messages")
        chat.style.backgroundColor = color_f
        const color_fondo = document.querySelector(".formulario1 .color-fondo")
        color_fondo.value = color_f
    }
    if(color_n !="#ffa500"){
        const header = document.querySelector(".chat-header")
        header.style.backgroundColor = color_n
        const color_nav = document.querySelector(".color-nav")
        color_nav.value = color_n
    }
    if(color_s !="#e0e0e0"){
        const serv = document.querySelectorAll(".servidor")
        serv.forEach(s => {
            s.style.backgroundColor = color_s
        })
        const color_servidor = document.querySelector(".color-servidor")
        color_servidor.value = color_s
    }
    if(color_c !="#eea74a"){
        const cli = document.querySelectorAll(".cliente")
        cli.forEach(c => {
            c.style.backgroundColor = color_c
        })
        const color_cliente = document.querySelector(".color-cliente")
        color_cliente.value = color_c
    }
    if(fuente !="#000000"){
        const chat = document.querySelector(".chat-messages")
        const header = document.querySelector(".chat-header")
        chat.style.color = fuente
        header.style.color = fuente
        const color_fuente = document.querySelector(".color-fuente")
        color_fuente.value = fuente
    }

}
function cod_aplicar(){
    cambiar(input_titulo.value,input_nombre.value,color_fondo.value,color_nav.value,color_servidor.value,color_cliente.value,color_fuente.value)
    widget_cambiar_dinamicamente()
    if(sessionStorage.getItem(nombre+"session")=== "activa"){
        const chat_guardar = document.querySelector(".actualizar_pagina").innerHTML
        sessionStorage.setItem(nombre,chat_guardar)
    }
}
aplicar.addEventListener('click', () => {
    cod_aplicar()
})

restablecer.addEventListener('click', () => {
    const actual = document.querySelector(".chat-header h2")
    actual.innerHTML = "ChatBot"
    const input_titulo = document.querySelector(".tit")
    input_titulo.value = ""
    input_titulo.placeholder = "ChatBot"

    const messages = document.querySelector(".chat-messages")
    const act = messages.querySelector("li text")
    act.innerHTML = "Alexa"
    const input_nombre = document.querySelector(".nombre_chat")
    input_nombre.value = ""
    input_nombre.placeholder = "Alexa"

    messages.style.backgroundColor = "#d3b378"
    const color_fondo = document.querySelector(".formulario1 .color-fondo")
    color_fondo.value = "#d3b378"

    const header = document.querySelector(".chat-header")
    header.style.backgroundColor = "#ffa500"
    const color_nav = document.querySelector(".formulario1 .color-nav")
    color_nav.value = "#ffa500"

    const color_servidor = document.querySelector(".formulario1 .color-servidor")
    color_servidor.value = "#e0e0e0"
    const serv = document.querySelectorAll(".servidor")
    serv.forEach(s => {
        s.style.backgroundColor = "#e0e0e0"
    })

    const color_cliente = document.querySelector(".formulario1 .color-cliente")
    color_cliente.value = "#eea74a"
    const cli = document.querySelectorAll(".cliente")
    cli.forEach(c => {
        c.style.backgroundColor = "#eea74a"
    })

    messages.style.color = "#000000"
    header.style.color = "#000000"
    const color_fuente = document.querySelector(".formulario1 .color-fuente")
    color_fuente.value = "#000000"
    widget_cambiar_dinamicamente()
    if(sessionStorage.getItem(nombre+"session")=== "activa"){
        const chat_guardar = document.querySelector(".actualizar_pagina").innerHTML
        sessionStorage.setItem(nombre,chat_guardar)
    }
})
function widget_cambiar_dinamicamente(){
    if(probar.textContent == "Deshabilitar Widget"){
        const indice = document.querySelector("body")
        const estilos = document.querySelector("#iframe_style")
        const frame = document.querySelector("#widget")
        const boton = document.querySelector(".abrir_cerrar_widget")
        const scr = document.querySelector("#widget_script")
        estilos.remove()
        frame.remove()
        boton.remove()
        scr.remove()
    
        fetch("http://localhost:3000/widget",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: document.querySelector(".chat-header h2").textContent,
                nombre: chat.querySelector("li text").textContent,
                color_fondo: color_fondo.value,
                color_nav: color_nav.value,
                color_servidor: color_servidor.value,
                color_cliente: color_cliente.value,
                color_fuente: color_fuente.value
            })
        }).then(
            response => response.json()
        ).then(data=>{
            const link_code = document.createElement("link")
            link_code.id="iframe_style"
            link_code.rel = "stylesheet"
            link_code.href = "http://localhost:3000" + data.link_estilos

            const frame = document.createElement("iframe")
            frame.id = "widget"
            frame.src = "http://localhost:3000" + data.link_iframe

            const boton = document.createElement("button")
            boton.id = "abrir"
            boton.className = "abrir_cerrar_widget"
            boton.style.backgroundColor = data.boton_fondo

            const imagen = document.createElement("img")
            imagen.src = "http://localhost:3000/widget/comment.png"

            boton.appendChild(imagen)

            const scr = document.createElement("script")
            scr.id = "widget_script"
            scr.src = "http://localhost:3000"+data.link_script
            scr.defer
            
            indice.appendChild(link_code)
            setTimeout(function(){
                indice.appendChild(boton)
                indice.appendChild(frame)
                indice.appendChild(scr)
            },10)
        })
    }
}
probar.addEventListener('click', () => {
    const indice = document.querySelector("body")
    if(probar.textContent == "Probar Widget"){
        fetch("http://localhost:3000/widget",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: document.querySelector(".chat-header h2").textContent,
                nombre: chat.querySelector("li text").textContent,
                color_fondo: color_fondo.value,
                color_nav: color_nav.value,
                color_servidor: color_servidor.value,
                color_cliente: color_cliente.value,
                color_fuente: color_fuente.value
            })
        }).then(
            response => response.json()
        ).then(data=>{
            const link_code = document.createElement("link")
            link_code.id="iframe_style"
            link_code.rel = "stylesheet"
            link_code.href = "http://localhost:3000" + data.link_estilos

            const frame = document.createElement("iframe")
            frame.id = "widget"
            frame.src = "http://localhost:3000" + data.link_iframe

            const boton = document.createElement("button")
            boton.id = "abrir"
            boton.className = "abrir_cerrar_widget"
            boton.style.backgroundColor = data.boton_fondo

            const imagen = document.createElement("img")
            imagen.src = "http://localhost:3000/widget/comment.png"

            boton.appendChild(imagen)

            const scr = document.createElement("script")
            scr.id = "widget_script"
            scr.src = "http://localhost:3000"+data.link_script
            scr.defer

            indice.appendChild(link_code)
            setTimeout(function(){
                indice.appendChild(boton)
                indice.appendChild(frame)
                indice.appendChild(scr)
            },10)
            probar.textContent = "Deshabilitar Widget"
        })
    }
    else{
        const estilos = document.querySelector("#iframe_style")
        const frame = document.querySelector("#widget")
        const boton = document.querySelector(".abrir_cerrar_widget")
        const scr = document.querySelector("#widget_script")
        estilos.remove()
        frame.remove()
        boton.remove()
        scr.remove()
        probar.textContent = "Probar Widget"
    }
})
abrir_descargar.addEventListener('click', () => {
    entregar.style.display = "block" 
    validar.addEventListener('click', () => {
        fetch("http://localhost:3000/validar_token",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key: document.querySelector(".api_key_validar").value,
            })
        }).then(
            response => response.json()
        ).then(data=>{
            if(data.res == "Token valido"){
                descargar_widget()
            }else{
                const error = document.querySelector(".error_key")
                error.textContent = "Token no válido"
            }
        })
    })
    cerrar.addEventListener('click', () => {
        entregar.style.display = "none"
    })
})

function descargar_widget(){
    fetch("http://localhost:3000/widget",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo: document.querySelector(".chat-header h2").textContent,
            nombre: chat.querySelector("li text").textContent,
            color_fondo: color_fondo.value,
            color_nav: color_nav.value,
            color_servidor: color_servidor.value,
            color_cliente: color_cliente.value,
            color_fuente: color_fuente.value
        })
    }).then(
        response => response.json()
    ).then(data=>{
        const link = "<link rel="+"stylesheet"+" href=http://localhost:3000"+data.link_estilos+">"
        const boton = "<button id="+'"abrir"'+" class="+'"abrir_cerrar_widget" style="background-color:'+data.boton_fondo+'">'+"<img src=http://localhost:3000/widget/comment.png></button>"
        const script = "<script src=http://localhost:3000"+data.link_script+" defer></script>"
        const link2 = "<iframe id="+"widget "+"src=http://localhost:3000"+data.link_iframe+">"
        const cierre = "</iframe>"

        const lin = document.querySelector(".entregar_codigo textarea")
        lin.value = link + "\n" + boton + "\n" + script + "\n" + link2 + "\n" + cierre
        descargar.style.display = "block"
        copiar.addEventListener('click', () => {
            lin.select()
            document.execCommand("copy")
        })
        validar.remove()
    })
}
guardar.addEventListener('click', () => {
    const titulo = document.querySelector("h2").textContent
    guardar_chat(titulo,"guardar")
})

function guardar_chat(titulo,state){
    
    let links = document.querySelectorAll(".link")
    fetch("http://localhost:8000/mensajes",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            id: sessionStorage.getItem(nombre+ "Contador")
        })
    })
    .then(response => response.json())
    .then(messages => {
        var mensajes = JSON.stringify(messages)

        let links_values = 0
        for(i=0;i<links.length;i++){
            if(links[0].value !== "") {
                links_values++
            }
        }
        if(links_values===0){
            links = ""
        }
        else{
            links = sessionStorage.getItem(nombre+"Links")
        }
        console.log(links)
        fetch("http://localhost:3000/guardar_chat", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                codigo: sessionStorage.getItem(nombre),
                nombre: titulo,
                estado: state,
                modelo: sessionStorage.getItem(nombre + "Modelo"),
                temperatura: sessionStorage.getItem(nombre + "Temperatura"),
                promptt: sessionStorage.getItem(nombre + "Prompt"),
                idioma: sessionStorage.getItem(nombre + "Idioma"),
                links: links,
            })
        })
        .then(response2 => response2.json())
        .then(data => {
            if (data.respuesta == "Existe") {
                const existe = document.querySelector(".existente")
                existe.style.display = "block"
                const cerrar = document.querySelector(".cerrar_guardar")
                cerrar.addEventListener('click', () => {
                    existe.style.display = "none"
                })
                const mostrar_input = document.querySelector(".guardar_otro_nombre")
                const sobreescribir = document.querySelector(".sobreescribir")
                mostrar_input.addEventListener('click', () => {
                    const input = document.querySelector(".otro_nombre")
                    input.placeholder = titulo
                    input.style.display = "block"

                    const guardar = document.querySelector(".Guardar")
                    const cancelar = document.querySelector(".Cancelar")

                    sobreescribir.style.display = "none"
                    mostrar_input.style.display = "none"
                    guardar.style.display = "block"
                    cancelar.style.display = "block"

                    cancelar.addEventListener('click', () => {
                        sobreescribir.style.display = "block"
                        mostrar_input.style.display = "block"
                        guardar.style.display = "none"
                        cancelar.style.display = "none"
                        input.style.display = "none"

                        mostrar_input.style.marginLeft = "120px"
                        mostrar_input.style.marginTop = "-35px"
                    })
                    guardar.addEventListener('click', () => {
                        guardar_chat(input.value, "guardar")
                    })
                })
                sobreescribir.addEventListener('click', () => {
                    guardar_chat(titulo, "sobreescribir")
                })
            }
            if (data.respuesta == "Guardado") {
                const existe = document.querySelector(".existente")
                existe.style.display = "none"
                guardar_desp.style.display = "block"
                setTimeout(() => {
                    guardar_desp.style.display = "none"
                }, 1000)
                
                fetch("http://localhost:3000/get_id",{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        nombre: titulo,
                    })
                })
                .then(response => response.json())
                .then(data => {
                    const id_antiguo = sessionStorage.getItem(nombre+"Contador")
                    sessionStorage.setItem(nombre+"Contador",String(data.id))

                    fetch("http://localhost:8000/set_id",{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            {
                                id_antiguo: id_antiguo,
                                id: sessionStorage.getItem(nombre+"Contador")
                            }
                        )
                    })
                })
                return true
            }
        })
    })


}
restablecer_chat.addEventListener("click", function(event) {
    const chats = document.querySelector(".chat-messages")
    const [primero, segundo] = chats.querySelectorAll("li")
    
    chats.innerHTML = `
        ${primero.outerHTML}
        ${segundo.outerHTML}
    `

    if(sessionStorage.getItem(nombre+"session")=== "activa"){
        const chat_guardar = document.querySelector(".actualizar_pagina").innerHTML
        sessionStorage.setItem(nombre,chat_guardar)
    }

    fetch("http://localhost:8000/restablecer_chat",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                id:sessionStorage.getItem(nombre+"Contador")
            }
        )
    })

});