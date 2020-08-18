
let baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
let key = 'xZ1Hk4EnCLz1XvcyjvtZDHACnNeSaCnK';

//SEARCH FORM
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');



//RESULTS NAVIGATION
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');

//RESULTS SECTION
const section = document.querySelector('section');


//setting blank page results initially
nav.style.display = 'none';


//more default pagination values
let pageNumber = 0;
let displayNav = false;


//fetch search results when submit button is pressed

//1                     //2   
searchForm.addEventListener('submit', fetchResults); 
//next page when next is clicked
nextBtn.addEventListener('click', nextPage); //3
//same with previous
previousBtn.addEventListener('click', previousPage); //3

//1
//function is called when user a submit action is fired
function fetchResults(e) {
    //log the action that called fetch results
    //console.log(e); //2
    //prevent event from being handled as it would without the firing action
    e.preventDefault();
    // Assemble the full URL
    url = baseURL + '?api-key=' + key + '&page=' + pageNumber + '&q=' + searchTerm.value; //3
    //console.log(url); //4

    //if Dates are provided, append begin date query and date value provided
        //INSERT HERE  
    if(startDate.value !== '') {
        console.log(startDate.value)
        url += '&begin_date=' + startDate.value;
    };

    if(endDate.value !== '') {
        url += '&end_date=' + endDate.value;
    };
    //END HERE
    //1
    function fetchResults(e) {
        //previous code
        fetch(url).then(function(result) {
          return result.json();
        }).then(function(json) {
          displayResults(json); //1 & //3
        });
      }
      
      //2
      function displayResults(json) {
        console.log(json.response.docs);
     };
    
    function nextPage(){
    console.log("Next button clicked");
    } //5
    
    function previousPage(){
    console.log("Next button clicked");
    } //5