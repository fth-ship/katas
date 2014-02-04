var menu = exports;
var allowList = menu.allowList = [];
var denyList = menu.denyList = [];

function allowItemHandler ( input ) {
  var out = false; 
  out = !( input.indexOf( '!' ) === 0 );
  return out;
}
menu.allowItem = allowItemHandler;

function denyItemHandler ( input ) {
  var out = false;
  out = !allowItemHandler( input );
  return out;
}
menu.denyItem = denyItemHandler;

function isItemHandler ( input ) {
  var out = false;
  out = (/^[!]?[a-z]{0,19}$/).test( input );
  return out;
}
menu.isItem = isItemHandler;

function removeNegationHandler ( input ) {
  var out = input;
  var hasNegationChar = input.indexOf( '!' ) === 0;

  if ( hasNegationChar ) {
    out = out.replace('!', '');  
  }

  return out;
}
menu.removeNegation = removeNegationHandler;

function itemIsDeniedHandler ( input ) {
  var out = false; 
  out = !!( ~denyList.indexOf( input ) );
  return out;
}
menu.itemIsDenied = itemIsDeniedHandler;

function itemIsAllowedHandler ( input ) {
  var out = false;
  if ( !itemIsDeniedHandler( input ) ) {
    out = true;
  }
  return out;
}
menu.itemIsAllowed = itemIsAllowedHandler;

function pushAllowedItemHandler ( input ) {
  var out = allowList;
  var allowToPush = ( 
    isItemHandler( input ) && ( 
      allowItemHandler( input ) 
    ) 
  );

  if ( allowToPush ) {
    out.push( input ); 
  }

  return out;
}
menu.pushAllowedItem = pushAllowedItemHandler;

function pushDeniedItemHandler ( input ) {
  var out = denyList;
  var allowToPush = ( 
    isItemHandler( input ) && ( 
      denyItemHandler( input ) 
    ) 
  );

  if ( allowToPush ) {
    out.push( removeNegationHandler( input ) );  
  }

  return out;
}
menu.pushDeniedItem = pushDeniedItemHandler;

function countAllowListHandler () {
  var out = allowList.length;
  return out;
}
menu.countAllowList = countAllowListHandler;

function countDenyListHandler () {
  var out = denyList.length;
  return out;
}
menu.countDenyList = countDenyListHandler;
