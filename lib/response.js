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
				return // bad
			}

			// give response access to the associated request
			this.request = conf.request
		}

		Response.prototype.send = function ( body )
		{
			var obj = { cmd: this.request.route, body: body }

			if ( this.request.callbackId )
			{
				obj.callbackId = this.request.callbackId
			}

			this.request.socket.write( JSON.stringify( obj ) )
		}

		module.exports = Response
	}
)();
