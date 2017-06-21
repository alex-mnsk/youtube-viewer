
export default class Pagination {
  constructor(cardsContainer, searchBar) {
    this.cardsContainer = cardsContainer;
    this.searchBar = searchBar;
    this.page = 0;
  }

  addPagesNumbers() {
    const pages = Array.from(document.querySelectorAll('#page'));
    pages.map((li, i) => {
      const pageNum = this.page - 1 + i;
      li.innerHTML = `<span class="hidden">${pageNum > 0 ? pageNum : ''}</span>`;
    });
  }

  deletePagesDisplay() {
    const body = document.querySelector('body');
    const footer = document.querySelector('footer');
    if (footer) {
      body.removeChild(footer);
    }
  }

  addEvents() {
    const paginationContainer = document.querySelector('.pagination-container');
    paginationContainer.addEventListener('click', (event) => {
      if (event.target.getAttribute('id') === 'next') {
        if (this.page < this.cardsContainer.pagesArray.length - 1) {
          this.page += 1;
          if (this.page >= (this.cardsContainer.pagesArray.length / 2) && this.searchBar.nextPage) {
            this.searchBar.search();
          }
          this.cardsContainer.update();
        }
      }
      if (event.target.getAttribute('id') === 'prev') {
        if (this.page > 0) {
          this.page -= 1;
          this.cardsContainer.update();
        }
      }
      if ((event.target.getAttribute('id') === 'page' || event.target.getAttribute('span') != '') && parseInt(event.target.innerText)) {
        this.page = event.target.innerText - 1;
        if (this.page >= (this.cardsContainer.pagesArray.length / 2) && this.searchBar.nextPage) {
          this.searchBar.search();
        }
        this.cardsContainer.update();
      }
    });
    paginationContainer.addEventListener('mousedown', (event) => {
      if (event.target.getAttribute('id') === 'page') {
        event.target.childNodes[0].classList.toggle('hidden');
      }
    });
  }

  cratePaginationContainer() {
    this.deletePagesDisplay();
    const body = document.querySelector('body');
    body.innerHTML += `<footer>
        <div class="pagination-container">
          <ul class="pagination">
            <li><span id="prev"><</span></li>
            <li id="page" class="page-3"></li> 
            <li id="page" class="page-2"></li> 
            <li id="page" class="page-1"></li>
            <li id="page" class="page-2"></li>
            <li id="page" class="page-3"></li>
            <li> <span id="next">></span></li>
          </ul>
        </div>
      </footer>`;
  }

  init() {
    this.cratePaginationContainer();
    this.addPagesNumbers();
    this.addEvents();
  }
}
