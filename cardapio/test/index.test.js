var menu = require('../').call( this );
var should = require('should');
var random = require('fth-random');

describe('Menu', function () {
  it('allow item', function () {
    menu
      .allowItem( 'item' )
      .should
      .be
      .ok;
  });  

  it('deny item', function () {
    menu
      .denyItem( '!item' )
      .should
      .be
      .ok;
  });

  it('is item of menu', function () {
    menu
      .isItem( random.letters('????') )
      .should
      .be
      .ok;
  });

  it('is item of menu with negation operator', function () {
    menu
      .isItem( random.letters('!????') )
      .should
      .be
      .ok;
  });

  it('item not have more than 20 chars', function () {
    menu
      .isItem( random.letters( ( new Array( 21 ) ).join('?') ) )
      .should
      .not
      .be
      .ok;
  });

  it('item should be alpha', function () {
    menu
      .isItem( 1234 )
      .should
      .not
      .be
      .ok;
  });

  it('push allowed item', function () {
    var actual = random.letters('????');
    var expected = [ actual ];

    menu
      .pushAllowedItem( actual )
      .should
      .be
      .eql( expected );
  });

  it('not push if not allowed item', function () {
    var actual = random.letters('!????');  
    var expected = [];

    menu
      .pushAllowedItem( actual )
      .should
      .be
      .eql;
  });

  it('push denied item', function () {
    var actual = random.letters('!????');  
    var expected = [ menu.removeNegation( actual ) ];

    menu
      .pushDeniedItem( actual )
      .should
      .be
      .eql( expected );
  });

  it('remove negation char', function () {
    var actual = random.letters('!????');
    var expected = actual.replace('!', '');

    menu
      .removeNegation( actual )
      .should
      .be
      .eql( expected );
  });

  it('item is denied', function () {
    var actual = menu.pushDeniedItem('!chicken');  
    var expected = menu.itemIsDenied( 'chicken' );
  });

  it('item is allowed', function () {
    menu.pushAllowedItem('rice');
    var actual = menu.itemIsAllowed( 'rice' );

    actual
      .should
      .be
      .ok;
  });

  it('count allow', function () {
    var actual = menu.countAllowList();  
    var expected = 0;

    actual
      .should
      .be
      .above( expected );
  });

  it('count deny', function () {
    var actual = menu.countDenyList();  
    var expected = 0;

    actual
      .should
      .be
      .above( expected );
  });
});
