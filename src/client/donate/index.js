//API requests for the donate screen are handled here

document.getElementById('addimage').addEventListener('click',  async() => {

    const val = document.getElementById('imagename').value,
                src = val,
                img = document.createElement('img');

            img.src = src;

            //document.getElementById('imagename').appendChild(img);
            //document.body.appendChild(img);    
            document.getElementById("preview").src=src;
    });

//Send created listings from this page to the database.

document.getElementById('buttonDonate').addEventListener('click',  async() => {

    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let username = "Default";
    let location = document.getElementById("location").value;
    let postId = (Math.floor(Math.random() * 99999) + 10000).toString();
    let type = document.getElementById("type").value;
    let image = document.getElementById("imagename").value;
    let condition = document.getElementById("condition").value;
    let size = document.getElementById("size").value;
    let year = document.getElementById("year").value;
    let donateby = document.getElementById("donateby").value;
    let timecreated = new Date();

    //add check to see if required values are null or not 
    
    alert("Your donation has been processed!");
    
    await fetch('/donate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username, 
            title: title, 
            description: description, 
            location: location, 
            postId: postId, 
            type: type, 
            image: image, 
            timecreated: timecreated, 
            condition: condition, 
            size: size, 
            year: year, 
            donateby: donateby})
        });

        
    });