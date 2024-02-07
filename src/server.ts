import express, { Application } from "express";
import http from 'http';
import { Server } from "socket.io";
class App{

    private app: Application
    private http: http.Server
    private io: Server

    constructor(){
        this.app = express()
        this.http = http.createServer(this.app)
        this.io = new Server(this.http)
        this.listenSocket();
        
    }
    listenServer(){
        this.http.listen(3000, () => {
            console.log("Server is running")
        })
    }
    listenSocket(){
        this.io.on("connection", (socket) => {
            console.log("User connected ", socket.id)
        })
    }
}

const app = new App()

app.listenServer()
