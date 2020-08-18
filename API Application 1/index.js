

const baseURL = 'https://api.spacexdata.com/v4/launches/latest';

const searchForm = document.querySelector('form');
const spaceShips = document.querySelector('ul');

searchForm.addEventListener('submit', fetchSpace);

function fetchSpace() {
  event.preventDefault();
  // console.log("form was submitted");

  /**
   * fetch starts the proces of fetching a resource from a 
   * network and that fetch returns a promise which is fulfilled once the response is available
   */
  
  //fetch starts the process of fetching a resource from a network and that fetch returns a promise which is fulfilled once the response is available
  fetch(baseURL)
    .then(result => { 
      return result.json();
    })
    .then(data => {
      console.log(data);
      displayRockets(data);
    })
    .catch(err => console.log(err));
}

function displayRockets(passedData){
    console.log(passedData);
    passedData.forEach(element => {
        let rocketLI = document.createElement('li');
        let picContainer = document.createElement('img');
        rocketLI.innerText = element.name;
        if(element.flickr_images.length > 0){
        picContainer.src = element.flickr_images[0];
        } else {
            picContainer.alt = 'no image available';
        }
        
        spaceShips.appendChild(rocketLI);
        //let pic = document.createElement('img');
        rocketLI.appendChild(picContainer);
    })
}