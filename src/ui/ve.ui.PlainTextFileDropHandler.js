/*!
 * VisualEditor UserInterface plain text file drop handler class.
 *
 * @copyright 2011-2014 VisualEditor Team and others; see http://ve.mit-license.org
 */

/**
 * Plain text file drop handler.
 *
 * @class
 * @extends ve.ui.FileDropHandler
 *
 * @constructor
 * @param {ve.ui.Surface} surface
 * @param {File} file
 */
ve.ui.PlainTextFileDropHandler = function VeUiPlainTextFileDropHandler() {
	// Parent constructor
	ve.ui.PlainTextFileDropHandler.super.apply( this, arguments );
};

/* Inheritance */

OO.inheritClass( ve.ui.PlainTextFileDropHandler, ve.ui.FileDropHandler );

/* Static properties */

ve.ui.PlainTextFileDropHandler.static.name = 'plainText';

ve.ui.PlainTextFileDropHandler.static.types = ['text/plain'];

/* Methods */

/**
 * @inheritdoc
 */
ve.ui.PlainTextFileDropHandler.prototype.process = function () {
	this.reader.readAsText( this.file );
};

/**
 * @inheritdoc
 */
ve.ui.PlainTextFileDropHandler.prototype.onFileLoad = function () {
	var i, l,
		data = [],
		lines = this.reader.result.split( /[\r\n]+/ );

	for ( i = 0, l = lines.length; i < l; i++ ) {
		if ( lines[i].length ) {
			data.push( { type: 'paragraph' } );
			data = data.concat( lines[i].split( '' ) );
			data.push( { type: '/paragraph' } );
		}
	}
	this.insertableDataDeferred.resolve( data );
};

/**
 * @inheritdoc
 */
ve.ui.PlainTextFileDropHandler.prototype.onFileLoadEnd = function () {
	// 'loadend' fires after 'load'/'abort'/'error'.
	// Reject the deferred if it hasn't already resolved.
	this.insertableDataDeferred.reject();
};

/* Registration */

ve.ui.fileDropHandlerFactory.register( ve.ui.PlainTextFileDropHandler );
