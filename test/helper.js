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

