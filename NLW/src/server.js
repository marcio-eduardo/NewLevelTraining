const express = require("express")
const server = express()

//configurar pasta publica
server.use(express.static("NLW/public"))

//configurar caminhos da minha aplicação
//pagina inicial
//req: requisição
//res: resposta
server.get("/", (req, res) => {
    //res.send("Hello World!")
    res.sendFile(__dirname + "/views/index.html")
})

//ligar o servidor
server.listen(3000)