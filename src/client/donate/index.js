//API requests for the donate screen are handled here

//Send created listings from this page to the database.

document.getElementById('buttonDonate').addEventListener('click',  async() => {

    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let userName = "default";
    let location = "a place";
    let postId = (Math.floor(Math.random() * 9999) + 1000).toString();
    //change to date object? also edit data here later

    // jsonObj.title = title;
    // jsonObj.desc = desc;

    await fetch('/donate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userName: userName, title: title, description: description, location: location, postId: postId})
        });

});

/*async function donate() {

    // let jsonObj = {};

    let title = document.getElementById("title").value;
    let desc = document.getElementById("desc").value;
    let userName = "test";
    let location = "a place";
    let postId = (Math.floor(Math.random() * 9999) + 1000).toString();

    // jsonObj.title = title;
    // jsonObj.desc = desc;

    console.log(title)
    console.log(desc)
    console.log(userName)
    console.log(location)
    console.log(postId)

    await fetch('/donate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userName: userName, title: title, desc: desc, location: location, postId: postId})
        });

}*/

//username, location, postid