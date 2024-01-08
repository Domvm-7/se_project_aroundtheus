class Api {
  constructor(options) {
    this.options = options;
  }

  // Common method for handling fetch requests
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((data) => Promise.reject(data));
  }

  // Common method for handling fetch errors
  _handleError(err) {
    console.error(`Error: ${err.message}\nURL: ${err.url}`);
  }

  // Get user information
  getUserInfo() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: {
        authorization: this.options.headers.authorization,
      },
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  // Update user profile
  updateUserProfile(data) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.options.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  // Update user avatar
  updateAvatar(data) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.options.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  // Get initial cards
  getInitialCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: {
        authorization: this.options.headers.authorization,
      },
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  // Create a new card
  createCard(data) {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this.options.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  // Other methods for working with the API
}

// Create an instance of the Api class
export const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "96c6ff05-502a-4b51-8415-98a1a2f3b371",
    "Content-Type": "application/json",
  },
});
