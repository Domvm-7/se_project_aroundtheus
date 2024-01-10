export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      document.querySelector(".cards__list").prepend(this._renderer(item)); // refactor
    });
  }

  addCard(cardElement) {
    this._container.prepend(cardElement);
  }
}
