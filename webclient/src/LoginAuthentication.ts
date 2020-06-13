import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as h from 'react-hyperscript'
import hh from './hh'
import { hashPassword } from './TransportHashPassword'
const { div, form, input, a, br } = hh( h )

declare global {
	interface Window {
		jwt_token : string
	}
}
const WIRE_TRANSFER_PASSWORD_SALT = "b8d3511c4bd230d688c2b8d639c47059516e9a54782b40657988b27b2442062d"

export function authenticateLogin( username : string, client_password : string, success_callback : any, failure_callback : any )
{
	hashPassword( client_password, WIRE_TRANSFER_PASSWORD_SALT, ( hashed_client_password ) =>
		{
			fetch( '/auth/authenticate', {
				credentials: "same-origin",
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify( {
					username: username,
					password: hashed_client_password })
			}).then( function( response ) {
				if( response.ok ) {
					response.text().then( ( txt ) => {
						//window.jwt_token = JSON.parse( txt ).jwt
						success_callback()
					})
				}
				else
				{
					failure_callback( response.status )
				}
			}).catch( function( err ) {
				failure_callback( err )
			});
		});
}
