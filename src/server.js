// Import Modules
const express = require("express");
const server = express();
const db = require("./database/db.js");

// Defining the 'public' folder as the public path
server.use(express.static("public"));

// Enable data usage with json
server.use(express.urlencoded({extended: true}));

// Configuration Template Engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

// Configuration of routes, either POST or GET
server.get("/", (req, res) => {
    return res.render("index.html")
});

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
});

server.post("/save-point", (req, res) => {
    // Function responsible for giving a space after the comma between the collection items
    function spaceItems(items) {
        let temp = new Array();

        items.split(',').forEach((value, index) => {
            if(index == 0) {
                temp.push(value);
            } else {
                temp.push(` ${value}`);
            }
        });

        return temp.join(',');
    }

    let items = spaceItems(req.body.items);

    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            uf,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?,?);
    `;
    
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.uf,
        req.body.state,
        req.body.city,
        items
    ];

    function afterInsertData(err) {
        if(err) {
            console.log(err);
            return res.render("create-point.html", {error: true});
        }

        console.log("Cadastrado com Sucesso");
        return res.render("create-point.html", {saved: true});
    }

    db.run(query, values, afterInsertData);
});

server.post("/update-point", (req, res) => {
    // Function responsible for giving a space after the comma between the collection items
    function spaceItems(items) {
        let temp = new Array();

        items.split(',').forEach((value, index) => {
            if(index == 0) {
                temp.push(value);
            } else {
                temp.push(` ${value}`);
            }
        });

        return temp.join(',');
    }

    let items = spaceItems(req.body.items);
    let search = req.query.search;

    const query = `
        UPDATE places
        SET image = "${req.body.image}",
            name = "${req.body.name}",
            address = "${req.body.address}",
            address2 = "${req.body.address2}",
            uf = "${req.body.uf}",
            state = "${req.body.state}",
            city = "${req.body.city}",
            items = "${items}"
        WHERE
            id = "${req.body.id}"
    `;

    function updateData(err) {
        if(err) {
            console.log(err);
            searchResults(search, res);
        }

        searchResults(search, res);
    }

    db.run(query, updateData);
});

server.get("/search", (req, res) => {
    const search = req.query.search;

    if(search === "") {
        return res.render("search-results.html", {total: 0});
    }

    searchResults(search, res);
});

server.get("/edit-search", (req, res) => {
    const search = req.query.search;
    const id = req.query.id;

    db.all(`SELECT * FROM places WHERE id = "${id}"`, function(err, rows) {
        if(err) {
            return console.log(err);
        }

        // View Page HTML with data table
        return res.render("edit-point.html", { place: rows[0], search});
    });

});

function searchResults(search, res) {
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err);
        }

        const total = rows.length;

        // View Page HTML with data table
        return res.render("search-results.html", {places: rows, total, search});
    });
}

server.listen(5400);