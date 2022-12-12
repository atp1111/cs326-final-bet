***Title:*** 
Team Bet
Subtitle: Five College Closet Swap
Semester: Fall 2022
Overview: Looking to get rid of some old clothes, or change up your wardrobe on campus? With ClosetSwap, you can donate your clothes to other Five College students in the area! Using a custom made back-end for storing data, students can upload listings of clothes they want to get rid of, including parameters such as description, clothing type, size, age, condition, etc, as well as an image of the clothes, and using the home feed or search bar, other students can look for clothes that match what they’re looking for and contact them via their email.

In this day and age, it’s more important than ever to recycle, and with this app, it’s easier than ever to clear out your old wardrobe, or even find some new clothing to try!
Team Members: 
	Chukwudimma Ikoro (Github: ChukwudimmaIkoro)
	Renuka Abbidi (Github: )
	Aayush Panchal (Github: atp1111 )
User Interface: 
	Home View: The main view where you can see all of the current donation listings, or search via title with the search bar.
	
	Donate View: The view where you can create and upload listings to the database.
	
	Profile View: The view where you can see the current user and manage listings.

APIs: Heroku
Database:
Listing Table 

| Column       | Data Type | Description                 |
|--------------|-----------|-----------------------------|
| username     | String    | The name of the user        |
| title        | String    | The summary of the listing  |
| description  | String    | The description of the item |
| location     | String    | The location of the listing |
| postId       | int       | The unique ID of the listing|
| timecreated  | DateTime  | When the listing was made   |
|              |           |(For chronological ordering) |
| condition       | String    | The condition of the clothing |
| size | String    | The size of the item |
| year    | String    | The year the item was originally bought |
| image | String    | The image link address of the post|
| type   | String    | The type of clothing the item is |
| donateby | DateTime  | When you want to donate the listing by |


User Table 

| Column       | Data Type | Description                 |
|--------------|-----------|-----------------------------|
| username     | String    | The name of the user        |
| userID       | int       | The unique ID of the user   |
| email        | String    | The email of the user       |
| location     | String    | The location of the user    |
| myListing    | Object    | The user's current listings  |

URL Routes/Mappings: 
app.get('/listings'): Gets all listings stored in database and serves to client

app.post('/mylistings’): Get posts from database that match passed in username

app.post('/donate'): Parse data from donate page to create post in database

app.post('/update'): Parse data from donate page to update post in database

app.get('/users'): Get all users stored in database and serves to client

app.delete('/users'): Delete listings stored in database under current user’s name

app.post('/search'): Get posts from database that closely match sear bar data


Authentication/Authorization: A “default” user is accessed if there is no currently logged in user.
Division of Labor: 
Milestone 1:
Home Screen: Aayush 
Donate Screen: Chuchu
Profile Screen: Renuka

Milestone 2:
Backend Server API/ Read Calls: Chuchu
Create Calls: Aayush
Update/Delete Calls/Server Hosting: Renuka/Chuchu

Milestone 3:
Database/Secrets File Setup: Chuchu

Create, Read, Delete Completed Functions: Chuchu

Update Completed Function: Chuchu

Final Project:
Search Bar: Renuka
Code Cleanup/ CRUD Fixes/My Listings: Chuchu


Conclusion: Through this project, we learned that sometimes having plans that are too big or complex near the start of the project can make it harder to work on things in the long run if you decide to pare it back a bit. Features we thought would be somewhat easy to implement such as a comments/message system turned out to be much harder than we ever expected, which affected how we worked on the app. There were also issues in terms of database management, as it was particularly difficult to properly interact with our database, often needing to use trial and error to figure out some issues. If I worked on the project now, I would tell myself to make a list of features that are required and a list of features that are nice to have, so I could focus on those later.
