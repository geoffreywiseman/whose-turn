/*
 * Chai Extensions
 */
chai.use( function(_chai, utils) {
	var Assertion = _chai.Assertion;
	utils.addProperty( Assertion.prototype, 'ngshown', function() {
		var object = this._obj;
		new Assertion( object ).to.not.be.null();
		new Assertion( object ).to.be.instanceof( HTMLElement );
		this.assert(
			object.classList.contains( 'ng-show' ),
			'expected #{this} to have ng-show class',
			'expected #{this} to have ng-hide class'
			);
	} );
	utils.addProperty( Assertion.prototype, 'nghidden', function() {
		var object = this._obj;
		new Assertion( object ).to.not.be.null();
		new Assertion( object ).to.be.instanceof( HTMLElement );
		this.assert(
			object.classList.contains( 'ng-hide' ),
			'expected #{this} to have ng-hide class',
			'expected #{this} to have ng-hide class'
			);
	} );	
} );

/*
 * Helper Functions for All Specs
 */
function getFirstElementWithTagName( view, tagName ) {
	for( var index = 0; index<view.length; index++ ) {
		var item = view[index];
		if( item instanceof HTMLElement ) {
			if( item.tagName.toUpperCase() == tagName.toUpperCase() ) {
				return item;
			}
		}
	}
	return null;
}

function expectListSize( view, size ) {
	var lis = view.find( "li" );
	expect( lis.length ).to.equal( size );
}

function prettyLog( prefix, subject ) {
	if( typeof subject == 'object' ) {
		if( subject instanceof Array ) {
			for( var index = 0; index < subject.length; index++ ) {
				prettyLog( prefix + '[' + index + ']', subject[index] );
			}
		} else {
			for( var propertyName in subject ) {
				prettyLog( prefix + '.' + propertyName, subject[propertyName] );
			}
		}
	} else {
		console.log( prefix + ": " + subject );
	}
}
