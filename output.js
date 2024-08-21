const csvtojson = require('csvtojson'); 
const mysql     = require("mysql"); 
const fs        = require('fs');
const Papa      = require('papaparse');
  
// Database credentials 
const   
    hostname    = "localhost", 
    username    = "example_user", 
    password    = "example_password", 
    databsename = "example_db"
  
// Establish connection to the database 
let con         = mysql.createConnection({ 
    host     : hostname, 
    user     : username, 
    password : password, 
    database : databsename, 
}); 

function writeCSV(data, outputPath) {
    const csv = Papa.unparse(data);
    fs.writeFile(outputPath, csv, (err) => {
      if (err) {
        return console.error('Error writing CSV:', err);
      }
      console.log('CSV file saved:', outputPath);
    });
}

function getRelationQuery (src_a, src_b) {
    // console.log(src_a);
    return `SELECT `+ src_a+`.title as title_product_a,`+
                src_b+`.title as title_product_b,`+
                src_a+`.manufacturer as manufacturer_a,`+
                src_b+`.manufacturer as manufacturer_b,`+
                src_a+`.barcode as product_a_barcode,`+
                src_b+`.barcode as product_b_barcode,  
                mat.m_source_id, 
                mat.c_source_id
                FROM 
                    matches mat
                JOIN `+
                    src_a+` `+src_a+` ON `+src_a+`.source_id = mat.m_source_id
                JOIN `+ 
                    src_b+` `+src_b+` ON `+src_b+`.source_id = mat.c_source_id
                WHERE `+ 
                    src_b+`.manufacturer!=''`;
    // return;
};
  
con.connect((err) => { 

    // Notify on connection failure
    if(err) {
        console.log('IMUM: Could not connect!'+err.message);
    }

    // Query to fetch table data 
    // var queryStatement =  "SELECT * from apo LIMIT 10";
    var queryStatement = getRelationQuery('azt','cma');
    console.log(queryStatement);

    // Executing the query
    con.query(queryStatement, (err,data) => { 
        // console.log(data);
        writeCSV(data, './output/related_manufacturer.csv');
        if (err) {
            console.log("IMUM: Could not fetch data!", err); 
        } 
    }); 
});