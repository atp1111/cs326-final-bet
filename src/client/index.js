//API requests for the home screen are handled here

//Fetch listings from src index.js then create new div elements for each one 
//console.log("test")

//new
function throttle(cb, delay=300) {
    let wait = false;
  
    return (...args) => {
      if (wait) {

          return;
      }
  
      cb(...args);
      wait = true;
      const spinner=document.getElementById("loading")
      const button=document.getElementById("button-addon2")
      
      spinner.style.display="block"
      button.style.display="none"

      setTimeout(() => {
        wait = false;
        spinner.style.display="none"
        button.style.display="block"
      }, delay);
    }
  }
  const searchChange = throttle(myFunction,500);

 async function  myFunction  () {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    const listings = await fetch('/search', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({username: input.value})
        });
        const listJSON = await listings.json();

        console.log(listJSON,"inclient")
        listJSON.results.length>0? ul.style.display="block" : ul.style.display="none"
        ul.innerHTML=""
        listJSON.results.forEach(element => {
        const list = document.createElement("li");
        const link= document.createElement("a");
        link.setAttribute("href", "#");
        link.innerHTML=element.title
        list.appendChild(link)
        ul.appendChild(list)
        });

        //old
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
                //console.log(getListing);
                listingsDiv.innerHTML += getListing;
                //listingsDiv.appendChild(getListing);
                //document.getElementById("listings") = listingsDiv;
            }
        }
    })();

    