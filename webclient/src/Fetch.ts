import { JSONObject } from './Types'
export function GetJSON( url : string, success : ( o : JSONObject ) => void, failure : ( err : Error | Response ) => void )
{
    fetch( url, {
            credentials: "same-origin",
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then( function( response ) {
            if( response.ok )
            {
                response.json().then(function( data ) {
                    success( data );
                });
            }
            else
            {
                failure( response );
            }
        }).catch( function( err ) {
            failure( err );
        });
}
export function PostJSON( url : string, success : ( o : JSONObject ) => void, failure : ( err : Error | Response ) => void )
{
    fetch( url, {
            credentials: "same-origin",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then( function( response ) {
            if( response.ok )
            {
                response.json().then(function( data ) {
                    success( data );
                });
            }
            else
            {
                failure( response );
            }
        }).catch( function( err ) {
            failure( err );
        });
}
export function PostJSONData( url : string, o : JSONObject, success : ( o : JSONObject ) => void, failure : ( err : Error | Response ) => void )
{
    fetch( url, {
            credentials: "same-origin",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify( o )
        }).then( function( response ) {
            if( response.ok )
            {
                if (response.headers.get("content-type").indexOf("application/json") !== -1) {
                    response.json().then(function( data ) { success( data ); });
                } else {
                    success( undefined );
                }
            }
            else
            {
                failure( response );
            }
        }).catch( function( err ) {
            failure( err );
        });
}
