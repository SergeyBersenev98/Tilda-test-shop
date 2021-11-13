let theUrl = "https://store.tildacdn.com/api/tgetproduct/"
let slide = 0
let amountInBacket = 0
let amountOnMarket = 0

//request to server
function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

//data from serve processing and paste to HTML
function a(answer){

  let data = JSON.parse(answer)
  document.getElementById("title").innerText = data.title
  document.getElementById("oldPrice").innerText = data.priceold + "p"
  document.getElementById("price").innerText = data.price
  document.getElementById("description").innerText = data.descr
  document.getElementById("quantityOnMarket").innerText = data.quantity
  document.getElementById("quantityInBacket").innerText = amountInBacket
  amountOnMarket = data.quantity
  let gallery = JSON.parse(data.images)

  //set picture in galery when user click on button
  setNewPictureBySwap = (swapSlide) => {
    if (slide + swapSlide >= 0 && slide + swapSlide <= gallery.length-1){
      slide = slide + swapSlide
    }else{ 
      if(slide + swapSlide < 0){slide = gallery.length-1}
      if(slide + swapSlide > gallery.length-1){slide = 0}
    }
    document.getElementById("img").setAttribute("src", gallery[slide].img)
  }

  //set picture in galery when user click on miniature
  setNewPictureByNumber = (numberOfMiniature) => {
    slide = numberOfMiniature;
    document.getElementById("img").setAttribute("src", gallery[slide].img)
  }

  //set miniatures in HTML
  setMiniature = () => {
    for (let i = 0; i < gallery.length; i++){
      let image=document.createElement('img');
      image.src=gallery[i].img;
      image.setAttribute("onclick", `setNewPictureByNumber(${i})`)
      document.getElementById('miniature').appendChild(image)
    }
  }

  //add or delete product from card
  changeShoppingCard = (amount) => {
    if ((amountOnMarket - 1 >= 0 || amount<0) && amountInBacket+amount>=0){
      amountOnMarket -= amount
      amountInBacket += amount
      document.getElementById("quantityInBacket").innerText = amountInBacket
      document.getElementById("quantityOnMarket").innerText = amountOnMarket
    }else{
      alert("Unfortunately, there is no any product here:(")
    }
  }
  setNewPictureBySwap(0)
  setMiniature()
}

addToFavorites = () => {
  if(localStorage.getItem("favourite") == "yes") {
    localStorage.setItem("favourite", "no"); // Set state
    document.getElementById('favourites').style.color = "e5cef5"
  }else{
    localStorage.setItem("favourite", "yes"); // Set state
    document.getElementById('favourites').style.color = "#7b6994"
  }
}

checkFavorites = () => {
  if(localStorage.getItem("favourite") == "yes") {
    document.getElementById('favourites').style.color = "#7b6994"
  }else{
    document.getElementById('favourites').style.color = "e5cef5"
  }
}

deleteSomeInfo = () => {
  localStorage.setItem("someInfo", "no"); // Set state
  document.getElementById("someInfo").style.display = "none"
}

checkSomeInfo = () => {
  if(localStorage.getItem("someInfo") == "no"){
    document.getElementById("someInfo").style.display = "none"
  }
}

checkFavorites()
checkSomeInfo()
httpGetAsync(theUrl, a)

