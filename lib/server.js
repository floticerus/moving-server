;( function ()
	{
		var path = require( 'path' )

		var util = require( 'util' )

		var net = require( 'net' )

		var Router = require( path.join( __dirname, 'router' ) )
		var Request = require( path.join( __dirname, 'request' ) )
		var Response = require( path.join( __dirname, 'response' ) )

		var EventEmitter = require( 'events' ).EventEmitter

		/** @constructor */
		function Server( conf )
		{
			// allow use without new
			if ( !( this instanceof Server ) )
			{
				return new Server( conf )
			}

			EventEmitter.call( this )

			conf = conf || {}

			this.port = conf.port || 33333

			this.router = new Router(
				{
					path: conf.routes || path.join( __dirname, '../', 'routes' )
				}
			)

			this.clients = {}
		}

		util.inherits( Server, EventEmitter )

		function Server_removeSocket( socket )
		{
			if ( !this.clients[ socket.name ] )
			{
				return false // socket not found
			}

			this.clients[ socket.name ] = null
			delete this.clients[ socket.name ]

			return true
		}

		function Server_destroySocket( socket, message )
		{
			if ( typeof message !== 'undefined' )
			{
				// enforce string and add newline to message
				socket.write( JSON.stringify( { error: { message: message.toString() } } ) + '\n' )
			}

			socket.destroy()

			Server_removeSocket.call( this, socket )
		}

		// might not be safe but this needs to have public access somehow
		Server.prototype.renderCommand = function ( socket, cmd )
		{
			// uncomment the cmd.args stuff to make arguents mandatory,
			// as of now they are optional
			if ( !cmd || !cmd.cmd /*|| !cmd.args || !Array.isArray( cmd.args )*/ )
			{
				console.log( 'invalid command' )

				return false
			}

			var route = this.router.route( cmd.cmd )

			if ( !route )
			{
				console.log( 'route does not exist for this command' )

				return false
			}

			var request = new Request(
				{
					socket: socket, // client socket

					user: cmd.user,

					route: cmd.cmd, // requested route

					callbackId: cmd.callbackId,

					body: cmd.body // data
				}
			)

			var response = new Response(
				{
					request: request
				}
			)

			//console.log( request )

			route.call( route, request, response )

			return true
		}

		Server.prototype.getClientById = function ( clientId )
		{
			if ( !clientId || !this.clients[ clientId ] )
			{
				return false
			}

			return this.clients[ clientId ]
		}

		function Server_socketConnected( socket )
		{
			var that = this

			// need to generate a better unique name to use
			socket.name = socket.remoteAddress + ":" + socket.remotePort

			socket.user = null

			// set encoding as utf8 since we're expecting json
			socket.setEncoding( 'utf8' )

			this.clients[ socket.name ] = socket

			console.log( socket.name + ' - connected' )

			// setup some handlers for the socket
			socket.on( 'data', function ( data )
				{
					if ( typeof data === 'undefined' )
					{
						return Server_destroySocket.call( that, socket, 'invalid request' )
					}

					var json

					// parse json without crashing the server if it's bad
					try
					{
						json = JSON.parse( data )
					}

					catch ( e )
					{
						return Server_destroySocket.call( that, socket, 'could not parse json' )
					}

					if ( !json )
					{
						return console.log( 'could not parse json' )
					}

					if ( !json.cmds || !Array.isArray( json.cmds ) )
					{
						return console.log( 'commands must be an array' )
					}

					// everything seems okay, continue
					for ( var i = 0, l = json.cmds.length; i < l; ++i )
					{
						if ( !that.renderCommand( socket, json.cmds[ i ] ) )
						{
							console.log( 'could not render command' )

							continue // fail
						}
					}
				}
			)

			socket.on( 'error', function ()
				{
					console.log( socket.name + ' - connection closed with error' )

					Server_removeSocket.call( that, socket )
				}
			)

			socket.on( 'close', function ()
				{
					console.log( socket.name + ' - connection closed' )

					Server_removeSocket.call( that, socket )
				}
			)
		}

		// callback is optional, i would use listening event instead
		Server.prototype.listen = function ( port, callback )
		{
			if ( !callback && typeof port === 'function' )
			{
				callback = port

				port = this.port
			}

			this.port = port

			// define this instance to use later
			var that = this

			var server = net.createServer( Server_socketConnected.bind( this ) )

			// create server
			server.listen( port, function ()
				{
					// execute callback if it's defined
					callback && callback( server )

					that.emit( 'listening', server )
				}
			)
		}

		module.exports = Server
	}
)();
