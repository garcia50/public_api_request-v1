const body = $('body')
const usersURL = 'https://randomuser.me/api/?results=12' 
const galleryDiv = $('.gallery')
const modalDivContainter = document.createElement('div');
// const modalDiv = document.createElement('div');
// const modalInfoDiv = document.createElement('div');
// const modalCloseBtn = document.createElement('button');

modalDivContainter.class = 'modal-container';
// modalDiv.class = 'modal';
// modalInfoDiv.class = 'modal-info-container';
// modalCloseBtn.type = 'button';
// modalCloseBtn.class = 'modal-close-btn';
// modalCloseBtn.id = 'modal-close-btn';
// modalCloseBtn.innerHTML = '<strong>X</strong>'


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
  const usersArray = data[0].results;
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
  const users = data.map(user => `
    <div class="card">
      <div class="card-img-container">
          <img class="card-img" src=${user.picture.large} alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last} </h3>
          <p class="card-text">${user.email}</p>
          <p class="card-text cap">${user.location.city}</p>
      </div>
    </div>
  `).join('');

  galleryDiv.append(users);
  console.log(data);
}

/*Create a modal window
  When any part of an employee item in the directory is clicked, a modal window should pop up with the following details displayed:
    Image
    Name
    Email
    City or location
    Cell Number
    Detailed Address, including street name and number, state or country, and post code.
    Birthday
Make sure there’s a way to close the modal window
Refer to the mockups and the comments in the index.html file for an example of what info should be displayed on the page and how it should be styled.*/

galleryDiv.on('click', function(e) {
  console.log(e.target.firstElementChild.firstElementChild.src);
  const userModal = `
    <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src=${e.target.firstElementChild.firstElementChild.src} alt="profile picture">
          <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last} </h3>
          <p class="modal-text">${user.email}</p>
          <p class="modal-text cap">${user.location.city}</p>
          <hr>
          <p class="modal-text">${user.cell}</p>
          <p class="modal-text">${user.street} ${user.city} ${user.state} ${user.postcode}</p>
          <p class="modal-text">Birthday: ${user.dob.date}</p>
      </div>
  </div>
  `

  modalDivContainter.append(userModal);

  console.log(e.target);


})














