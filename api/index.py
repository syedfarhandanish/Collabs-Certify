from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        response_data = {"message": "Success! The Collabs Certify Python Backend is live and ready."}
        self.wfile.write(json.dumps(response_data).encode('utf-8'))
        return

    # NEW: Handle incoming POST requests from the frontend
    def do_POST(self):
        # 1. Figure out how much data was sent
        content_length = int(self.headers['Content-Length'])
        
        # 2. Read the data
        post_data = self.rfile.read(content_length)
        
        # 3. Convert it from JSON string into a Python dictionary
        data = json.loads(post_data)
        
        # 4. Extract what we need to verify it worked
        students = data.get("students", [])
        boxes = data.get("boxes", {})
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        # 5. Send a dynamic message back detailing exactly what Python received
        success_message = f"Python Backend Success! Received {len(students)} student records and {len(boxes)} coordinate boxes."
        
        response_data = {
            "message": success_message
        }
        
        self.wfile.write(json.dumps(response_data).encode('utf-8'))
        return