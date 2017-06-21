
export default class Swipe {
  constructor(cardsContainer, pagination) {
    this.cardsContainer = cardsContainer;
    this.pagination = pagination;
  }

  addMouseEvents() {
    const draggable = document.querySelector('.cards-container');

    draggable.addEventListener('mousedown', (event) => {
      if (event.target.getAttribute('class') === 'card-container' || 'link' || 'video') {
        const shiftX = event.pageX;


        const moveAt = function (event) {
          draggable.style.transform = `translateX(${event.pageX - shiftX}px)`;
        };

        const mouseMoveHandler = function (event) {
          moveAt(event);

          const xPos = parseInt(draggable.style.transform.replace(/[a-zA-Z]+./g, ''));

          if (xPos < -300) {
            document.removeEventListener('mousemove', mouseMoveHandler);
            draggable.style.transform = 'translateX(0px)';
            this.pagination.page += 1;
            if (this.pagination.page >= (this.cardsContainer.pagesArray.length / 2) && this.cardsContainer.searchBar.nextPage) {
              this.cardsContainer.searchBar.search();
            }
            this.cardsContainer.update();
          }
          if (xPos > 300) {
            if (this.pagination.page > 0) {
              document.removeEventListener('mousemove', mouseMoveHandler);
              draggable.style.transform = 'translateX(0px)';
              this.pagination.page -= 1;
              this.cardsContainer.update();
            }
          }
        }.bind(this);

        const museUpHandler = function () {
          draggable.style.transform = 'translateX(0px)';
          document.removeEventListener('mousemove', mouseMoveHandler);
          draggable.removeEventListener('mouseup', museUpHandler);
        };

        moveAt(event);

        document.addEventListener('mousemove', mouseMoveHandler);
        draggable.addEventListener('mouseup', museUpHandler);
      }
    });
  }

  addTouchEvents() {
    const draggable = document.querySelector('.cards-container');

    draggable.addEventListener('touchstart', (event) => {
      if (event.target.getAttribute('class') === 'card-container' || 'link' || 'video') {
        const shiftX = event.touches[0].clientX;

        const moveAt = function (event) {
          draggable.style.transform = `translateX(${event.touches[0].clientX - shiftX}px)`;
        };

        const touchMoveHandler = function (event) {
          moveAt(event);

          const xPos = parseInt(draggable.style.transform.replace(/[a-zA-Z]+./g, ''));

          if (xPos < -100) {
            document.removeEventListener('touchmove', touchMoveHandler);
            draggable.style.transform = 'translateX(0px)';
            this.pagination.page += 1;
            if (this.pagination.page >= (this.cardsContainer.pagesArray.length / 2) && this.cardsContainer.searchBar.nextPage) {
              this.cardsContainer.searchBar.search();
            }
            this.cardsContainer.update();
          }
          if (xPos > 100) {
            if (this.pagination.page > 0) {
              document.removeEventListener('touchmove', touchMoveHandler);
              draggable.style.transform = 'translateX(0px)';
              this.pagination.page -= 1;
              this.cardsContainer.update();
            }
          }
        }.bind(this);

        const touchEndHandler = function () {
          draggable.style.transform = 'translateX(0px)';
          document.removeEventListener('touchmove', touchMoveHandler);
          draggable.removeEventListener('touchend', touchEndHandler);
        };

        moveAt(event);

        document.addEventListener('touchmove', touchMoveHandler);
        draggable.addEventListener('touchend', touchEndHandler);
      }
    });
  }

  init() {
    this.addMouseEvents();
    this.addTouchEvents();
  }

}

