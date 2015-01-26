# moving

in short, this aims to bring a platform which will be familiar to express/connect users, but for tcp connections passing json data. its primary purpose is for video games, but could be used for anything.

#### the present

moving is currently very young and does not include a ton of features. what it does include, however, is a pretty nifty router for getting a server running with minimal effort.

#### the future

eventually, moving will play nicely with the node cluster module, but currently sockets can only communicate with each other if they're running in the same process. the plan is to allow sockets to communicate with each other via a database such as redis, mongodb, etc.

it is also planned to support tls and (maybe) udp connections, but currently only allows tcp.

## clients

as of now only a lua client has been written, and will be released under the same mit license when it's ready. a javascript client will follow, and possibly a c# unity client.
