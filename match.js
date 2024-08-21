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
    
    const fileName = "./clean/matches-clean.csv"; 
  
    csvtojson().fromFile(fileName).then(src => { 
        count = 0;
        
        // Fetching the data from each row  
        // and inserting to the table "sample" 
        for (var i = 0; i < src.length; i++) { 
        //    if(count >3){
        //     break;
        //    }
        //     			console.log(src[i]);		
            var id                  = src[i]["id"], 
                m_source            = src[i]["m_source"], 
                c_source            = src[i]["c_source"], 
                m_country_code      = src[i]["m_country_code"],
                c_country_code      = src[i]["c_country_code"],
                m_source_id         = src[i]["m_source_id"];
                c_source_id         = src[i]["c_source_id"];
                validation_status   = src[i]["validation_status"];
        
            var insertStatement =  
                `INSERT INTO matches (id,m_source,c_source,m_country_code,c_country_code,m_source_id,c_source_id,validation_status) 
                VALUES (?, ?, ?, ?, ?, ?,?,?)`; 
        
            var items = [id,m_source,c_source,m_country_code,c_country_code,m_source_id,c_source_id,validation_status];
    
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
  
// if (err) return console.error( 
    //         'error: ' + err.message); 
  
    // con.query("DROP TABLE apo",  
    //     (err, drop) => { 
  
    //     // Query to create table "sample" 
    //     var createStatament =  
    //     "CREATE TABLE apo( " + 
    //     "title char(250), manufacturer char(100), source char(10)),source_id int, country_code char(4),barcode int"
  
    //     // Creating table "sample" 
    //     con.query(createStatament, (err, drop) => { 
    //         if (err) 
    //             console.log("ERROR: ", err); 
    //     }); 
    // }); 
    // CSV file name 