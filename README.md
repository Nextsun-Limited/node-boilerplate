# node-boilerplate (Authentication API)
Simple ES6 Node/Express/Mongo API with JWT for backend user authentication.
API for registering users with MongoDB and authenticate them using passport, passport-jwt and a JWT strategy.

<h3>Version</h3>

1.0.0

<h2>Usage</h2>

<pre>
<code>npm install</code>
</pre>

<pre>
<code>npm start</code>
</pre>

<h2>Endpoints</h2>

<pre>
<code>POST /users/register</code>
</pre>

<pre>
<code>POST /users/authenticate      // Responds back with a token</code>
</pre>

<pre>
<code>GET /users/profile            // Requires a JSON web token</code>
</pre>
