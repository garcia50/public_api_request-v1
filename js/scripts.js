//Set variables
const usersURL = 'https://randomuser.me/api/?results=12' 
const galleryDiv = $('.gallery')
var usersArray;

//Make network requests and handle responses
function fetchData(url) {
  return fetch(url)
          .then(checkStatus)
          .then(res => res.json())
          .catch(error => console.log('Something is wrong', error))
}

//Returns our api object response and feeds the data into a variable for further manipulation
Promise.all([
  fetchData(usersURL)
])
//Following the retrieval of data (usersArray), the data is then passed through the generateUser function 
.then(data => {
  usersArray = data[0].results;
  generateUser(usersArray);
})

//Check status of the request and converts object into json (reading friendly)
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
//Outpost an error message if an error occurs
    return Promise.reject(new Error(response.statusText));
  }
}

//Create html with all individual user data
function generateUser(data) {
  const users = data.map((user, index) => `
    <div class="card" usernum="${index}">
      <div class="card-img-container" usernum="${index}">
          <img class="card-img" usernum="${index}" src=${user.picture.large} alt="profile picture">
      </div>
      <div class="card-info-container" usernum="${index}">
          <h3 id="name" class="card-name cap" usernum="${index}">${user.name.first} ${user.name.last} </h3>
          <p class="card-text" usernum="${index}">${user.email}</p>
          <p class="card-text cap" usernum="${index}">${user.location.city}</p>
      </div>
    </div>
  `).join('');
//Add html to galleryDiv
  galleryDiv.append(users);
}

//Create html with single individual user data
//Set listeners to galleryDiv 
galleryDiv.on('click', function(e) {
  //Retrieve User index position
  var userIndex = e.target.attributes.usernum.value || '';
  //Find particular user and set to a variable
  var user = usersArray[userIndex]
  //Refactor date object to return appropiate data
  var dateArray = user.dob.date.split('T')[0].split('-');

  //Create html if user is clicked on
  if (user != '') {
    var userModal = `
      <div class="modal-container">
        <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src=${user.picture.large} alt="profile picture">
              <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
              <p class="modal-text">${user.email}</p>
              <p class="modal-text cap">${user.location.city}</p>
              <hr>
              <p class="modal-text">${user.phone}</p>
              <p class="modal-text">${user.location.street} ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
              <p class="modal-text">Birthday: ${dateArray[1]}/${dateArray[2]}/${dateArray[0]}</p>
          </div>
        </div>
      </div>
    `
    //Insert html after userModal div
    $(userModal).insertAfter($('#gallery'))
  }
  //Calls modalClose function to invoke the closing of the modal feature
  modalClose();
})

//Add listener to modal and checks if user clicks the 'X' button
const modalClose = () => {
  $( "#modal-close-btn" ).click(function() {
    //Hide div once 'X' button is clicked
    $('.modal-container').hide()
  });
}