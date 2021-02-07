// Imports
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

db.serialize(() => {
    // 1 - Create table
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            uf TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `);

    // 2 - Insert table data
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
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1474&q=80",
        "Colectoria",
        "Guilherme Gemballa, Jardim América",
        "N° 260",
        '42',
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ];

    function afterInsertData(err) {
        if(err) {
            return console.log(err);
        }

        console.log("Cadastrado com Sucesso");
    }

    // db.run(query, values, afterInsertData);

    // 3 - Query table data
    // db.all(`SELECT * FROM places`, function(err, rows) {
    //     if(err) {
    //         return console.log(err);
    //     }

    //     console.log("Aqui estão seus registros:");
    //     console.log(rows);
    // });

    // 4 - Delete table data
    // db.run(`DELETE FROM places WHERE id = ?`, [6], function(err) {
    //     if(err) {
    //         return console.log(err);
    //     }

    //     console.log("Registro deletado com sucesso.")
    // });
});