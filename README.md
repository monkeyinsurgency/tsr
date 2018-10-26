# TSR Coding Challenge
This was specified as a PHP challenge, but inasmuch as I haven't touched PHP for years and it wasn't described as part of 
this position, I was quite relieved to be able to do this in JavaScript.  I'm pretty pleased with the result.

## Under the bonnet
This was built using Create React App, treating the provided CSV file as a database table, with a transaction object added to replicate 
what would be returned from an API.  

### Building and running
```javascript
git clone git@github.com:monkeyinsurgency/tsr.git
cd tsr
yarn
yarn data:build (this converts the provided CSV file to usable JSON)
yarn data:serve (this fires up the json-server, which replicates a RESTful API.)
```
This will provide a mock API server at `localhost:3001`.

Then, in another terminal tab...
```javascript
yarn build
yarn start
```

This will start a server on `localhost:3000` and open a browser window pointing to the home page of the app.

### Notes
I treated this as if it were architected as interacting with cloud-based microservices.  All transactions are handles via 
`services/FetchData.js` in one way or another, utilising standard CRUD commands.  Information about the books, either on the list page or the details page 
utilises JSON retrieved from the API endpoints, available at `localhost:3000/books` and `localhost:3000/transactions`.  
The `books` endpoint is search via a querystring parameter `Title`, referring to the book titles in the database.

Requests made via `post` to `localhost:3000/transactions` builds a payload of the email address entered into the form on the 
`/details` page, along with the book title.  The details page is also driving by a querystring parameter.  My thought was 
that would allow for users to share the link.  The results of these transactions can be seen in `src/data/db.json`.

A single high-level state store is used for data such as the most recently viewed book title, and the running list of recently 
viewed books during a session.  If the user has "purchased" any books, that recently viewed list is replaced on the home page
by a parsed list of transactions added to the database.

For UI there is a very light application of Material-UI.

App routing is handled by React Router.  Along with the single app-wide store, I wanted to avoid the overhead of including 
Express or Redux.  It struck me as overkill.

I set up Jest for testing, but ran into issues with Enzyme, so that didn't get very far.  Along with better unit testing, 
going forward I would punch up the UI considerably and build out actual APIs, and deploy the various bits and bobs in a 
Docker stack.  But

## Spec 
PHP developer code test
What are you building?
We have a client who wants to build a new PHP web site for selling online Mr Men books. We have been given a limited amount of time to prototype a basic structure for the client. 
The client has big expectations, and will want the site to be able to deal with high-traffic numbers, include a security model, plus look great and be integrated with a payment system. These are all future aspirations, but should be considered for the prototype even though they are not required at this stage.
For this test try to keep it to 4 hours or less. This doesn’t have to be 100% complete, but obviously get as much in there as you can to show your capabilities.

## The basic prototype site structure
The prototype site you will produce for this code test should have the following pages and scripts:
*	A home page (home.html)
*	A document list page (list.html)
*	A document preview page (details.html)
*	The CSV file import script (books.csv)

## The basic user journey 
The visitors typically land on the home page. They can click through to view the document list and then click on one or more of the document previews available. On the preview page if they like the document they can enter their email address, buy the document, and return to the home page. If they don’t like it they can return to the list page.

Tasks we’d like you to carry out
1.	The site currently has no server-side code. This is your task, please take the html and make a prototype site. You’ll need to consider the following, but remember that this is your choice, do it the way you think is most effective:**
- a. Should I use a PHP framework?
- b.	Should I use a frontend framework?
- c.	What database should I use?
2.	Design a simple database to store the document titles and documents.
3.	Use this table to populate the pages of the site.
4.	We want to track the visitor while on the site, so when the visitor clicks “More Info” against a document we want to store this in a session object.
5.	When the visitor returns to the list page, the document they last viewed should have an asterisk (*) or some kind of visual marker next to it.
6.	When a visitor returns to the home page without buying anything, the list of documents they have viewed so far should be displayed on the home page, again utilising the data in the session. This list should be all documents viewed, not just the last one.
7.	If the visitor decides to buy the document, once they click “buy” they return to the home page.
8.	The email address and document purchased should be stored in the database.
9.	The home page should now detail which document the user has purchased.
10.	Finally please do one or more of the following if you have time:
- a.	Show a little frontend flare by adding in some nice feature to make the prototype look better or have a slightly nicer interface.
- b.	Do a little extra to make the solution to perform faster, using caching, query optimisation or other methods to get the most out of the server performance we have.
- c.	Create an extra piece of functionality that gets the prototype slightly closer to the solution that they are looking for. We want to wow them so they give us the work, so the more functional it is, the more likely we’ll win the work.

## What do we need from you?
Once you have completed the task above, please provide the following documentation:
1.	In your solution please take all necessary precautions as though this were a live environment. Make sure you have tested it and the functionality outlined has been tested.
2.	Please return a zip file containing the site as a whole, any SQL required to build the database and any installation instructions. 
3.	Please provide a little information about the following to help us understand how you think:
- a.	Did you use a PHP framework? Please clarify why you chose your solution.
- b.	Did you use a frontend framework? Please clarify why you chose your solution.
- c.	What database did you use? Please clarify why you chose your solution.
- d.	What additions did you do if any, please provided a short description.
- e.	How long did the test take you?
4.	If you have any questions please don’t hesitate to get in touch and we’ll do our best to help.
## Good luck!


