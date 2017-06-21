import Card from './card';
import Pagination from './pagination';
import Swipe from './swipe';
import _chunck from 'lodash/chunk';

export default class CardsContainer {
  constructor(playlist, searchBar) {
    this.cardsPerContainer;
    this.playlist = playlist;
    this.searchBar = searchBar;
  }

  setCardsPerContainer() {
    const containerWidth = window.innerWidth;
    this.cardsPerContainer = Math.floor(containerWidth / 380);
    if (this.cardsPerContainer === 0) {
      this.cardsPerContainer = 1;
    }
  }

  updatePagesArray() {
    this.pagesArray = _chunck(this.playlist, this.cardsPerContainer);
  }

  addCards() {
    if (this.first) {
      this.pagesArray.forEach((el, i) => {
        el.forEach((it) => {
          if (it.id === this.first) {
            this.pagination.page = i;
          }
        });
      });
    }
    const card = new Card();
    this.pagesArray[this.pagination.page].forEach((item) => { card.createCard(item); });
    this.first = 0;
  }

  widthUpdate() {
    window.addEventListener('resize', () => {
      this.first = this.pagesArray[this.pagination.page][0].id;
      this.setCardsPerContainer();
      this.update();
    });
  }

  deleteContainer() {
    const container = document.querySelector('.cards-container');
    if (container) {
      document.body.removeChild(container);
    }
  }

  clearContainer() {
    const container = document.querySelector('.cards-container');
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  createCardsContainer() {
    const body = document.querySelector('body');
    body.innerHTML += '<section class="cards-container"></section>';
  }

  init() {
    this.deleteContainer();
    this.createCardsContainer();
    this.widthUpdate();
    this.setCardsPerContainer();
    this.updatePagesArray();
    this.pagination = new Pagination(this, this.searchBar);
    this.pagination.init(this.playlist, this.cardsPerContainer);
    this.addCards();
    this.swipe = new Swipe(this, this.pagination);
    this.swipe.init();
    this.searchBar.search();
  }

  update() {
    this.updatePagesArray();
    this.clearContainer();
    this.addCards();
    this.pagination.addPagesNumbers();
  }
}

