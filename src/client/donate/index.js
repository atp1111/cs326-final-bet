//API requests for the donate screen are handled here

//Send created listings from this page to the database.

document.getElementById('buttonDonate').addEventListener('click',  async() => {

    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let username = "Default";
    let location = document.getElementById("location").value;
    let postId = (Math.floor(Math.random() * 9999) + 1000).toString();
    let type = document.getElementById("type").value;

    //add date object
    //change to date object? also edit data here later


    //add check to see if required values are null or not 
    
    alert("Your donation has been processed!");
    
    await fetch('/donate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, title: title, description: description, location: location, postId: postId, type: type})
        });

        
    });