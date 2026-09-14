document.addEventListener('DOMContentLoaded', function(){
  const allButtons = document.querySelectorAll('.searchBtn');
  const searchBar = document.querySelector('.searchBar');
  const searchInput = document.querySelector('#searchInput');
  const searchClose = document.querySelector('#searchClose');

  if (searchBar && searchInput) {
    for (let i = 0; i< allButtons.length; i++) {
      allButtons[i].addEventListener('click', function(){
        searchBar.style.visibility = 'visible';
        searchBar.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
        searchInput.focus();
      });
    }
  }

  if (searchClose && searchBar) {
    searchClose.addEventListener('click', function(){
      searchBar.style.visibility = 'hidden';
      searchBar.classList.remove('open');
      this.setAttribute('aria-expanded', 'false');
    });
  }
})