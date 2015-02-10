;( function ()
	{
		/** @constructor */
		function Response( conf )
		{
			if ( !( this instanceof Response ) )
			{
				return new Response( conf )
			}

			if ( !conf || !conf.request )
			{
				return // fail
			}

			// give response access to the associated request
			this.request = conf.request
		}

		Response.prototype.send = function ( body )
		{
			if ( !this.request || !this.request.socket )
			{
				return false // fail
			}

			var obj = { cmd: this.request.route, body: body }

			if ( this.request.callbackId )
			{
				obj.callbackId = this.request.callbackId
			}

			this.request.socket.write( JSON.stringify( obj ) + '\n' )
		}

		module.exports = Response
	}
)();
