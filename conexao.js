const banco = require("mysql2/promise");

async function conecta(){    
    const conexao = await banco.createConnection({
        host: "localhost",
        port: 3306,
        database: "pw4bd",
        user: "root",
        password: ""
    });
    return conexao;
}

// ------ Poções ------ 

async function criaTabelaPotions(){
    console.log("Criando a tabela poção");
    const conexaoAtiva = await conecta(); 
    const sql = "CREATE TABLE IF NOT EXISTS potions(" +
    "id INT AUTO_INCREMENT PRIMARY KEY, " +
    "nome VARCHAR(100), " + 
    "preparo VARCHAR(500) );" ;

    return await conexaoAtiva.query(sql);
}
async function listarPotions(){
    console.log(`Exibindo a lista de poções...`);
    const conexaoAtiva = await conecta();    
    const [resultado] = await conexaoAtiva.query("SELECT * FROM potions;");    
           
    return [resultado];
}

async function consultaPotion(id){
    console.log(`Consultando a poção de id ${id} no banco`);
    const conexaoAtiva = await conecta();    
    const [resultado] = await conexaoAtiva.query("SELECT * FROM potions WHERE id = ?;", [id]);

    return [resultado];
}

async function inserePotion(potion){
    console.log(`Inserindo uma poção ${potion.nome} no banco`);
    const conexaoAtiva = await conecta();
    const sql = "INSERT INTO potions(nome, preparo) VALUES (?,?);";
    const parametros = [potion.nome, potion.preparo];

    return await conexaoAtiva.query(sql, parametros);
}

async function editaPotion(id, potion){
    console.log(`Editando a poção de id ${id} no banco`);
    const conexaoAtiva = await conecta();    
    const [resultado] = await conexaoAtiva.query("UPDATE potions SET nome = ?, preparo = ? WHERE id = ?;", [potion.nome, potion.preparo, id]);

    return [resultado];
}

async function deletePotion(id){
    console.log(`Deletando a poção de id ${id} no banco`);
    const conexaoAtiva = await conecta();    
    const [resultado] = await conexaoAtiva.query("DELETE FROM potions WHERE id = ?;", [id]);

    return [resultado];
}

// ------ Feitiços ------ 

async function criaTabelaSpells(){
    console.log("Criando a tabela feitiço");
    const conexaoAtiva = await conecta(); 
    const sql = "CREATE TABLE IF NOT EXISTS spells(" +
    "id INT AUTO_INCREMENT PRIMARY KEY, " +
    "nome VARCHAR(100), " + 
    "execucao VARCHAR(500) );" ;

    return await conexaoAtiva.query(sql);
}

async function listarSpells(){
    console.log(`Exibindo a lista de feitiços...`);
    const conexaoAtiva = await conecta();    
    const [resultado] = await conexaoAtiva.query("SELECT * FROM spells;");

    return [resultado];
}

async function consultaSpell(id){
    console.log(`Consultando feitiço de id ${id} no banco`);
    const conexaoAtiva = await conecta();    
    const [resultado] = await conexaoAtiva.query("SELECT * FROM spells WHERE id = ?;", [id]);

    return [resultado];
}

async function insereSpell(spell){
    console.log(`Inserindo um feitiço ${spell.nome} no banco`);
    const conexaoAtiva = await conecta();
    const sql = "INSERT INTO spells(nome, execucao) VALUES (?,?);";
    const parametros = [spell.nome, spell.execucao];

    return await conexaoAtiva.query(sql, parametros);
}

async function editaSpell(id, spell){
    console.log(`Editando feitiço de id ${id} no banco`);
    const conexaoAtiva = await conecta();    
    const [resultado] = await conexaoAtiva.query("UPDATE spells SET nome = ?, execucao = ? WHERE id = ?;", [spell.nome, spell.execucao, id]);

    return [resultado];
}

async function deleteSpell(id){
    console.log(`Deletando feitiço de id ${id} no banco`);
    const conexaoAtiva = await conecta();    
    const [resultado] = await conexaoAtiva.query("DELETE FROM spells WHERE id = ?;", [id]);

    return [resultado];
}

// ------------- populando as tabelas - TESTES -------------
// async function populaDadosTabelaPotions(){
//     console.log(`Populando os dados para testes`);
//     const conexaoAtiva = await conecta();
//     const resultadoPotions = await conexaoAtiva.query("INSERT INTO potions(nome) VALUES ('pocao1'), ('pocao2'), ('pocao3');" )
    
//     return resultadoPotions;
// }

// async function populaDadosTabelaSpells(){
//     console.log(`Populando os dados para testes`);
//     const conexaoAtiva = await conecta();
//     const resultadoSpells = await conexaoAtiva.query("INSERT INTO spells(nome) VALUES ('feitico1'), ('feitico2'), ('feitico3');" )
    
//     return resultadoSpells;
// }

module.exports = {criaTabelaPotions, listarPotions, consultaPotion, inserePotion, editaPotion, deletePotion, criaTabelaSpells, listarSpells, consultaSpell, insereSpell, editaSpell, deleteSpell};