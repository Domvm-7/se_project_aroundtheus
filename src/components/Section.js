export default class Section {
  constructor({ renderer }, containerSelector, items) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._items = items;
  }

  renderItems() {
    this._renderer.forEach((items) => {
      this._renderer(items);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
