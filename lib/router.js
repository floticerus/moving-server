;( function ()
	{
		var path = require( 'path' )

		var fs = require( 'fs' )

		/** @constructor */
		function Router( conf )
		{
			// allow use without new
			if ( !( this instanceof Router ) )
			{
				return new Router( conf )
			}

			conf = conf || {}

			// path should be passed, but try to use a default
			this.path = conf.path || path.join( __dirname, '../', 'routes' )

			this.routes = {}

			// process routes once at startup
			Router_walkDirectorySync.call( this, this.path )
		}

		// private function
		function Router_walkDirectorySync( dirPath, base )
		{
			base = base || []

			var that = this

			fs.readdirSync( dirPath ).forEach( function ( file )
				{
					var filePath = path.join( dirPath, file )

					var stats = fs.statSync( filePath )

					if ( stats.isDirectory() )
					{
						var useBase = [].concat( base, [ file ] )

						// process directory and return
						return Router_walkDirectorySync.call( that, filePath, useBase )
					}

					if ( !stats.isFile() )
					{
						return // not a file, just return
					}

					// process file

					// check the file extension without regex
					var splt = file.split( '.' )

					if ( splt.length !== 0 )
					{
						// get the extension and remove from split array
						var extension = splt.pop()

						// rejoin the array to get the filename without the extension
						var filename = splt.join( '.' )

						var routeName = [].concat( base, [ filename ] ).join( '/' )

						that.routes[ routeName ] = require( filePath )
					}
				}
			)
		}

		// returns the route at the specified location
		// it is recursive and sub-directories are accessible
		// by using forward slashes, like 'path/to/route'
		Router.prototype.route = function ( routePath )
		{
			return this.routes[ routePath ] ? this.routes[ routePath ] : null
		}

		module.exports = Router
	}
)();
