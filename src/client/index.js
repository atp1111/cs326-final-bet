//API requests for the home screen are handled here

//Fetch listings from src index.js then create new div elements for each one 
//console.log("test")

(async () => {
    const listings = await fetch("/listings") //get request to all listings from backend -> []
    const listJSON = await listings.json();
    //console.log(listJSON);
    const listingsDiv = document.getElementById("listings")

    //${i["title"]}
    //For each listing in listings, create HTML template string for a listing
    for (let i in listJSON) {
        for (let j in listJSON[i]) {
            //j["username"]
            let obj = listJSON[i][j];
            console.log(listJSON[i][j]);
            const getListing = `
                <span class="listing profile">
                    <span class="col-lg-4">
                        <span class="card shadow-sm">
                            <span class="card-header bg-transparent text-center">
                                <!--
                                <img class="lst_img" src="./img/img1.webp" alt = "ab" height="200px" width="250px" /> -->
                                <h3>${obj["title"]}</h3>
                                </span>
                                <span class="card-body">
                                <p class="mb-0"><strong class="pr-1">Description:</strong>${obj["description"]}</p>
                                <p class="mb-0"><strong class="pr-1">Address:</strong>${obj["location"]} </p>
                                <p class="mb-0"><strong class="pr-1">User:</strong>${obj["username"]}</p>
                            </span>
                        </span>
                    </span>
                </span>
                `;
                //console.log(getListing);
                listingsDiv.innerHTML += getListing;
                //listingsDiv.appendChild(getListing);
                //document.getElementById("listings") = listingsDiv;
            }
        }
    })();

    