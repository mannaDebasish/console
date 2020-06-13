import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as h from 'react-hyperscript'
import hh from './hh'
import { Instance } from './Instance'
import { hashPassword } from './TransportHashPassword'
const { div, form, input, a, br } = hh( h )

declare global {
	interface Window {
		jwt_token : string
	}
}


let login_button_style = {
	width: "240px",
	height: "12px",
	display: "block",
	paddingTop: "14px",
	paddingBottom: "14px",
	borderRadius: "6px",
	border: "none",
	//border-top: #4eb2a8 1px solid;
	borderBottom: "#161616 1px solid",
	background: "rgb( 221, 100, 15 )",
	textAlign: "center",
	textDecoration: "none",
	fontSize: "12px",
	fontWeight: "bold",
	color: "#FFF",
	textShadow: "0 -1px #1d7464, 0 1px #7bb8b3",
	fontFamily: "Arial"
}

let input_style = {
	width: "200px ",
	fontSize: "12px",
	paddingTop: "14px",
	paddingBottom: "14px",
	paddingLeft: "40px",
	border: "none",
	color: "#bfbfbf",
	background: "#141414",
	outline: "none",
	margin: 0
}

function start_app()
{
	(<any>window).RoofsInstance = new Instance();
}

function on_auth_failure()
{
}
function body()
{
	return loginPage()
}
function app()
{
	let d = document.createElement( 'div' )
	d.id = 'main'
	document.body.appendChild( d )
	ReactDOM.render( body(), document.querySelector( "#main" ))
}

export function loginPage()
{
	return div( [
		form( [
			input( { style: input_style, type: 'text', name: 'username', required: true, placeholder: "Username", autoFocus: true } ),
			br(),
			input( { style: input_style, type: 'password', name: 'password', required: true, placeholder: "Password" } ),
			a( { style: login_button_style,
				href: "#",
				onClick: authenticateLoginForm,
			}, 'Login' )
		])
	])
}


function authenticateLoginForm()
{
	authenticateLogin( ( <HTMLInputElement>document.querySelector( 'form > input[name="username"]' ) ).value,
		( <HTMLInputElement>document.querySelector( 'form > input[name="password"]' ) ).value,
		start_app,
		on_auth_failure )
}

const WIRE_TRANSFER_PASSWORD_SALT = "b8d3511c4bd230d688c2b8d639c47059516e9a54782b40657988b27b2442062d"

function authenticateLogin( username : string, client_password : string, success_callback : any, failure_callback : any )
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

app()
