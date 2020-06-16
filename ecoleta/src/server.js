const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db")


// configurar pasta pública, agora toda vez ele vai olhar para pasta
// public e ir para meus arquivos.css
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true}))

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server, 
    noCache: true 
})

//configurar caminhos da minha aplicação
//página inicial
// req: Requisição
// res: Resposta
server.get("/", function(req, res) {
     return res.render("index.html")
})

server.get("/create-point", function(req, res) {

    //re.query: Query Strings da nossa urls
    // console.log(req.query), // Teste

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    
    //req.body: O corpo do nosse formulário
    //console.log(req.body), teste

    //inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items      
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items,

    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Register Error DamyYYYYY!!!!")
        } else {
            console.log("Success Login")
            console.log(this)
        }

        return res.render("create-point.html", { saved: true })
    }
    

    db.run(query, values, afterInsertData)
    
})




server.get("/search-results", function(req, res) {

    const search = req.query.search

    if(search == ""){
        //pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }



    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        } else {
            const total = rows.length

            console.log("Here you are your data")
            console.log(rows)
            // mostrar a página html com os dados do banco de dados
            return res.render("search-results.html", { places: rows, total: total })
        }
    })
    
})

// ligar o servidor
server.listen(3000)
