const picBox = document.getElementById('picture-box');
document.querySelector('form button').addEventListener('click', event =>{
    event.preventDefault();

    // clear picture box
    picBox.innerHTML = "";
    
    // get data from user form
    let tags = document.getElementById('tagsInput').value;
    const amountPics = document.getElementById('amountPics').value;
    const picSize = document.getElementById('picSize').value;
    const sorting = document.getElementById('sortType').value;

    if(tags == "" || amountPics == ""){
        // if the search boxes with text and amount of pictures are empty
        picBox.innerText = "enter text and amount!";
    }else{
        // if all requirement in the search form are accepted, run function to fetch flickr Data from api
        fetchFlickrPictures(tags, amountPics, picSize, sorting);
    }
    
})

// this function retrives data from the Flickr api based on paramters by the user
function fetchFlickrPictures(tags, amountPics, sizePics,sortType){
    // create a string to assign value to based on outcome of the function
    let tempString = '';

    // the url string to use the api with the preferences from the user embedded
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b03ecc2568d5edf1a278f1f1e8041a9b&text` +
            `=${tags}&sort=${sortType}&per_page=${amountPics}&page=&format=json&nojsoncallback=1`;
    
    // start to fetch the data using the url string
    fetch(url)
        .then(function(res){
            // if status code is valid
            if(res.status >= 200 && res.status < 300){
                return res.json()
            }else{
                // if there is an error from the api's side
                throw "internet connection error!";
            }
        })
        .then(function(data){
            // if statement to asses if api has photos or not
            if(data.photos.photo.length > 0){
                // run through the photo data from the api
                for(let i = 0; i < data.photos.photo.length; i++){
                    // assign the data to the previously created string as html code
                    tempString += `<a target="_blank" href="https://live.staticflickr.com/${data.photos.photo[i].server}/${data.photos.photo[i].id}_${data.photos.photo[i].secret}_${sizePics}.jpg">
                    <img src="https://live.staticflickr.com/${data.photos.photo[i].server}/${data.photos.photo[i].id}_${data.photos.photo[i].secret}_${sizePics}.jpg" alt="pic"></a>`;
                }
                // once all data has been added to the string as html code , add it to the div in html file. 
                picBox.innerHTML = tempString;
            }else{
                // if there are no pictures on the search, assign the message to the tempString and return it to html.
                tempString = "no pics found";
                picBox.innerText = tempString;
            }
        }).catch(
            // should there be a problem with the fetch, such as internet connection issue, the catch will 
            // perform a function that prints a error message to the html file. 
            () => { picBox.innerText = "somethings went wrong with the servers!"; }
        );
}
