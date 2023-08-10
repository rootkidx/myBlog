
document.addEventListener('DOMContentLoaded', function () {

  const allButtons = document.querySelectorAll('.searchBtn');
  const searchBar = document.querySelector('.searchBar');
  const searchInput = document.getElementById('searchInput');


  searchBar.addEventListener('click', function (event) {
    event.stopPropagation();
  });

  // Add a click event listener to each search button
  for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener('click', function (event) {
      event.stopPropagation(); // Prevent clicks on search button from propagating to the body
      searchBar.style.visibility = 'visible';
      searchBar.classList.add('open');
      searchInput.focus();
    });
  }

  // Add a click event listener to the body to hide the search bar when clicked
  document.body.addEventListener('click', function () {
    searchBar.style.visibility = 'hidden';
    searchBar.classList.remove('open');
  });





});

var simplemde = new SimpleMDE({
  element: document.getElementById("ide"),
  showIcons: ["code", "table"],
  promptURLs: true,

});

