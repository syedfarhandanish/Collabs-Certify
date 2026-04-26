# This is our Python backend using Vercel's required format
from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # 1. Send a 200 OK status code
        self.send_response(200)
        
        # 2. Tell the browser we are sending JSON data
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        # 3. Create our response message
        response_data = {
            "message": "Success! The Collabs Certify Python Backend is live and ready."
        }
        
        # 4. Send the message back to the frontend
        self.wfile.write(json.dumps(response_data).encode('utf-8'))
        return