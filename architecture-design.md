# Talent - Architecture Design
This file is used as a reference for future generations.
This file will attempt to explain how this app works, and what is going into it.

## What Is Webpack?
Webpack is a package used to bundle all of the client side files within the app.
Here, it is bundling src/client.

Webpack.config.js is the main file for Webpack. The entry key points to the start of the app on the client side, which is index.js. Output is configured to look for where to put the finished bundle. It points to the public directory here. Then, module/rules creates rules for Webpack to follow. Exclude tells Webpack what files not to compile into bundle.js. Loader includes modules that help compile the bundle.

Next, we have test. Test looks for file types (in the first case, css), and compiles them down into one bundle file, and then puts that file into the public directory. There is a second test that does the same for js and jsx files. Plugins create the bundled files. ExtractTextPlugin extracts any inline styling and puts in a css file. Resolve - extensions allows users to leave off the extensions of certain files when importing them. Here, any .jsx or .js files do not need to include the file extension when importing the file.

## File Structure For Talent
There are two main directories, public and src, with one build directory.

Public holds all of the public files within the app, such as images and stylesheets.
It also contains the build within bundle.js, complimentary of Webpack.

The build directory, dist, is created by Babel.
It's purpose is to compile ES6 and JSX syntax down to ES5 syntax.
The .babelrc file is what configures Babel to compile down into ES5 syntax.

### src
Src contains the client and the server directories, which reflect the front end and the back end respectively.
We will be going over the server directory first.

#### server
Server.js is the main file within the server directory, as well as the entry point for the entire app.
It sets up the express server for the app, points the server to the public directory (as middleware), and uses the router as middleware.

Within the routes folder are index.js and apiRoutes.js.

apiRoutes.js sets up one route for the app to make an ajax request to. The route, defined as /learners, sends a json file, which is being imported from client/data/mergehelper.js. If you go to the mergeHelper.js file, you'll see that this file goes through all files in the learners director, requires each file, and pushes all of the json files into a single array. That array is then exported and used in the api route /api/learners, and the json that is sent is the result of combining each individual learner's json file into one json file. This json file will be used by the app later on, and we will go into further detail once we get to client - loading section of this document.

Index.js starts off by using the apiRoutes.js file as middleware, under any request made through /api. This middleware needs to go before the following route, as the following route will capture any other request to the talent domain.
Index.js listens on all routes (besides /api/Learners) for a request and sends that request through a node stream.
It begins by writing a static html string that contains the head of the html page and the start of the body. It then uses a method provided by react-dom/server called renderToNodeStream. renderToNodeStream takes the react application, imported from client/components/app, wraps it in a StaticRouter. The app is wrapped in a StaticRouter because this is a single-page application; regardless of what route a user attempts to go to while making a request to the talent domain (other than /api/learners), the express server will always have the same response, so the app is sent in a StaticRouter, as the user will never be going to a different route. The app is also wrapped in a Provider; the Provider is a component provided by react-router, and it always your react application to make use of all the features that Redux provides. We will be going into more detail about what this entails later on. After writing the initial head and body of the html document, the express server will then send over the React app as a stream in chunks. Line 36 is necessary because it tells the browser that express is not yet done streaming after all of the chunks have been sent. This is necessary because on line 37, we send the final portion of the html document, which sends the bundle file created by webpack as a script to the browser, and closes off the html body and document. It then notifies the browser on line 39 that the server has finished its response.

#### client
*Everything beyond the index.js is both the bundle.js script and the body of the html that is sent.*

