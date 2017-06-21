
export default class Card {

  createCardsSection() {
    const body = document.querySelector('body');
    body.innerHTML += '<section class="cards-container"></section>';
  }

  createCard(cardsItem) {
    const card =
      `<div class="card-container">
        <div class="video"><img src="${cardsItem.thumbnail}"></div>
        <div class="link"><a href=${cardsItem.link} target="_blank"><p class="title"> ${cardsItem.title}</a></p>
        <div class="info"><p><i class="fa fa-user-circle-o"></i> ${cardsItem.author}</p> 
          <p><i class="fa fa-eye"></i> ${cardsItem.viewCount}</p> 
          <p><i class="fa fa-thumbs-o-up"></i> ${cardsItem.likeCount} 
          <i class="fa fa-thumbs-o-down"></i> ${cardsItem.dislikeCount}</p>
        </div>
        <p class="date"><i class="fa fa-calendar-o calendar"></i> ${cardsItem.publishedDate}</p> 
        <p class="description">${cardsItem.description}</p>
      </div>`;
    document.querySelector('.cards-container').innerHTML += card;
  }

}

