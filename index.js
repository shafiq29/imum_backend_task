const fs      = require('fs');
const Papa    = require('papaparse');
const csvFile = fs.readFileSync('./data/matches.csv', 'utf8');

var arr       = [];
var count     = 0;

Papa.parse(csvFile, {
    header: true,
    delimiter:';',
    step: function(result) {
      arr.push (result.data);
      count++;
    },
    complete: function() {
      // console.log(arr);
      // const unique = [ ...new Set(arr)]  
      // Call the function to write data to a file
      writeCSV(arr, './clean/matches-clean.csv');
      // console.log(unique);
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