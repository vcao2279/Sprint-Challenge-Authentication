1.  Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.
> `Middleware` is function that has access to the request and response objects. It can execute code to modify these objects, end the request-response cycle, or call the next middleware.  
> `Session` is how the server store information of user's interaction with the website.   
> `bcrypt` is a library that creates hashed password.  
> `JWT` is a json-based library that creates access token which represent claims to be transferred between two parties.

2.  What does bcrypt do in order to prevent attacks?
> `bcrypt` incoporate salt and algorithm into the password, this process can be iterated multiple times to increase resistance against the attack.

3.  What are the three parts of the JSON Web Token?
> Header, Payload, Signature.