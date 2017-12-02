#Talent - Architecture Design
This file is used as a reference for future generations.
This file will attempt to explain how this app works, and what is going into it.

##What Is Webpack?
Webpack is a package used to bundle all of the files within the app.
Here, it is bundling src/client.
Webpack.config.js is the main file.

##File Structure For Talent
There are two main directories, public and src, with one build directory.

Public holds all of the public files within the app, such as images and stylesheets.
It also contains the build within bundle.js, complimentary of Webpack.

The build directory, dist/, is created by Babel.
It's purpose is to compile ES6 syntax down to ES5 syntax.

###src
Src contains the client and the server directories, which reflect the front end and the back end respectively.
We will be going over the server directory first.

####server
Server.js is the main file within the server directory, as well as the entry point for the entire app.
It sets up the express server for the app, points the server to the public directory, and uses the router as middleware.

Within the routes folder are index.js and renderFullPage.js.

RenderFullPage.js is a function that sets up the head of the html that will be used through the browser.
It takes one argument, which will be used as the body of the page.
(This includes, at the bottom of the code, the bundle.js file created by Webpack.)

Index.js listens on all routes for a request and sends that request through the renderFullPage function detailed above.
It takes the component App (which we will discuss later) and wraps it in a StaticRouter component provided by React-Router.
StaticRouter itself establishes a router that never changes its location.
The StaticRouter is wrapped within a Provider, which is a core component of Redux.
We will discuss the Provider within the front end.
All of this is being turned into a string, which is being sent through to renderFullPage, and then sent to the browser.

####client
*Everything beyond the index.js is both the bundle.js script and the body of the html that is sent.*
Index.js is the entry point for the client directory.
It contains a ReactDOM.hydrate function.
ReactDOM.hydrate reads the body, then reads the bundle.js script and passes any eventListeners from the script to the body.
It takes two parameters.
The first is the App, the second is location within the html where the App is placed.
For more information, here is the React docs for hydrate: [Hydrate](https://reactjs.org/docs/react-dom.html#hydrate)

Here, App is wrapped in BrowserRouter.
The BrowserRouter is responsible for deciding which components within App to render based on the current URL.
BrowserRouter is wrapped within a Provider.
The Provider creates a global store based on the reducers. We have also passed in a second parameter to allow for the Redux Dev Tools extension for Chrome to work.


Further on, there are five directories.


NOTES - REMOVE ME AFTERWARD
Package.json needs looking at.
Webpack.config.js needs looking at.
