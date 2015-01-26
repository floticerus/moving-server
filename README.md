# moving
in short, this aims to bring a platform which will be familiar to connect/express users, but for tcp connections passing json data. its primary purpose is for video games, but could be used for anything.

#### the present
moving is currently very young and does not include a ton of features. what it does include, however, is a pretty nifty router for getting a server running with minimal effort.

#### the future
eventually, moving will play nicely with the node cluster module, but currently sockets can only communicate with each other if they're running in the same process. the plan is to allow sockets to communicate with each other via a database such as redis, mongodb, etc.

it is also planned to support tls and (maybe) udp connections, but currently only allows tcp.

## clients
as of now only a lua client has been written, and will be released under the same mit license when it's ready. a javascript client will follow, and possibly a c# unity client.

## license
The MIT License (MIT)

Copyright (c) 2015 Kevin von Flotow

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

