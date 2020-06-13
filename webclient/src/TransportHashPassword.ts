import { encode } from "isomorphic-textencoder"

export function fromHex( str : any )
{
	const buf = new Uint8Array( str.length / 2 )
	for( let i = 0; i < str.length; i += 2 )
	{
		buf[ i / 2 ] = parseInt( str.substr( i, 2 ), 16 )
	}
	return buf
}

export function convert( str : any )
{
	const buf = new Uint8Array( str.length )
	for( let i = 0; i < str.length; i += 1 )
	{
		buf[ i ] = str.charCodeAt(i)
	}
	return buf
}

export function toHex( buf : any )
{
	const hexChar = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" ]
	function byteToHex( b ) { return hexChar[ (b >> 4 ) & 0x0f ] + hexChar[ b & 0xf ] }
	let str = "";
	for( let i = 0; i < buf.length; ++i )
	{
		str+= byteToHex( buf[ i ] )
	}
	return str
}

export function hashPassword( passphraseKeyIn : string, serverSaltHex : string, callback : ( proofOfSecret : string ) => void )
{
	const saltBuffer = fromHex( serverSaltHex )

	const passphraseKey = encode( passphraseKeyIn )

	window.crypto.subtle.importKey( 'raw', passphraseKey, 'PBKDF2', false, [ 'deriveBits', 'deriveKey' ] ).then(
		function( key : CryptoKey ) {
			return window.crypto.subtle.deriveKey( { 'name': 'PBKDF2', 'salt': saltBuffer, iterations: 100, hash: 'SHA-256' }, key, { name: 'AES-CBC', length: 256 }, true, [ 'encrypt', 'decrypt' ] ) }).then(
				function ( webKey : CryptoKey ) { return crypto.subtle.exportKey( "raw", webKey ); }).then(
					function( buffer : ArrayBuffer ) {
						const proofOfSecret = toHex( new Uint8Array( buffer ) )
						callback( proofOfSecret )
					});

}
