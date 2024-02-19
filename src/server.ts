
//Configurando a comunicação do lado do servidor e no arquivod html precisamos configurar a comunicação do lado do cliente

import express, { Application } from "express";
import http from 'http';
import { Server } from "socket.io";                 //Chamando o server do socket.io
class App{

    private app: Application                        //Privando métodos para não ficarem públicos por padrão
    private http: http.Server
    private io: Server

    constructor(){                                  //Pra passar algumas informações
        this.app = express()                        //Será o próprio express aqui
        this.http = http.createServer(this.app)     //Criando um servidor http, porém pede um request listener e será o próprio this.app
        this.io = new Server(this.http)             //Iniciar uma instancia do servidor do próprio socket.io com o nosso server http 
        this.listenSocket();                        // Chamando o listenSocket aqui no constructor porquê o constructor é construido sempre que a classe app é instanciada
        this.setupRoutes()
        
    }

    //Criando servidor
    // Será chamado assim que instanciar a classe app
    listenServer(){
        this.http.listen(3000, () => {
            console.log("Server is running")
        })
    }
    //Para ouvir a comunicação bidirecional
    listenSocket(){
        this.io.on("connection", (socket) => {              //Um evento chamado connection e que assim que ele se conectar, receberemos um callback chamado socket (pode ser qualquer nome) 
            console.log("User connected ", socket.id);      //Um console.log no socket porquê existem variás propriedades e métodos dentro dele, então queremos o id        

            socket.on("message", (msg) => {                 //Socket.on porquê vamos ouvir um evento 
                console.log("- File: server.ts:24 - App - socket.on - msg:", msg)   
                this.io.emit("message", msg);               //Agora emitimos o evento para onde ouvimos o evento. Agora precisamos ouvir esse evento no lado do cliente
            });
        });
    }
    //Assim que o servidor levantar, precisamos iniciar o arquivo html também, então criamos essa rota onde será direcionada ao nosso arquivod html
    setupRoutes(){
        this.app.get("/", (req,res) => {
            res.sendFile(__dirname + "/index.html")
        })
    }
}

const app = new App() // Nova instancia do app

app.listenServer() // Para iniciar o servidor 
