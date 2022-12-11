//API requests for the donate screen are handled here
let preview = document.getElementById("preview").src;
let currPostId = "";

async function updateFill() {
    
    let username = "Default"; //change to curr user

    const listings = await fetch('/mylistings', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({username: username})
        });
    
    const listJSON = await listings.json();

    for (let i in listJSON) {
        for (let j in listJSON[i]) { 
            let obj = listJSON[i][j];
            console.log(obj)
            document.getElementById("title").value = obj["title"];
            document.getElementById("description").value = obj["description"];
            document.getElementById("imagename").value = obj["image"];
            document.getElementById("location").value = obj["location"];
            document.getElementById("type").value = obj["type"];
            document.getElementById("donateby").value = obj["donateby"];
            document.getElementById("size").value = obj["size"];
            document.getElementById("year").value = obj["year"];
            document.getElementById("condition").value = obj["condition"];
            currPostId = obj["postid"];
        }
    }

    document.getElementById("buttonDonate").value = "Update!"
}

if (JSON.parse(window.sessionStorage.getItem("update")) === true) {
    sessionStorage.removeItem("update");
    updateFill();
}


document.getElementById('addimage').addEventListener('click',  async() => {

    if ((document.getElementById('imagename').value).length < 15) {
        alert("Invalid image address. (Right click an image and click 'Copy Image Address'");
    }

    else {

        const val = document.getElementById('imagename').value,
                    src = val,
                    img = document.createElement('img');

                img.src = src; 
                document.getElementById("preview").src=src;
        }
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
    if ((title === "") || (description === "") || (location === "") || (type === "") || (donateby === "") || (document.getElementById("preview").src === preview)) {
        alert("Please add all required info. (Required info has an asterick next to it.)");
    }

    else {

        if (document.getElementById("buttonDonate").value === "Update!") {
            alert("Your donation has been updated.")
            postId = currPostId;

            await fetch('/update', {
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
            } 

        else {
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
            }       

        window.location.href = '../';
    }   
});
