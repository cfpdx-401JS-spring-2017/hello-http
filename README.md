# Lab 2: Keeley Hammond
## Complete!

### Hello HTTP: Day 2
 
In the original lab, we had five main objectives:

* Send a GET request to root `/` or `index.html`, and return the contents of my HTML page.
* Send a GET request to `/fact`, and return a fun fact about the Sistine Chapel!
* Send a GET request to `/greeting` or `/greeting/<name>`, and be greeted by `hello stranger` or `hello ${name}`.
* Send a GET request to `/greeting/<name>/?salutation=<salutation>`, and be greeted by `<salutation> <name>`.
* Return a 404: `CANNOT <method> <url>` if anything else is placed into your GET request.

Now in Tuesday's lab, we were given additional objectives:

* Send a POST request to /logs, return a created directory `/logs` and the object.
* If `/logs` does not exist, create `/logs`.
* Create a new txt file with each POST.
* Use `new Date().toISOString()` (aka a "timestamp") to uniquely name the txt file.
* Return response `{ timestamp: <timestamp> }` with no `.txt` extension.

In addition to the above objectives, I also added a GET request to `/logs` that returned an array of txt files.