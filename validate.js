const fs        = require('fs');
const Papa      = require('papaparse');
const csvFile   = fs.readFileSync('./output/related_manufacturer.csv', 'utf8');

arr             = [];
count           = 0;

Papa.parse(csvFile, {
    header: true,
    delimiter:',',
    step: function(result) {
      
        if(result.data.product_a_barcode==result.data.product_b_barcode){
            
            result.data.isValid = true;
            result.data.productLine = false;
            result.data.isBrand = true;
            result.data.isParent = false;
            result.data.isChild = false;

            if(result.data.manufacturer_a.toLowerCase()!=result.data.manufacturer_b.toLowerCase() && result.data.manufacturer_a.toLowerCase().includes(result.data.manufacturer_b.toLowerCase())){
                result.data.isChild = true;
                result.data.productLine = true;
                result.data.isBrand = false;
                
            }

            if(result.data.manufacturer_a.toLowerCase()!=result.data.manufacturer_b.toLowerCase() && result.data.manufacturer_b.toLowerCase().includes(result.data.manufacturer_a.toLowerCase())){
                result.data.isParent = true;
                result.data.productLine = true;
                result.data.isBrand = false;
                
            }
            
        } else if(result.data.product_a_barcode.includes(result.data.product_b_barcode)){
            result.data.isValid = true;
            result.data.productLine = false;
            result.data.isBrand = true;
            result.data.isParent = true;
            result.data.isChild = false;
            if(result.data.manufacturer_a.toLowerCase()!=result.data.manufacturer_b.toLowerCase() && result.data.manufacturer_a.toLowerCase().includes(result.data.manufacturer_b.toLowerCase())){
                result.data.isChild = true;
                result.data.productLine = true;
                result.data.isBrand = false;
                
            }

            if(result.data.manufacturer_a.toLowerCase()!=result.data.manufacturer_b.toLowerCase() && result.data.manufacturer_b.toLowerCase().includes(result.data.manufacturer_a.toLowerCase())){
                result.data.isParent = true;
                result.data.productLine = true;
                result.data.isBrand = false;
                
            }


        } else if (result.data.product_b_barcode.includes(result.data.product_a_barcode)){
            result.data.isValid = true;
            result.data.productLine = true;
            result.data.isBrand = false;
            result.data.isParent = false;
            result.data.isChild = true;
            if(result.data.manufacturer_a.toLowerCase()!=result.data.manufacturer_b.toLowerCase() && result.data.manufacturer_a.toLowerCase().includes(result.data.manufacturer_b.toLowerCase())){
                result.data.isChild = true;
                result.data.productLine = true;
                result.data.isBrand = false;
                
            }

            if(result.data.manufacturer_a.toLowerCase()!=result.data.manufacturer_b.toLowerCase() && result.data.manufacturer_b.toLowerCase().includes(result.data.manufacturer_a.toLowerCase())){
                result.data.isParent = true;
                result.data.productLine = true;
                result.data.isBrand = false;
                
            }
        }
        else {
            result.data.isValid = false;
            result.data.productLine = false;
            result.data.isBrand = false;
            result.data.isParent = false;
            result.data.isChild = false;
            
        }
        arr.push (result.data);
        count++;
        // console.log (result.data);
    },
    complete: function() {
      writeCSV(arr, './validate/result.csv');
      console.log("Parsing complete.");
    }
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
