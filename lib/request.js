;( function ()
	{
		/** @constructor */
		function Request( conf )
		{
			if ( !( this instanceof Request ) )
			{
				return new Request( conf )
			}

			if ( !conf || !conf.socket || !conf.route )
			{
				return // bad
			}

			conf.user = conf.user || {}

			this.socket = conf.socket

			this.route = conf.route

			this.user = {}
			this.user._id = conf.user._id ? conf.user._id.toString() : null
			this.user.token = conf.user.token ? conf.user.token.toString() : null

			// set this as null if it isn't defined in conf
			if ( typeof conf.callbackId !== 'undefined' )
			{
				this.callbackId = conf.callbackId
			}

			this.body = conf.body || {}
		}

		module.exports = Request
	}
)();
