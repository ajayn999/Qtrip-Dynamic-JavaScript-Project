
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  console.log(search)
  const params = new URLSearchParams(search)
  const city_name = params.get("city")
  return city_name;

}



//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
    try{
    const url = config.backendEndpoint + `/adventures?city=${city}`
    const fetchPromise = await fetch(url);
    //console.log(fetchPromise)
    const fetchedAdventures = await fetchPromise.json();

    return fetchedAdventures;
  }
  catch(err){
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
    let parentNode = document.getElementById("data")
  let childNode = "";
   Array.from(adventures).forEach(element =>{
      childNode = `
      <div class="col-6 col-lg-3 mb-3">
      <a href="detail/?adventure=${element.id}" id = ${element.id}>
        <div class="card adventure-card pb-3">
          <img src=${element.image} class="activity-card img" alt=${element.name}/>
          <div class= "category-banner">${element.category}</div>
          <div class="card-body  text-center d-md-flex justify-content-between text-responsive monospace">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text h6">₹${element.costPerHead}</p> 
          </div>
          <div class="card-body  text-center d-md-flex justify-content-between  text-responsive mb-0 pb-0 monospace">
            <h5 class="card-title">Duration</h5>
            <p class="card-text h6">₹${element.duration}</p> 
          </div>  
        </div>
      </a>
    </div>

      `
    parentNode.innerHTML += childNode;
  })

  return parentNode;

}



//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  console.log("low", low, "high", high);
    low = parseInt(low);
    high = parseInt(high);
  let filteredList = [];
    list.map(adv => {
    console.log(typeof(adv.duration))
    if(adv.duration >= low && adv.duration <= high) {
      filteredList.push(adv);
      
    }
  });
    if(filteredList.length === 0) {
      return list;
    }
   
    return filteredList;


}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
    let filteredAdvByCategory = [];
    categoryList.map((category) => {
      list.map((key) => {
        if (key.category === category) {
          filteredAdvByCategory.push(key);
        }
      });
    });

    if (categoryList.length === 0) {
      return list;
    }
    return filteredAdvByCategory;


}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  console.log(list, filters);
  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    let range = filters["duration"];
    let rangeArray = range.split("-");
    let filterByDurationList = filterByDuration(
      list,
      rangeArray[0],
      rangeArray[1]
    );
    var finalList = filterByCategory(filterByDurationList, filters["category"]);
  } else if (filters["duration"].length > 0) {
    let range = filters["duration"];
    let rangeArray = range.split("-");
    var finalList = filterByDuration(list, rangeArray[0], rangeArray[1]);
  } else if (filters["category"].length > 0) {
    var finalList = filterByCategory(list, filters["category"]);
  } else {
    return list;
  }

  return finalList;

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters",JSON.stringify(filters));
  return true;

}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let localStorageFilter = JSON.parse(window.localStorage.getItem("filters"));


  // Place holder for functionality to work in the Stubs
  return localStorageFilter;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  filters["category"].map((key) => {
    let divElementPills = document.createElement("div");
    divElementPills.className = "category-filter";
    divElementPills.innerHTML = `
      <div>${key}</div>
    `;
    document.getElementById("category-list").appendChild(divElementPills);
  });

  if (filters["duration"]) {
    document.getElementById("duration-select").value = filters["duration"];
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
