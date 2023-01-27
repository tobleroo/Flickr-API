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
        picBox.innerText = "enter text and amount!";
    }else{
        fetchFlickrJson(tags, amountPics, picSize, sorting);
    }
    
})

function fetchFlickrJson(tags, amountPics, sizePics,sortType){
    let tempString = '';

    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b03ecc2568d5edf1a278f1f1e8041a9b&text` +
            `=${tags}&sort=${sortType}&per_page=${amountPics}&page=&format=json&nojsoncallback=1`;
    
    fetch(url)
        .then(function(res){
            if(res.status >= 200 && res.status < 300){
                return res.json()
            }else{
                throw "internet connection error!";
            }
        })
        .then(function(data){
            if(data.photos.photo.length > 0){
                for(let i = 0; i < data.photos.photo.length; i++){
                    tempString += `<a target="_blank" href="https://live.staticflickr.com/${data.photos.photo[i].server}/${data.photos.photo[i].id}_${data.photos.photo[i].secret}_${sizePics}.jpg">
                    <img src="https://live.staticflickr.com/${data.photos.photo[i].server}/${data.photos.photo[i].id}_${data.photos.photo[i].secret}_${sizePics}.jpg" alt="pic"></a>`;
                }
                picBox.innerHTML = tempString;
            }else{
                tempString = "no pics found";
                picBox.innerText = tempString;
            }
        }).catch(
            () => { picBox.innerText = "somethings went wrong with the servers!"; }
        );
}