#!/usr/bin/env node

var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');
var fs = require('fs');
var path = require('path');

// Load the docx file as a binary
var inputFile = process.argv[2];
var dataFile = process.argv[3];
var outputFile = process.argv[4];
var rootPath = process.cwd();

var packageJSON = JSON.parse(fs.readFileSync(path.resolve(__dirname + '/package.json'), 'utf-8'));
var version = packageJSON.version;

if (!inputFile || inputFile.indexOf('.docx') === -1) {
	showHelp();
	return false;
}
var content = fs.readFileSync(path.resolve(rootPath, inputFile), 'binary');

var zip = new JSZip(content);
var doc = new Docxtemplater();
var dataJson = require(path.resolve(rootPath, dataFile));

doc.loadZip(zip);

//set the templateVariables
doc.setData(dataJson);

try {
    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render()
} catch (error) {
    var e = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        properties: error.properties,
    }
    console.log(JSON.stringify({error: e}));
    // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
    throw error;
}

var buf = doc.getZip().generate({type: 'nodebuffer'});
// buf is a nodejs buffer, you can either write it to a file or do anything else with it.
fs.writeFileSync(path.resolve(rootPath, outputFile), buf);
console.log("success !")

// help
function showHelp () {
  console.log('Usage: docxtpl input.docx data.json output.docx');
  console.log('Version: ' + version + '\r\n');
}