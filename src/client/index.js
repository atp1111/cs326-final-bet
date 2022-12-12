//API requests for the home screen are handled here

//Fetch listings from src index.js then create new div elements for each one 

let allProducts=[];
(async ()=>{
    const listings = await fetch("/listings") //get request to all listings from backend -> []
    const listJSON = await listings.json();
    allProducts=listJSON
    renderResults();
}
)();
  function throttle(cb, delay=300) {
    let wait = false;
  
    return (...args) => {
      if (wait) {

          return;
      }
  
      cb(...args);
      wait = true;

      setTimeout(() => {
        wait = false;
      }, delay);
    }
  }
  const searchChange = throttle(myFunction,500);

 async function  myFunction  () {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    const listings = await fetch('/search', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({username: input.value})
        });
        const listJSON = await listings.json();

        allProducts=listJSON
        renderResults();
        console.log(listJSON,"inclient")
     
}
 renderResults=() => {
   

    const listingsDiv = document.getElementById("listings")
    listingsDiv.innerHTML=''
  
    //For each listing in listings, create HTML template string for a listing
    for (let i in allProducts) {
        for (let j in allProducts[i]) {
            //j["username"]
            let obj = allProducts[i][j];
            console.log(allProducts[i][j]);
            const getListing = `
                <span class="listing profile">
                    <span class="col-lg-4">
                        <span class="card shadow-sm">
                            <span class="card-header bg-transparent text-center">
                                <img src="${obj["image"]}" id='preview' alt="No Photo" class="center">  
                                <h3>${obj["title"]}</h3>
                                </span> 
                                <span class="card-body">
                                <p class="mb-0"><strong class="pr-1">Description:</strong>${obj["description"]}</p>
                                <p class="mb-0"><strong class="pr-1">Address:</strong>${obj["location"]} </p>
                                <p class="mb-0"><strong class="pr-1">Clothing Type:</strong>${obj["type"]} </p>
                                <p class="mb-0"><strong class="pr-1">User:</strong>${obj["username"]}</p>
                                <p class="mb-0"><strong class="pr-1">DONATE BY:</strong>${obj["donateby"]}</p>
                            </span>
                        </span>
                    </span>
                </span>
                `;             
                listingsDiv.innerHTML += getListing;

            }
        }
    }
