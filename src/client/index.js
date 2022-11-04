//API requests for the home screen are handled here

//Fetch listings from src index.js then create new div elements for each one 

listings = fetch("/listings") //get request to get all listings from backend -> []
console.log(listings);
listingsDiv = document.getElementById("listings")

 //For each listing in listings, create HTML template string for a listing
for (let i of listings) {
    const getListing = `
        <div class="listing profile1">
            <div class="col-lg-4">
                <div class="card shadow-sm">
                    <div class="card-header bg-transparent text-center">
                        <!--
                        <img class="lst_img" src="./img/img1.webp" alt = "ab" height="200px" width="250px" /> -->
                        <h3>${i["title"]}</h3>
                        </div>
                        <div class="card-body">
                        <p class="mb-0"><strong class="pr-1">Description:</strong>hoodies made of cotton, quantity = 5, size = all Large </p>
                        <p class="mb-0"><strong class="pr-1">Address:</strong>130,Infirmary Way Amherst </p>
                        <p class="mb-0"><strong class="pr-1">Userid:</strong>user123</p>
                    </div>
                </div>
            </div>
        </div>
        `;
        console.log(getListing);
        listingsDiv.innerHTML += getListing;
        //listingsDiv.appendChild(getListing);
    }

    document.getElementById("listings") = listingsDiv;