**Database Collections**

Listing Table 

| Column       | Data Type | Description                 |
|--------------|-----------|-----------------------------|
| username     | String    | The name of the user        |
| title        | String    | The summary of the listing  |
| description  | String    | The desctiption of the item |
| location     | String    | The location of the listing |
| postId       | int       | The unique ID of the listing|
| timeCreated  | Date      | When the listing was made   |
|              |           |(For chronological ordering) |

User Table 

| Column       | Data Type | Description                 |
|--------------|-----------|-----------------------------|
| userName     | String    | The name of the user        |
| userID       | int       | The unique ID of the user   |
| email        | String    | The email of the user       |
| location     | String    | The location of the user    |
| myListing    | Object    | The user's current listing  |
