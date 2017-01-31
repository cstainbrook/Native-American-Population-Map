from BaseHTTPServer import HTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler
from SocketServer import ThreadingMixIn

class ThreadingServer(ThreadingMixIn, HTTPServer):
    pass

serveraddr = ('', 8002)
srvr = ThreadingServer(serveraddr, SimpleHTTPRequestHandler)
srvr.serve_forever()
