#Talent - Architecture Design
This file is used as a reference for future generations.
This file will attempt to explain how this app works, and what is going into it.

##What Is Webpack?
Webpack is a package used to bundle all of the client side files within the app.
Here, it is bundling src/client.

Webpack.config.js is the main file for Webpack. The entry points to the start of the app on the client side, which is index.js. Output is configured to look for where to put the finished bundle. It points to the public directory here. Then, module/rules creates rules for Webpack to follow. Exclude tells Webpack what files not to compile into bundle.js. Loader includes modules that help compile the bundle.

Next, we have test. Test looks for file types (in this case, css), and compiles them down and puts them into the public directory. There is also a test that does the same for js and jsx files. Plugins create the bundled files. ExtractTextPlugin extracts any inline styling and puts in a css file. Resolve - extensions allows users to leave off the extensions of certain files when importing them. Here, .jsx resolves to .js.

##File Structure For Talent
There are two main directories, public and src, with one build directory.

Public holds all of the public files within the app, such as images and stylesheets.
It also contains the build within bundle.js, complimentary of Webpack.

The build directory, dist/, is created by Babel.
It's purpose is to compile ES6 and JSX syntax down to ES5 syntax.
The .babelrc file tells it to do this.

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

Further on, there are four directories:
- Actions
- Components
- Containers
- Reducers

The design for these files are such that they usually contain a single index file within the folder.

First, we will discuss the Redux-Store. This involves both the actions and the reducers folders. The actions folder creates a set of actions that can update the store. Currently in this app, there is only one action that makes a call to the database and returns an object with the data set to a payload key. In Redux, actions must return an object with a type key.

When an action occurs, Redux receives the object sent by the action, that then runs the action against a switch statement. Our switch statement is located within reducers/reducer-learner.jsx. It returns the payload to the index.jsx file within reducers, which then sets a key, learners, to the returned payload. This is then passed into client/index.js, which is used to create the store, through the Provider and Redux's createStore function


Next up, we will discuss the components and the containers. App is our root component. App renders TalentNavbar at the top of every page.

TalentNavbar is a component that links to various collections of learners, based on its title. Currently, we have Home, which links to / (which renders current learners), Alumni, which links to /alumni, All Learners, which links to /learners, and Search By Skills, which links to /skills.

Then there's the Switch statement which renders different components based on the URL. Then there are the Routes. Each Route contains a path. Based on the URL, only one Route will be displayed, as shown by the path. It contains either a component method or a render method. Component method renders a component. Render method is used to not only render a component but also pass in props. At the bottom, we have a ScrollToTop component, which automatically scrolls the page to the top on refresh/re-render.

We're going to start with the LearnerGallery container, as it's responsible for most of the app. The first notable part of this page is the mapStateToProps function on Line 83. It uses ES6 de-structuring (feel free to look this up!) to take the value of an object and return a new object with that key value pair. On Line 87, it is exported with the connect method, from React-Redux, which creates a prop available to the component as this.props.value. In this case, it is learners. Connect is going to look at the Redux-Store, and then map that store as a prop.

Now, as we return to the top, we import what we need, and create a component. It starts with a constructor, which is passed props. This then call super on props. It binds the value of this to handleChange. This is important, otherwise when handleChange refers to this, this would equal the window and not the class. The constructor also sets the state, which is a key-value pair. Specifically, it creates a currentView by calling the filterLearner method defined on Line 33, and passing it this.props.type.

If you refer back to app/index.jsx, you can see based on the route a different type is passed to LearnerGallery. This passes the value to filterLearner, which changes the state. FilterLearner will return all the alumni, all the current, or all the learners based on the type passed. If it's not passed a type, this is because the component was called by skillsSearch. In this case, filterLearner will look at the URL, and then grab the skills from a property that React-Router assigns to props, thus this.props.match.params.searchSkill. Next, it takes all of the learners skills and puts them into an array. Then it compares the learners to the skills and returns the learners who have all those skills.

Now, we head to the render method on Line 67. This renders a search bar and the CollectionPage container. The search bar has an onChange handler, which points handleChange on Line 16.

Whenever a user types in the search bar, the state is updated based on the value of the search bar. This, in turn, causes the page to re-render, which causes filterByName to re-evaluate with the value of the search bar.

FilterByName, located on Line 21, starts by calling filterLearner with the current type. Then, it checks to see if the state of currentView is an array, which on page load, it is. As soon as the user types, however, currentView becomes a string, and now the method will return all of the learners whose name starts with the value of the search bar. This value is in turn passed onto the CollectionPage container as a data-prop.

