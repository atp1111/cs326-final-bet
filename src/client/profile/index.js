//API requests for the profile screen are handled here

//Fetch users from src index.js then get data from current user
let confirm = false;

(async () => {
    const users = await fetch("/users") //get request to all users from backend -> []
    const userJSON = await users.json();

    let currUserID = "0000";
    userDiv = document.getElementById("user")

    if (currUserID === "") {
        const loginUser = `
        <!-- Create Profile Button -->
        <section class="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start">
            <div class="container">
                <div class="d-sm-flex justify-content-between-align-item-center">                   
                    <div> 
                        <button class="btn btn-primary btn-lg align-item-center">Create a Profile or SignIn</button>                     
                    </div>
                </div>
            </div>
        </section>`;
        userDiv.innerHTML += loginUser;
    }

    //${i["title"]}
    //For each listing in listings, create HTML template string for a listing
    for (let i in userJSON) {
        for (let j in userJSON[i]) {

            let obj = userJSON[i][j];
            console.log(userJSON[i][j]); 
            if (obj["userID"] === currUserID) {
                const getUser = `
                    <span class="user-profile">
                        <span class="col-lg-4">
                            <span class="card shadow-sm">
                                <span class="card-header bg-transparent text-center">
                                    <!--
                                    <img class="lst_img" src="./img/img1.webp" alt = "ab" height="200px" width="250px" /> -->
                                    <h3>${obj["userName"]}</h3>
                                    </span>
                                    <span class="card-body">
                                    <p class="mb-0"><strong class="pr-1">Email:</strong>${obj["email"]}</p>
                                </span>
                            </span>
                        </span>
                    </span>
                    `;
                    //console.log(getUser);
                    userDiv.innerHTML += getUser;
                    break;
                }
            }
        }

        document.getElementById('buttonDelete').addEventListener('click',  async() => {

            let username = "Default";
        
            if (confirm === false) {
                alert("Are you sure you want to delete all your listings? Click again if yes.");
                confirm = (!(confirm));
            }
        
            else {
        
                alert("All posts under your account have been deleted.");
                confirm = (!(confirm));
                
             await fetch('/users', {

                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify({username: username})
                });
        
            }
        });
    })();