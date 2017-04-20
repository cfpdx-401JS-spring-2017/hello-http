# Hello HTTP

This API provides you with several things. 

- If you send a GET request to root or index.html, it will return an HTML page

- If you send a GET request to `/fact`, it will return a fact about HTTP

- If you send a GET request to `/greeting`, it will greet you with 'hello stranger'

- If you send a GET request to `/greeting/<name>`, it will greet you with `hello <name>`

- If you send a GET request to `/greeting/<name>/?salutation=<salutation>`, it will greet you with `<salutation> <name>`

- If you send a POST request to `/logs`, it will create a new `/logs` directory if none exists, and write the file contents to a new file