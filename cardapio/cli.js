#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var args = process.argv.slice(2);
var fileLocation = path.resolve( __dirname, args[ 0 ] );
var fileExists = fs.existsSync( fileLocation );
var fileContent = null;
var instances = 0;
var menu = require('./').call( this ); 


function completeHandler () {
  var hasAllowed = ( menu.countAllowList() > 0 ) ? true : false;
  var out = ( hasAllowed ) ? 'sim' : 'não';

  console.log( 'Instancia %s', instances );
  console.log( out );
  menu = require('./').call( this );
}

function inputsMapHandler ( input ) {
  if ( input ) {
    menu.pushDeniedItem( input );
    menu.pushAllowedItem( input );
  }
}

function linesMapHandler ( line, idx, lines ) {
  var inputs = line.split(' ');
  var isTail = ( idx === ( lines.length - 1 ) );
  
  inputs
    .map( inputsMapHandler );

  if ( isTail ) {
    completeHandler();
  }
}

function isNumber ( input ) {
  var out = false;
  out = (/^[0-9]{0,1}$/).test(input); 
  return out;
}

function splitInstanceMapHandler ( line, idx, lines ) {
  if ( isNumber( line ) ) {
    console.log( line );
    instances += 1;
    var linesNumber = parseInt( line, 10 );  
    var current = lines.slice( idx, linesNumber ); 
    current.map( linesMapHandler );
  }
}

if ( fileExists ) {
  fileContent = fs.readFileSync( fileLocation, 'utf-8' );
  fileContent
    .split( '\n' )
    .map( splitInstanceMapHandler );
} else {
  console.log('File not exists!');  
  process.exit( 0 );
}