CollectionPage also receives an info prop, which is a static object that contains two keys, a name and a story. Finally, it also receives a projects-prop, which is determined by the getProjects method.

GetProjects, defined on Line 62, takes an array of objects and returns all of the projects keys from those objects.

Next up is the CollectionPage container. It's less complicated, as it contains a Blurb component, a UserGallery component, and a Project component. All this container does is pass what it received onto other components. It exists to make LearnerGallery shorter.

Blurb is another a simple component that is passed an object, and then renders a title with the name property, and a paragraph with the story property.

UserGallery is a simple component that renders a header and passes the UserBadge component the data prop that is was passed.

UserBadge takes an array of learners and displays several images, each with a learner's face that links to the individual learner's profile page. Below each image, it renders the learner's name.

Projects is a component that takes an array of projects and renders a link to the everyone of those projects. The text for the links is the project's name.

The next block of components is contained within the Profile container. Similar to LearnerGallery, ProfilePage has the Redux-Store mapped as a prop. This container starts by getting the value of the URL through this.props.match.url. It removes /learners/ from this value (this is the learner's GitHub Handle). It then uses the GitHub Handle to filter through the Redux-Store and return all the information of the learner whose GitHub Handle this is (this is happening on Line 11, in the filterLearner method). Then, ProfilePage renders a Profile component, an ExperienceList component, a SkillList component, and the Projects component detailed earlier.

Profile is a component that takes an object and displays all of the information within that object. It renders a header with the learner's name, the learner's image, and the Blurb component (which is passed the whole learner, but only takes the name and story). It also renders a dropdown menu with links to their GitHub, their LinkedIn, and their Twitter.

*****Finally, it renders a button, that when clicked, renders a modal.*****

ExperienceList takes an array of the learner's experience, and renders a header and a list of the experiences.

SkillsList does the same thing, but with the learner's skills.

The second largest component is SkillsSearch. This component is rendered when the user navigates to the skills page. Similar to our two containers, SkillsSearch has the Redux-Store mapped as a prop. In the constructor, most of what occurs is binding the value of this to all the methods. Otherwise, the state is initialized with the value of calling the establishNames method. The establishNames method calls the filterDuplicates method, which calls the grabSkills method.

GrabSkills takes all of the skills from the Redux-Store and returns an array of those skills.

FilterDuplicates filters out all of the duplicates from that array, and returns a new one.

EstablishNames creates an object, assigns each skill as a key in this object with a value of false, and then returns the object.

The render function on Line 83 renders a form with a list that calls renderExperienceList, and a Link that contains a button, that links to the result of calling findLearners.

RenderExperienceList calls filterDuplicates and returns a list of every skill as checkbox inputs that each have a value and an onChange event listener.

The handleChange method looks at a checkbox's value, determines whether or not it is checked (which in this case is called off because html has declared that a checkbox that is off is actually checked), and toggles the value. Then, it sets the state at the checkbox's name to have the toggled value of the checkbox.

FindLearners is a method that looks at the state, determines whether or not a checkbox is currently checked, and if it is, it returns a string of all the checked skills. This, in turn, is the link the users will go to when they click the submit button. This route will render LearnerGallery, which is passed no type, and thus renders a list of learners based on the skills in the URL.

The last two components are ScrollToTop and NotFound.

ScrollToTop uses the componentDidUpdate lifecycle hook that React provides to determine if the location of the window has changed whenever this component updates (which will occur every time the component is re-rendered). If the location of the window has changed, the page will scroll to the top of the window. Render is null here, because, in React, the render method must be called even if nothing is returned. We're exporting withRouter to ensure it has access to the router's location props.

NotFound is component that renders when the URL does not match any existing routes. It renders a picture.

Congratulations! You have made it through this long block of text. Thank you for reading this. We greatly appreciate you looking into this App. Feel free to talk to contact us through our GitHub accounts if you have further questions.

- Doug (handle hhhhhaaaa) and Patrick (handle pkallas)

NOTES - REMOVE ME AFTERWARD
Lectures
Google Form

TESTING
End To End
Profile Page

UPDATED
Loading for learner gallery container.
Reducer change.
ComponentWillMount on navbar.
ErrorBoundary.
Add testing section.

TODO WITH SEPS
Config/Environment files
"Text Content Did Not Match" on individual profile refresh.
