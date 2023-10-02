export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this.items.forEach((item) => {
      const renderedItem = this.renderer(item);
      this._container.appendChild(renderedItem);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
