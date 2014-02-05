function allowItemHandler ( input ) {
  var self = this;
  var out = false; 
  out = !( input.indexOf( '!' ) === 0 );
  return out;
}

function denyItemHandler ( input ) {
  var self = this;
  var out = false;
  out = !allowItemHandler.call( self, input );
  return out;
}

function isItemHandler ( input ) {
  var self = this;
  var out = false;
  out = (/^[!]?[a-z]{0,19}$/).test( input );
  return out;
}

function removeNegationHandler ( input ) {
  var self = this;
  var out = input;
  var hasNegationChar = input.indexOf( '!' ) === 0;

  if ( hasNegationChar ) {
    out = out.replace('!', '');  
  }

  return out;
}

function itemIsDeniedHandler ( input ) {
  var self = this;
  var out = false; 
  out = !!( ~self.denyList.indexOf( input ) );
  return out;
}

function itemIsAllowedHandler ( input ) {
  var self = this;
  var out = false;
  if ( !itemIsDeniedHandler.call( self, input ) ) {
    out = true;
  }
  return out;
}

function pushAllowedItemHandler ( input ) {
  var self = this;
  var out = self.allowList;
  var allowToPush = ( 
    isItemHandler( input ) && ( 
      allowItemHandler.call( self, input ) 
    ) 
  );

  if ( allowToPush ) {
    out.push( input ); 
  }

  return out;
}

function pushDeniedItemHandler ( input ) {
  var self = this;
  var out = self.denyList;
  var allowToPush = ( 
    isItemHandler.call( self, input ) && ( 
      denyItemHandler.call( self, input ) 
    ) 
  );

  if ( allowToPush ) {
    out.push( removeNegationHandler.call( self, input ) );  
  }

  return out;
}

function countAllowListHandler () {
  var self = this;
  var out = self.allowList.length;
  return out;
}

function countDenyListHandler () {
  var self = this;
  var out = self.denyList.length;
  return out;
}

function mainHandler () {
  var menu = {};  

  menu.allowList = [];
  menu.denyList = [];

  menu.allowItem = allowItemHandler.bind( menu );
  menu.denyItem = denyItemHandler.bind( menu );
  menu.isItem = isItemHandler.bind( menu );
  menu.removeNegation = removeNegationHandler.bind( menu );
  menu.itemIsDenied = itemIsDeniedHandler.bind( menu );
  menu.itemIsAllowed = itemIsAllowedHandler.bind( menu );
  menu.pushAllowedItem = pushAllowedItemHandler.bind( menu );
  menu.pushDeniedItem = pushDeniedItemHandler.bind( menu );
  menu.countAllowList = countAllowListHandler.bind( menu );
  menu.countDenyList = countDenyListHandler.bind( menu );

  return menu;
}
module.exports = exports = mainHandler;
