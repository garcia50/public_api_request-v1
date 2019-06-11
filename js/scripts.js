const body = $('body')
const usersURL = 'https://randomuser.me/api/?results=12' 
const galleryDiv = $('.gallery')
var usersArray;


function fetchData(url) {
  return fetch(url)
          .then(checkStatus)
          .then(res => res.json())
          .catch(error => console.log('Something is wrong', error))
}


Promise.all([
  fetchData(usersURL)
])
.then(data => {
  usersArray = data[0].results;
  generateUser(usersArray);
})


function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}


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

  galleryDiv.append(users);
}


galleryDiv.on('click', function(e) {
  var userIndex = e.target.attributes.usernum.value || '';
  var user = usersArray[userIndex]
  var dateArray = user.dob.date.split('T')[0].split('-');

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
    $(userModal).insertAfter($('#gallery'))
  }

  modalClose();
})


const modalClose = () => {
  $( "#modal-close-btn" ).click(function() {
    $('.modal-container').hide()
  });
}




