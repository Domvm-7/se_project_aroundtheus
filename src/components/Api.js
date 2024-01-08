class Api {
  constructor(options) {
    this.options = options;
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "96c6ff05-502a-4b51-8415-98a1a2f3b371",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.all(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(`Error: ${err.message}\nURL: ${err.url}`);
      });
  }

  createCard(data) {
    return fetch(this.options.baseUrl + "/cards", {
      method: "POST",
      headers: {
        authorization: this.options.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => Promise.all(data));
      })
      .catch((err) => {
        console.error(`Error: ${err.message}\nURL: ${err.url}`);
      });
  }

  getUserInfo() {
    return fetch(this.options.baseUrl + "/users/me", {
      headers: {
        authorization: this.options.headers.authorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.all(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(`Error: ${err.message}\nURL: ${err.url}`);
      });
  }

  updateUserProfile(data) {
    console.log("data", data);
    return fetch(this.options.baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: this.options.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => Promise.all(data));
      })
      .catch((err) => {
        console.error(`Error: ${err.message}\nURL: ${err.url}`);
      });
  }

  updateAvatar(data) {
    console.log("data", data);
    return fetch(this.options.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: this.options.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => Promise.all(data));
      })
      .catch((err) => {
        console.error(`Error: ${err.message}\nURL: ${err.url}`);
      });
  }

  // other methods for working with the API
}

export const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "96c6ff05-502a-4b51-8415-98a1a2f3b371",
    "Content-Type": "application/json",
  },
});
