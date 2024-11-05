const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'b49phykklyd9jhtd6gw2-mysql.services.clever-cloud.com',
    user: 'uu4f3qgwzp3ro8sj',
    password: 'e7UcgIc5LOsfAfzPbDyC',
    database: 'b49phykklyd9jhtd6gw2',
    port: 3306
});

//connect to database
connection.connect((error) =>{
    if(error){
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Successfully connected to MySQL database on Clever Cloud');
});

module.exports = connection;



