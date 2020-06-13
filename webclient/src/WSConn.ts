export function createConnection( server_url : string, on_message_callback : ( msg : any ) => void )
{
	const web_socket = new WebSocket( server_url + '/api/ws_conn', 'roof_proto' )
	web_socket.onmessage = on_message_callback.bind( this )
	web_socket.onclose = function() { }
	web_socket.onopen = function() {
		web_socket.binaryType = 'arraybuffer';
	}
	return web_socket
}