Index.js is the entry point for the client directory.
It contains a ReactDOM.hydrate function.
If you recall from the server/routes/index.js file, the html sent by our express server to the browser includes both the app sent in a StaticRouter as the body of the html, as well as the bundle file of our app created by webpack sent as a script tag.
ReactDOM.hydrate reads the body of the html page, then reads the bundle.js script that is included at the bottom of the html document. The script and the html body are almost identical, the only difference being that the script is wrapped in a BrowserRouter as opposed to a StaticRouter. Because the difference between the body and the script is so minute, the React developers have created a major optimization. Rather than rendering React components in the html body, evaluating the differences, and then re-rendering the application when the bundle script is read, instead, the ReactDOM.hydrate method will determine what components that already exist in the html body need javascript event listeners, and then attach those event listeners to the components. This prevents the same components from being re-rendered, and instead 'hydrates' the page with event listeners.
ReactDOM.hydrate takes two parameters.
The first is the App (which is wrapped in a Provider and BrowserRouter), the second is the location within the html where the App is appended to.
For more information, here are the React docs for hydrate: [Hydrate](https://reactjs.org/docs/react-dom.html#hydrate)

Here, App is wrapped in BrowserRouter.
The BrowserRouter is responsible for deciding which components within App to render based on the current URL.
BrowserRouter is wrapped within a Provider.
The Provider creates a global store based on the reducers. We have also passed in a second parameter to the Provider to allow for the Redux Dev Tools extension for Chrome to work.

Within client, there are four directories:
- Actions
- Components
- Containers
- Reducers

The design for these files are such that they usually contain a single index file within the folder.

First, we will discuss the Redux-Store. This involves both the actions and the reducers folders. The actions folder creates a set of actions that can update the store. At the top of actions/index.js, three constants are created and exported. Each constant is a string, and these strings are used in the functions below under the type key. In redux, actions are functions that return objects, and those objects must obtain a type key. Other than the type key, these are ordinary objects, and can contain whatever key-value pairs you want to create. These objects must contain a type key, because the reducers in a Redux application use this type key to evaluate which action was sent. The reason types are defined as constants at the top of the file are for maintainability. If at some point it's decided that the type of an action should have a different name, the string only needs to be changed at the top of this file.
Currently in this app, there are three actions.
The first action, startLoading, returns an object with a type key and a loading key. This is the first action sent by our application, and it sets the Redux store loading key to true, which certain components of the application use to determine what to render on the page (more detail provided further on).
The second action, fetchLearners, takes one parameter, allLearners, and saves that parameter as a payload key. The third action, doneLoading, updates the state of the loading key from true to false.

When an action occurs, Redux receives the object sent by the action, that then runs the action against a switch statement. Our switch statement is located within reducers/reducer-learner.jsx. It returns the payload and loading to the index.jsx file within reducers, which then sets a key, guild, to the returned payload. This is then passed into client/index.js, which is used to create the store, through the Provider and Redux's createStore function. You may notice that in the case for DONE_LOADING, the value of learners is being set as state.learners; this is a cool feature of Redux. When an action is sent to a reducer, the reducer receives not only the object that the action sent, but also the previous state. Your reducers can then pass along all or parts of the previous state, by using the state key. In this app, when the DONE_LOADING action is fired, the value of learners is not changed; only the value of loading in the state gets updated.

Next up, we will discuss the components and the containers. Before we start, we've included some diagrams that will hopefully make it more clear what the data flow of this app is.

[Diagram for flow of Redux](https://docs.google.com/drawings/d/1j1Oc8fJSkAeQLeJ_LYULYGkEKk7xytEx4_S5AQNzgbI/edit)

[Diagram for routes that render LearnerGallery](https://docs.google.com/drawings/d/15j-5MBjU5gQc6_1dAVNRga3mr6LfVFtrD2ZzY-UuNUA/edit)

This second diagram is not as extensive, ProfilePage is not used as much as LearnerGallery.
[Diagram for routes that render ProfilePage](https://docs.google.com/drawings/d/1e9H14wywcOTYROhN_BD8ZrRVBHRFmgWHtvSsx73c5So/edit)

App is our root component. App renders TalentNavbar, ErrorBoundary, ScrollToTop, Loading, Footer, and the Switch Statement. Because TalentNavbar, ErrorBoundary, ScrollToTop, Footer, and Loading are outside of the switch statement, they will be rendered on every route.

##### App
TalentNavbar is a component that renders a Navbar with links to various collections of learners, based on the title of the link. Currently, we have Home, which links to / (which renders an about page for Learners Guild), Alumni, which links to /alumni, All Learners, which links to /learners, Current, which links to /current, and Search By Skills, which links to /skills. TalentNavbar is also responsible for updating the Redux store. On line 53, the fetchLearners, startLoading, and doneLoading functions from actions/index.js are being wrapped in a dispatch call. Dispatching is a feature of Redux. When a dispatch is fired, Redux will update the store based on the reducers you have created. Furthermore, mapDispatchToProps will make the actions passed as parameters available as props within TalentNavbar. Finally, mapDispatchToProps will also wrap each action in a dispatch method. This allows you to call the actions as this.props.startLoading() or this.props.doneLoading(), as opposed to a more verbose manner, which would be dispatch(this.props.startLoading()).
In this case, the startLoading action is being fired during the componentWillMount method on line 12. This is a method provided that React; any code in this method will run before the component is mounted into the virtualDOM. Before the component is mounted, it will dispatch the startLoading action, which will set the Redux store to be an object with a loading key set to true. This key is used by our loading container in containers/loading/index.jsx to determine what is rendered on the page. While loading is set to true, a loading spinner is rendered on the page. After the startLoading action is fired on 12, on line 13, we use axios to perform a get request to our api route that we created. After the server responds with a json file, we take the data of that json file and pass it to the fetchLearners action. This will update the Redux store, creating a learners key whose value will be the json object. Finally, on line 16, we fire our doneLoading action, which sets the loading key in the Redux store to false. This means that our loading container will now see that loading is set to false, and rather than rendering a loading spinner, it will render the rest of the application, which uses the values in the json object to display learner images, names, and projects on the page.

##### ErrorBoundary
ErrorBoundary is a component that uses a feature new to React version 16. It uses a react method called componentDidCatch. If any child component of ErrorBoundary throws an error, than ErrorBoundary will catch that error, and update its hasError state to be true. The component will then be re-rendered, and it will render the message "Something Went Wrong". Furthermore, because it is no longer rendering it's children, only the NavBar, Footer, and this message will be rendered. In the near future, it will be a nice image instead of plain text that's rendered. Otherwise, when there are no errors, it will just allow the rest of the components beneath it to render as normal.

##### Loading
Loading is a component that is integrated with Redux. It wraps the rest of our components, and determines what to render based on the Redux store.

On line 17, we use a function called mapStateToProps, which uses ES6 destructuring to take an guild key from an object and return the value of that key as guild in a new object. On line 21, we use react-redux's connect method to map the redux store as a prop to Loading. In essence, this allows us to access the Redux store's guild key as this.props.guild within the Loading container.

On line 10, Loading determines what to render based on the state of the Redux store's loading key. If the loading key is set to true, a loading spinner will be rendered while TalentNavbar fetches the json file from our api route. After the fetch request has finished, the loading key will be set to false, causing Loading to now render its children instead of the loading spinner.

##### Switch
Now, let's move on to the Switch statement.
The Switch statement renders different components based on the URL. This is done through the Routes. Each Route contains a path. Based on the URL, any matching Routes will be rendered. This means that a request to '/' would render '/' and all other routes, as all routes start with '/'. In order to avoid this functionality, our routes are passed the exact keyword, so that only routes that match the request exactly will be rendered. Each route also contains either a component method or a render method. The  component method renders a component. The render method is used to not only render a component but also pass in props. At the bottom, we have a ScrollToTop component, which automatically scrolls the page to the top on refresh/re-render. We also have a Footer component, which renders a footer on every page of our application.

Next, we will go into detail about each Route.

##### LearnerGallery
We're going to start with the LearnerGallery container, as it's responsible for most of the app. The first notable part of this page is the mapStateToProps function on Line 99. It uses ES6 de-structuring (feel free to look this up!) to take the value of an object and return a new object with that key value pair. On Line 103, it is exported with the connect method, from React-Redux, which creates a prop available to the component as this.props.value. In this case, it is guild. Connect is going to look at the Redux-Store, and then map that store as a prop.

Now, as we return to the top, we import what we need, and create a component. It starts with a constructor, which is passed props. This then calls super on props. It binds the value of this to handleChange. This is important, otherwise when handleChange refers to this, the value of this would be the window object and not the class. The constructor also sets the state, which is a key-value pair. Specifically, it creates a selectedLearners key by calling either the filterByType method if there is a type prop, or the filterBySkill if there is not.

If you refer back to app/index.jsx, you can see based on the route a different type is passed to LearnerGallery. This passes the value to filterLearner, which changes the state. FilterLearner will return all the alumni, all the current, or all the learners based on the type passed. In the skillsresults/:searchskill route, LearnerGallery is not passed a type. This will allow the learners who appear on the page to be based on their skills, rather than their current enrollment status at the Guild.

After the initial loading process, the render method will render a search bar and the CollectionPage container. The search bar has an onChange handler, which points to handleChange on Line 24.

Whenever a user types in the search bar, the state is updated based on the value of the search bar. This, in turn, causes the page to re-render, which causes filterByName to re-evaluate with the value of the search bar.

FilterByName, located on Line 29, starts by checking if it was passed a type. If yes, then it will call filterByType with the current type. Then, it checks to see if the state of currentView is an array, which on page load, it is. As soon as the user types, however, currentView becomes a string, and now the method will return all of the learners whose name includes the value of the search bar. This value is in turn passed onto the CollectionPage container as a data-prop.

If there is no type passed to FilterByName, this is because the LearnerGallery container was rendered as result of searching for a skill. If you look back to components/app/index, on line 29, this is the route that was fired. If LearnerGallery was rendered by this route, then FilterByName will set the state of filteredLearner to be the result of the filterBySkill method located on line 46. filterBySkill will look at the URL, and then grab the skills from a property that React-Router assigns to props, thus this.props.match.params.searchSkill. Next, it takes all of the learners skills and puts them into an array. Then it compares the learners to the skills and returns the learners who have all those skills.

##### CollectionPage
CollectionPage, which is rendered by LearnerGallery, receives an info prop, which is a static object that contains two keys, a name and a story. It also receives a projects-prop, which is determined by the getProjects method.

GetProjects, defined on Line 78, takes an array of objects and returns all of the projects keys from those objects.

Next up is the CollectionPage container. It's less complicated, as it contains a Blurb component, a UserGallery component, and a Project component. All this container does is pass what it received onto other components. It exists to make LearnerGallery shorter.

Blurb is another a simple component that is passed an object, and then renders a title with the name property, and a paragraph with the story property.

UserGallery is a simple component that renders a header and passes the UserBadge component the data prop that is was passed.

UserBadge takes an array of learners and displays several images, each with a learner's face that links to the individual learner's profile page. Below each image, it renders the learner's name.

Projects is a component that takes an array of projects and renders a link to every one of those projects. The text for the links is the project's name.

##### ProfilePage
The next block of components is contained within the Profile container. Similar to LearnerGallery, ProfilePage has the Redux-Store mapped as a prop. This container starts by getting the value of the URL through this.props.match.url. It removes /learners/ from this value (this is the learner's GitHub Handle). It then uses the GitHub Handle to filter through the Redux-Store and return all the information of the learner whose GitHub Handle this is (this is happening on Line 11, in the filterLearner method). Then, ProfilePage renders a Profile component, an ExperienceList component, a SkillList component, and the Projects component detailed earlier.

Profile is a component that takes an object and displays all of the information within that object. It renders a header with the learner's name, the learner's image, and the Blurb component (which is passed the whole learner, but only takes the name and story). It also renders a dropdown menu with links to their GitHub, their LinkedIn, and their Twitter.

ExperienceList takes an array of the learner's experience, and renders a header and a list of the experiences.

SkillsList does the same thing, but with the learner's skills.


##### SkillsSearch
The second largest component is SkillsSearch. This component is rendered when the user navigates to the skills page. Similar to our two containers, SkillsSearch has the Redux-Store mapped as a prop. In the constructor, most of what occurs is binding the value of this to all the methods. Otherwise, the state is initialized with the value of calling the establishNames method. The establishNames method calls the filterDuplicates method, which calls the grabSkills method.

GrabSkills takes all of the skills from the Redux-Store and returns an array of those skills.

FilterDuplicates filters out all of the duplicates from that array, and returns a new one.

EstablishNames creates an object, assigns each skill as a key in this object with a value of false, and then returns the object.

The render function on Line 80 renders a form with a list that calls renderExperienceList, and a Link that contains a button, that links to the result of calling findLearners.

RenderExperienceList calls filterDuplicates and returns a list of every skill as checkbox inputs that each have a value and an onChange event listener.

The handleChange method looks at a checkbox's value, determines whether or not it is checked (which in this case is called off because html has declared that a checkbox that is off is actually checked), and toggles the value. Then, it sets the state at the checkbox's name to have the toggled value of the checkbox.

FindLearners is a method that looks at the state, determines whether or not a checkbox is currently checked, and if it is, it returns a string of all the checked skills. This, in turn, is the link the users will go to when they click the submit button. This route will render LearnerGallery, which is passed no type, and thus renders a list of learners based on the skills in the URL.

##### Footer
Footer is a simple component that renders a sticky footer on the bottom of the page that contains copyright information and information about Learners Guild.

##### ScrollToTop & NotFound
The last two components are ScrollToTop and NotFound.

ScrollToTop uses the componentDidUpdate lifecycle hook that React provides to determine if the location of the window has changed whenever this component updates (which will occur every time the component is re-rendered). If the location of the window has changed, the page will scroll to the top of the window. Render is null here, because, in React, the render method must be called even if nothing is returned. We're exporting withRouter to ensure it has access to the router's location props.

NotFound is component that renders when the URL does not match any existing routes. It renders a picture.

### Congratulations!
Congratulations! You have made it through this long block of text. Thank you for reading this. We greatly appreciate you looking into this App. Feel free to talk to contact us through our GitHub accounts if you have further questions.

- Doug (handle hhhhhaaaa) and Patrick (handle pkallas)

NOTES - REMOVE ME AFTERWARD
Lecture - We're gonna work on it when we come back.

UPDATED
Add testing section.
