# Talent - Architecture Design
This file is used as a reference for future generations.
This file will attempt to explain how this app works, and what is going into it.
Before diving into how the project works, here are some slides on how the project came to be, and the planning that took place at the project's beginning.

[Slides](https://docs.google.com/presentation/d/1lBsVQJuStLi7TL7taZzptE7CWdLCZ1NSTz6Z9_B5tvY/edit)
[Notes](https://docs.google.com/document/d/10LeqSeaDLKBVAXFn7o9y5hjU6HqrUsD0cWZRXQvA6xY/edit)

## What Is Webpack?

### Out of date, needs to be updated once css bundling is complete!
### Don't read me!
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
It begins by writing a static html string that contains the head of the html page and the start of the body. It then uses a method provided by react-dom/server called renderToNodeStream. renderToNodeStream takes the react application, imported from client/components/app, wraps it in a StaticRouter. The app is wrapped in a StaticRouter because this is a single-page application; regardless of what route a user attempts to go to while making a request to the talent domain (other than /api/learners), the express server will always have the same response, so the app is sent in a StaticRouter, as the user will never be going to a different route. The app is also wrapped in a Provider; the Provider is a component provided by react-router, and it allows your react application to make use of all the features that Redux provides. We will be going into more detail about what this entails later on. After writing the initial head and body of the html document, the express server will then send over the React app as a stream in chunks. Line 46 is necessary because it tells the browser that express is not yet done streaming after all of the chunks have been sent. This is necessary because on line 48, we send the final portion of the html document, which sends the bundle file created by webpack as a script to the browser, and closes off the html body and document. It then notifies the browser on line 47 that the server has finished its response.

#### Isomorphic rendering
The above section is using a technique known as isomorphic rendering.
Below is a link to some slides and notes for the slide on a presentation that was given about Isomorphic Rendering and the Talent app.

[Slides](https://docs.google.com/presentation/d/1nMelRLwpLOmpxXBQ6H7TxFrAheaDGuWDC7sreQeBKQA/edit)
[Notes](https://docs.google.com/document/d/1lfhRGC82_yDXQjUOuq3yQVQ97Ccba4V-K9WknYPnjmQ/edit)

In isomorphic rendering, the code that is being rendered by the server is nearly identical to the code that is being run by the web browser on the client side. The difference in the code comes in at the client/index.js file. Both the server and client/index are requiring the App component, but the server is wrapping App in a Static Router, whereas the client is wrapping the App in a Browser Router. This has the effect of keeping the location constant on the server-side, but allowing the location to change on the client-side as a user clicks on links. However, as the location on the server-side never changes, a request is never sent to the server to re-render the App.
It's also important to remember that through the renderToNodeStream method, the server is only responding with a stream of code chunks, that ultimately get compiled down to one html string that is the body of the application. At the end of the stream, a script tag is sent, and that script tag is the compiled bundle.js file that Webpack created. It is this bundle file that gives the application JavaScript functionality. This is important to note because, even if the client has decided that they want to disable JavaScript, the application can still be rendered on the page as an html string, it just won't have any event listeners or be able to perform any AJAX requests.

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

First, we will discuss the Redux-Store. This involves both the actions and the reducers folders. The actions folder creates a set of actions that can update the store. At the top of actions/index.js, five constants are created and exported. Each constant is a string, and these strings are used in the functions below under the type key. In redux, actions are functions that return objects, and those objects must contain a type key. Other than the type key, these are ordinary objects, and can contain whatever key-value pairs you want to create. These objects must contain a type key, because the reducers in a Redux application use this type key to evaluate which action was sent. The reason types are defined as constants at the top of the file are for maintainability. If at some point it's decided that the type of an action should have a different name, the string only needs to be changed at the top of this file.
Currently in this app, there are three actions.
The first action, startLoading, returns an object with a type key and a loading key. This is the first action sent by our application, and it sets the Redux store loading key to true, which certain components of the application use to determine what to render on the page (more detail provided further on).
The second action, fetchLearners, takes one parameter, allLearners, and saves that parameter as a payload key. The third action, doneLoading, updates the state of the loading key from true to false.

When an action occurs, Redux receives the object sent by the action, that then runs the action against the reducers that were passed to the Provider (in src/client/index on line 10). Our switch statement is located within reducers/reducer-learner.jsx. Depending on the action that was sent, one of five cases will occur, based on the action's type. If a case is matched, the reducer will return an object that will be the new state in the Redux store. In some cases, it will only have one key-value pair, but in our app, the new state may have three key-value pairs. Going in order, the first case, START_LOADING, will set the state to have a loading key, and its value will be equal to the action's loading key (in this case, the boolean true). The second case, FETCH_LEARNERS, will set the state to have a learners key and a loading key. The learners key will be the combination of every learner's information here at the guild (we will go into more detail later on). The value of the loading key will still be set to true. In DONE_LOADING, the new state will have three keys, learners, loading, and exists. The learners key will be set to state.learners; this is important to note. If you look at line 3, the reducer receives two arguments, a state and an action. Whenever an action is dispatched, the reducer receives the value of the previous state along with the action. If you do not want to set alter the previous version of the state, you can set the new state to have the same key, and pass the value as state.key. On line 16, we are doing exactly that, by setting the value of learners to state.learners, which is the value that was set by the FETCH_LEARNERS action.

Next up, we will discuss the components and the containers. Before we start, we've included some diagrams that will hopefully make it more clear what the data flow of this app is.

[Diagram for flow of Redux](https://docs.google.com/drawings/d/1j1Oc8fJSkAeQLeJ_LYULYGkEKk7xytEx4_S5AQNzgbI/edit)

[Diagram for routes that render LearnerGallery](https://docs.google.com/drawings/d/15j-5MBjU5gQc6_1dAVNRga3mr6LfVFtrD2ZzY-UuNUA/edit)

This second diagram is not as extensive, ProfilePage is not used as much as LearnerGallery.
[Diagram for routes that render ProfilePage](https://docs.google.com/drawings/d/1e9H14wywcOTYROhN_BD8ZrRVBHRFmgWHtvSsx73c5So/edit)

App is our root component. App renders ErrorBoundary, TalentNavbar, ScrollToTop, Loading, Footer, and the Switch Statement. Because ErrorBoundary, TalentNavbar, ScrollToTop, Footer, and Loading are outside of the switch statement, they will be rendered on every route.

##### App

##### ErrorBoundary
ErrorBoundary is a component that uses a feature new to React version 16. It uses a react method called componentDidCatch. If any child component of ErrorBoundary throws an error, than ErrorBoundary will catch that error, and update its hasError state to be true. The component will then be re-rendered, and it will render the message "Something Went Wrong". Furthermore, because it is no longer rendering it's children, only this message will be rendered. In the near future, it will be a nice image instead of plain text that's rendered. Also in the future, a better logging system will be implemented (first attempt was lines 19 - 24). Otherwise, when there are no errors, it will just allow the rest of the components beneath it to render as normal.

#### TalentNavbar
TalentNavbar is a container that renders a Navbar with links to various collections of learners, based on the title of the link. It is located in src/client/containers/talentNavbar. The links are located from lines 52-64. Currently, we have Home, which links to / (which renders the splashRNG container, covered in more detail later), Alumni, which links to /alumni, All Learners, which links to /learners, Current, which links to /current, and Search By Skills, which links to /skills. TalentNavbar is also responsible for updating the Redux store. On line 84, the fetchLearners, startLoading, and doneLoading functions from actions/index.js are being wrapped in a dispatch call. Dispatching is a feature of Redux. When a dispatch is fired, Redux will update the store based on the reducers you have created. Furthermore, mapDispatchToProps on line 83 will make the actions passed as parameters available as props within TalentNavbar. Finally, mapDispatchToProps will also wrap each action in a dispatch method. This allows you to call the actions as this.props.startLoading() or this.props.doneLoading(), as opposed to a more verbose manner, which would be dispatch(this.props.startLoading()).
In this case, the startLoading action is being fired during the componentWillMount method on line 16. This is a method provided that React; any code in this method will run before the component is mounted into the virtualDOM. Before the component is mounted, it will dispatch the startLoading action, which will set the Redux store to be an object with a loading key set to true. This key is used by our loading container in containers/loading/index.jsx to determine what is rendered on the page. While loading is set to true, a loading spinner is rendered on the page. After the startLoading action is fired on 17, on line 18, we use axios to perform a get request to our api route that we created. After the server responds with a json file, we take the data of that json file and pass it to the fetchLearners action. This will update the Redux store, creating a learners key whose value will be the json object. Then, on line 21, we fire our doneLoading action, which sets the loading key in the Redux store to false. This means that our loading container will now see that loading is set to false, and rather than rendering a loading spinner, it will render the rest of the application, which uses the values in the json object to display learner images, names, and projects on the page.
*This next section will soon be deprecated, so don't expect the codebase to behave this way in the future*
#### Soon to be deprecated - IS NOW DEPRECATED FOR THE TIME BEING, IGNORE ME
On line 79 in TalentNavbar, the container is mapped to the Redux store through a function called mapStateToProps. We will not go into detail over how this works, because this functionality may be removed in the near future. Just know that TalentNavbar is aware of the Redux store thanks to this function and the connect method on line 87.
On line 23, TalentNavbar is using the window.innerWidth property to determine if the user is browsing our site on a mobile device. If so, an action is fired which will hide the navbar from the current view.
#### Soon to be deprecated section is now over

##### Loading
Loading is located in src/client/containers/loading.
Loading is a component that is integrated with Redux. It wraps the rest of our components, and determines what to render based on the Redux store.

On line 17, we use a function called mapStateToProps, which uses ES6 destructuring to take a guild key from an object and return the value of that key as guild in a new object. On line 21, we use react-redux's connect method to map the redux store as a prop to Loading. In essence, this allows us to access the Redux store's guild key as this.props.guild within the Loading container.

On line 10, Loading determines what to render based on the state of the Redux store's loading key. If the loading key is set to true, a loading spinner will be rendered while TalentNavbar fetches the json file from our api route. After the fetch request has finished, the loading key will be set to false, causing Loading to now render its children instead of the loading spinner.

Due to the connect method on line 21, Loading is configured to be "subscribed" to the Redux store.
[Redux docs](https://redux.js.org/)
If you go to the Gist section of the Read Me (or alternatively search for 'subscribe' using cmd + f) you can see more details.
Any container that is subscribed to the Redux store will be notified whenever the Redux store is changed, and then act accordingly. In this way, when the Redux store eventually changes to no longer be loading, the Loading container see the new state, and realize that it needs to re-render based on the ternary operator on line 10.

##### Switch
Now, let's move on to the Switch statement.
The Switch statement renders different components based on the URL. This is done through the Routes. Each Route contains a path. Based on the URL, any matching Routes will be rendered. This means that a request to '/' would render '/' and all other routes, as all routes start with '/'. In order to avoid this functionality, our routes are passed the exact keyword, so that only routes that match the request exactly will be rendered. Each route also contains either a component method or a render method. The  component method renders a component. The render method is used to not only render a component but also pass in props. At the bottom, we have a ScrollToTop component, which automatically scrolls the page to the top on refresh/re-render. We also have a Footer component, which renders a footer on every page of our application.

Next, we will go into detail about the components/containers that are rendered on each Route.

##### splashRNG
Located within src/client/containers/splashRNG.
The first notable part of this page is the mapStateToProps function on Line 72. It uses ES6 de-structuring (feel free to look this up!) to take the value of an object and return a new object with that key value pair. On Line 76, it is exported with the connect method, from React-Redux, which creates a prop available to the component as this.props.value. In this case, it is guild. Connect is going to look at the Redux-Store, and then map that store as a prop. Similar to the Loading container, SplashRNG will be subscribed to the Redux store through this connect method, and thus, SplashRNG will be notified whenever the Redux store is changed.

The next notable aspect of this container is the constructor on line 7, which is passed a props argument. It calls super on the props, which passes on the parent classes methods to this container. This allows us to use the methods that React provides on its components, such as componentDidMount or componentDidCatch. Lines 9-11 bind the value of this to the various methods within SplashRNG. On line 12, we create a local state for the container, which has two keys, selectedProjects and selectedLearners, which both start as an array.

The first method, rngProjects, begins on line 18. This method creates a new array and determines how many learners there are in the Redux store, through this.props.guild.learners.length. It then starts a for loop on line 21 that will run 8 times. Each iteration of the loop, a random number will be generated from 0 to the number of Learners in the Guild. Then, the method will check if the chosenProjects array includes the chosen Learner's first project. If it does, it will decrement i and try again in the next iteration. If it does not, it will push that object into the chosenProjects array. Finally, once the loop has concluded, on line 31, the local state of rngProjects will be updated, and selectedProjects will now be equal to the chosenProjects array. If you look to line 48, rngProjects is being invoked in a handleClickProjects method, which itself is being passed as an onClick handler to a button that is rendered on line 65.

The second method, rngLearners, is very similar to rngProjects. The main difference is rather than pushing projects into a new array, it pushes six learners into a new array and sets the state of selectedLearners afterwards on line 45. It is invoked in the handleClickLearners method on line 52, and passed as an onClick handler to a button that is rendered on line 66.

On line 56, we use React's Components built in componentDidMount method to invoke both rngProjects and rngLearners. This has the effect that when SplashRNG is first rendered, whenever a user goes to the '/' route of our url, of running these two methods. The results of these methods are then passed to our LandingPage component that is rendered on line 64 as a projectsArray prop and a learnersArray prop.

##### LandingPage
Compared to the containers and components we've seen so far, LandingPage is doing much less work. You may notice that there is no connect method being used in this file. LandingPage is unaware that the Redux store exists. As far as LandingPage is concerned, it just needs to receive two props, projectsArray and learnersArray. It receives those props from SplashRNG and then passes the props along to the Projects container on lines 27 and 30, and the UserBadge container on line 37. On line 6, we declare a blurbInfo constant that is an object that contains some text that will be passed to the Blurb component on line 35. We'll discuss what Blurb does later. This constant will rarely change, as it's just text that will be displayed as a header and paragraph on the home page.

Other than the containers and the components mentioned above, LandingPage will always render some static html, with classes assigned to divs for styling purposes.

##### LearnerGallery
Next is the LearnerGallery container, and it's responsible for most of the app. The first notable part of this page is the mapStateToProps function on Line 108. It uses ES6 de-structuring (feel free to look this up!) to take the value of an object and return a new object with that key value pair. On Line 112, it is exported with the connect method, from React-Redux, which creates a prop available to the component as this.props.value. In this case, it is guild. Connect is going to look at the Redux-Store, and then map that store as a prop.

Now, as we return to the top, we import what we need, and create a component. It starts with a constructor, which is passed props. This then calls super on props. It binds the value of this to handleChange on line 22. This is important, otherwise when handleChange refers to this, the value of this would be the window object and not the class. The constructor also sets the state, which is a key-value pair. Specifically, it creates a selectedLearners key by calling either the filterByType method if there is a type prop, or the filterBySkill method, passing it the skills based on the url if there is not.

If there is no type passed to FilterByName, this is because the LearnerGallery container was rendered as result of searching for a skill. If you look back to components/app/index, on line 29, this is the route that was fired. If LearnerGallery was rendered by this route, then FilterByName will set the state of filteredLearner to be the result of the filterBySkill method located on line 53. filterBySkill will look at the URL, and then grab the skills from a property that React-Router assigns to props. Note, LearnerGallery has access to the url thanks to the react-router BrowserRouter method. BrowserRouter will add a match props to any component rendered by BrowserRouter, and if the url contains a url parameter, it will further create a params object with the url parameters defined in that route. This can be seen as this.props.match.params.searchSkill on line 16. We are running the url against a regular expression to remove the search= and only grab the various skills. Next, it takes all of the learners skills and puts them into an array. Then it compares the learners to the skills and returns the learners who have all those skills.

If you refer back to app/index.jsx, you can see based on the route a different type is passed to LearnerGallery. This passes the value to filterByType on line 71, which will then return only current learners, alumni, or all learners based on the type prop it was provided.

After the initial loading process, the render method will render a search bar and the CollectionPage container on lines 95-102. The search bar has an onChange handler, which points to handleChange on Line 25.

Whenever a user types in the search bar, the handleChange method is invoked, and the state is updated based on the value of the search bar. This, in turn, causes the page to re-render, which causes filterByName to re-evaluate with the value of the search bar.

FilterByName, located on Line 30, starts by checking if LandingPage has a type prop. If yes, then it will call filterByType with the current type. Otherwise, it will call filterBySkill and pass along the skills seen in the url. Then, it checks to see if the state of currentView is an array, which on page load, it is. This is important, because CollectionPage on line 98 is being passed the value returned by FilterByName in its data and projects props. When the page is first loaded, with these checks in place, FilterByName will pass along either the value of filterBySkill or filterByType without altering their values. filterByName has a third check, however, on line 38. It checks to see if the value of the selectedLearners local state is an array. On page load, it will be, but as a user types, due to the handleChange method on line 25, the value of selectedLearners changes from an array to a string. As this happens, filterByName will now see if the value being typed is a skill. It invokes filterBySkill with the search-term on line 43. If no matches were found, it will then attempt to search by name on line 47.

What does this mean in practice? When the page first loads, all learners with either the appropriate type or skills are displayed on the page. As a user starts typing in the search bar, the state of selectedLearners is constantly updated. This causes LearnerGallery to run the render method on line 92, which causes filterByName to be fired. filterByName will see that a user is typing into the search bar by seeing that the selectedLearners key in the local state is no longer an array. It will then try to find all learners who were previously on the page with the skill the user is typing, and if none were found, it will then try to find all learners with the name the user was typing. This has the effect of changing which Learners are displayed on the page as a user is typing. Ergo, REACT IS AWESOME!

##### Check on this final method, may be deprecated in the future
The final method, getProjects, defined on line 87, grabs the projects from the Redux store, and flattens them out into one array, as they are currently nested in multiple arrays.

##### CollectionPage
CollectionPage is located src/clients/containers/collection.
CollectionPage, which is rendered by LearnerGallery, receives an info prop, which is a static object that contains two keys, a name and a story. It also receives a projects-prop, which is determined by the getProjects method.

CollectionPage is less complicated, as it contains a Blurb component, a UserGallery component, and a Project component. All this container does is pass what it received onto other components. It exists to make LearnerGallery shorter.

Blurb is another a simple component that is passed an object, and then renders a title with the name property, and a paragraph with the story property. It is located in src/client/components/blurb.

UserGallery is a simple component that renders a header and passes the UserBadge component the data prop that is was passed.
It is located in src/client/containers/collection/userGallery.

UserBadge takes an array of learners and displays several images, each with a learner's face that links to the individual learner's profile page. Below each image, it renders the learner's name. It is located in src/client/containers/collection/userBadge.

Projects is a component that takes an array of projects and renders a link to every one of those projects. The text for the links is the project's image (which is confusingly under the name key, the data store hasn't been updated yet). Projects is located in src/client/components/projects.

##### ProfilePage
ProfilePage is located in src/client/containers/profile.
The next block of components is contained within the Profile container. Similar to LearnerGallery, ProfilePage has the Redux-Store mapped as a prop. This container starts by getting the value of the URL through this.props.match.url on line 23. It removes /learners/ from this value (this is the learner's GitHub Handle). It then uses the GitHub Handle to filter through the Redux-Store and return all the information of the learner whose GitHub Handle this is (this is happening on Line 11, in the filterLearner method). Then, ProfilePage renders a Profile component, an ExperienceList component, a SkillList component, and the Projects component detailed earlier.

Profile is a component that takes an object and displays all of the information within that object. It renders a header with the learner's name, the learner's image, and the Blurb component (which is passed the whole learner, but only takes the name and story). It also renders a dropdown menu with links to their GitHub, their LinkedIn, and their Twitter.
It is located in src/client/containers/profile/profile.

##### These next two items will be deprecated in the future as ExperienceList and SkillsList are refactored
ExperienceList takes an array of the learner's experience, and renders a header and a list of the experiences.
It is located in src/client/components/experienceList.

SkillsList does the same thing, but with the learner's skills.
It is located in src/client/components/skillList.
##### Replace this section after it becomes deprecated

##### SkillsSearch
SkillsSearch is located in src/client/containers/skillsSearch.
The second largest component is SkillsSearch. This component is rendered when the user navigates to the skills page. Similar to our two containers, SkillsSearch has the Redux-Store mapped as a prop on line 97. In the constructor, most of what occurs is binding the value of this to all the methods. Otherwise, the state is initialized with the value of calling the establishNames method. The establishNames method calls the filterDuplicates method, which calls the grabSkills method.

GrabSkills on line 59 takes all of the skills from the Redux-Store (through this.props.guild.learners) and returns an array of those skills.

FilterDuplicates on line 47 filters out all of the duplicates from that array, and returns a new one. It does so using the built in includes array method.

EstablishNames on line 39 creates an object, assigns each skill as a key in this object with a value of false, and then returns the object.

The render function on Line 80 renders a form with a list that calls renderExperienceList, and a Link that contains a submit button, that links to the result of calling findLearners.

RenderExperienceList, invoked on line 85 to render a list of all experiences, calls filterDuplicates and returns a list of every skill as checkbox inputs that each have a value and an onChange event listener. The method itself is defined on line 18.

The handleChange method on line 30 looks at a checkbox's value, determines whether or not it is checked (which in this case is called off because html has declared that a checkbox that is off is actually checked), and toggles the value. Then, it sets the state at the checkbox's name to have the toggled value of the checkbox. You'll notice that this handleChange is applied to every list item rendered by renderExperienceList on line 23 through an onChange event handler.

FindLearners on line 69 is a method that looks at the state, determines whether or not a checkbox is currently checked, and if it is, it returns a string of all the checked skills. This, in turn, is the link the users will go to when they click the submit button. This route will render LearnerGallery, which is passed no type, and thus renders a list of learners based on the skills in the URL.

##### Footer
Footer is located in src/client/components/footer.
Footer is a simple component that renders a sticky footer on the bottom of the page that contains copyright information and information about Learners Guild.

##### ScrollToTop & NotFound
The last two components are ScrollToTop and NotFound.
There are both located in the src/client/components directory.

ScrollToTop uses the componentDidUpdate lifecycle hook that React provides to determine if the location of the window has changed whenever this component updates (which will occur every time the component is re-rendered). If the location of the window has changed, the page will scroll to the top of the window. Render is null here, because, in React, the render method must be called even if nothing is returned. We're exporting withRouter to ensure it has access to the router's location props.

NotFound is component that renders when the URL does not match any existing routes. It renders some text, and in the future, it will render a picture.

### Testing
Finally, we will be going over testing. Our tests are located in the __tests__ directory.

For our tests, we use Jest, Enzyme, and Navalia.

#### Testing Environment Configuration
Starting at preHelper.js, we setup a global method called requestAnimationFrame, which sets a timeout on a callback function. This was done in accordance with the Jest documentation.

In testHelper.js, we import configure and Adapter in order to configure enzyme to test for React version 16 components. This was also done in accordance with the Enzyme documentation.

The testingEnvironment directory contains actions, reducers, and data. The reducers are copies of the reducers from src/client/reducers. The actions are slightly different. The fetchLearners action does not take a callback, it instead sets the value of payload to be the combined json file. In our integration tests, we avoid using a browser, and as such, cannot initiate a fetch request to get the json file that our server sends. Instead, we set the value of the redux store to be a json file directly through the fetchLearners action, avoiding a fetch call entirely. Thus, our integration tests simulate a successful fetch call to our server. Our end-to-end tests use the Chrome browser, and that is where we test that our fetch call is successful. The data directory is a mockup json file, similar to what our api in production serves when a fetch request is made.

#### Integration Tests
After importing all the necessary files, our first test begins on line 17. The first set of tests are for the Blurb component. Using Jest and Enzyme, you are able to simulate mounting React components, and then test what those components render when passed certain props. On line 18, we create a mock info object that will be passed as a prop to Blurb. On line 22, we create a const that uses Enzyme's mount method to mount the Blurb component, passing our info object as a prop. In the first three tests, we use Jest's find method to target specific html elements we expect to find on a page if Blurb was mounted on that page. We test that Blurb is wrapped in a div in the first test on line 25; we test that Blurb renders a h1 in the second test on line 29; and finally, we test that Blurb renders a p tag in the third test on line 33. On line 37, we test that any props passed to Blurb are being passed successfully. We test this through Enzyme's props method on line 38. This method will return an object with all of the props of a component. We then test that those props are equal to what we passed our Blurb component on line 23.

Our next set of tests are testing that the LearnerGallery container is behaving as expected.

### Congratulations!
Congratulations! You have made it through this long block of text. Thank you for reading this. We greatly appreciate you looking into this App. Feel free to talk to contact us through our GitHub accounts if you have further questions.

- Doug (handle hhhhhaaaa) and Patrick (handle pkallas)

NOTES - REMOVE ME AFTERWARD
Lecture - We're gonna work on it when we come back.

UPDATED
Add testing section.
