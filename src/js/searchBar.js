import 'whatwg-fetch';
import CardsContainer from './cardsContainer';


export default class SearchBar {
  constructor() {
    this.id = [];
    this.nextPage = '';
    this.responseConteiner = [];
    this.playlist = [];
    this.RESULTS_NUM = 15;
    this.API_KEY = 'AIzaSyD90rYOrNqc3dhGEy2Djs8cLdfoBXawwlc';
    this.INFO_REQUEST_TEMPLATE =
      'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=viewCount';
    this.STAT_REQUEST_TEMPLATE = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&maxResults=1';
  }

  addEvent() {
    this.input = document.querySelector('#search-input');
    document.addEventListener('keypress', (event) => {
      if (event.keyCode === 13 && event.target.value) {
        if (!event.target.getAttribute('id')) return;
        this.cardsContainer = null;
        this.playlist = [];
        this.nextPage = '';
        this.keyword = event.target.value;
        this.search();
      }
    });
  }

  search() {
    fetch(`${this.INFO_REQUEST_TEMPLATE}&q=${this.keyword}&maxResults=${this.RESULTS_NUM}&key=${this.API_KEY}${this.nextPage ? `&pageToken=${this.nextPage}` : ''}`)
      .then((response) => {
        if (response.status !== 200) {
          alert(`Ooops! Something wrong, status code: ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then((responseData) => {
        if (responseData.items.length === 0) {
          if (!this.cardsContainer) {
            alert(`Nothing on request: ${this.keyword}. Please try another!`);
          }
        } else {
          this.nextPage = responseData.nextPageToken;
          this.responseConteiner = [];
          this.getInfo(responseData);
          this.id = [];
          this.responseConteiner.map((item, i) => {
            this.id.push(this.responseConteiner[i].id);
          });
        }
      })
      .then(() => {
        if (this.responseConteiner.length !== 0) {
          fetch(`${this.STAT_REQUEST_TEMPLATE}&id=${this.id.join(',')}&key=${this.API_KEY}`)
            .then(response => response.json())
            .then((responseData) => {
              this.getStatistic(responseData);
              return this.responseConteiner;
            })
            .then((response) => {
              this.playlist = this.playlist.concat(response);
              if (this.cardsContainer) {
                this.cardsContainer.playlist = this.playlist;
                this.cardsContainer.updatePagesArray();
              } else {
                this.cardsContainer = new CardsContainer(this.playlist, this);
                this.cardsContainer.init();
              }
            });
        }
      });
  }

  getInfo(resultData) {
    resultData.items.forEach((item) => {
      const publishedAt = new Date(Date.parse(item.snippet.publishedAt));
      this.responseConteiner.push({
        link: `http://www.youtube.com/watch?v=${item.id.videoId}`,
        id: item.id.videoId,
        title: item.snippet.title,
        author: item.snippet.channelTitle,
        description: item.snippet.description,
        publishedDate: `${publishedAt.getDate()}.${publishedAt.getMonth()}.${publishedAt.getFullYear()}`,
        thumbnail: item.snippet.thumbnails.medium.url,
      });
    });
  }

  getStatistic(resultData) {
    resultData.items.forEach((item, i) => {
      this.responseConteiner[i].viewCount = item.statistics.viewCount;
      this.responseConteiner[i].likeCount = item.statistics.likeCount;
      this.responseConteiner[i].dislikeCount = item.statistics.dislikeCount;
    });
  }

  createSearchBar() {
    const body = document.querySelector('body');
    body.innerHTML += `<header class="header">
            <input type="text" id="search-input" placeholder="Search video...">
            <i class="searchIcon fa fa-search"></i>
        </header>`;
  }

  init() {
    this.createSearchBar();
    this.addEvent();
  }
}

