const body = $('body')
const usersURL = 'https://randomuser.me/api/?results=12' 
const galleryDiv = $('.gallery')
var usersArray;
// galleryDiv.append(modalDivContainter);
// body.prepend(modalDivContainter);


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
  console.log('hey', usersArray);

  console.log(e.target.attributes);

  var user = e.target.attributes.usernum.value || '';

  var picture = usersArray[user].picture.large
  var first = usersArray[user].name.first;
  var last = usersArray[user].name.last;
  var email = usersArray[user].email;
  var phone = usersArray[user].phone;
  var street = usersArray[user].location.street;
  var city = usersArray[user].location.city;
  var state = usersArray[user].location.state;
  var zip = usersArray[user].location.postcode;
  var dob = usersArray[user].dob;

  if (user != '') {
    var userModal = `
      <div class="modal-container">
        <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src=${picture} alt="profile picture">
              <h3 id="name" class="modal-name cap">${first} ${last}</h3>
              <p class="modal-text">${email}</p>
              <p class="modal-text cap">${city}</p>
              <hr>
              <p class="modal-text">${phone}</p>
              <p class="modal-text">${street} ${city}, ${state} ${zip}</p>
              <p class="modal-text">Birthday: ${dob}</p>
          </div>
        </div>
      </div>
    `

    body.append($(userModal))
  }


})







