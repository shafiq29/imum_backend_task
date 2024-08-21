const csvtojson = require('csvtojson'); 
const mysql     = require("mysql"); 
  
// Database credentials 
const   hostname    = "localhost", 
        username    = "example_user", 
        password    = "example_password", 
        databsename = "example_db"
  
// Establish connection to the database 
let con = mysql.createConnection({ 
    host     : hostname, 
    user     : username, 
    password : password, 
    database : databsename, 
}); 
  
con.connect((err) => { 
    if(err){
        console.log(err.message);
    }
    
    const fileName = "./clean/ntn-lt-data-clean.csv"; 
  
    csvtojson().fromFile(fileName).then(src => { 
        count = 0;
        // Fetching the data from each row  
        // and inserting to the table "sample" 
        for (var i = 0; i < src.length; i++) { 
            
            var title           = src[i]["title"], 
                manufacturer    = src[i]["manufacturer"], 
                source          = src[i]["source"], 
                source_id       = src[i]["source_id"],
                country_code    = src[i]["country_code"],
                barcode         = src[i]["barcode"];
        
            var insertStatement =  
                `INSERT INTO ntn (title, manufacturer, source, source_id, country_code, barcode) 
                VALUES (?, ?, ?, ?, ?, ?)`; 
        
            var items = [title, manufacturer, source, source_id, country_code, barcode];
    
            // Inserting data of current row 
            // into database 
            con.query(insertStatement, items,  
                (err, results, fields) => { 
                if (err) { 
                    console.log( "Unable to insert item at row ", i + 1); 
                    return console.log(err); 
                } 
            }); 
            count++;
        } 
        console.log("All items stored into database successfully"); 
    }); 
}); 