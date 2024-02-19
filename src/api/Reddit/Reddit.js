import { Parser } from "../../utils/Parser.js";

const clientId = import.meta.env.VITE_CLIENT_ID;
let token = {token: 'invalidtoken', expireTime: 10};

// Generate random string to use for device ID
function generateRandomString(length) {
    let string = '';
    let allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        string += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
    }

    return string;
};

const Reddit = {
    async getToken() {
      try {
        const response = await fetch('https://www.reddit.com/api/v1/access_token', {
          method: 'POST',
          body: new URLSearchParams({
            'grant_type': 'https://oauth.reddit.com/grants/installed_client',
            'device_id': generateRandomString(24)
          }),
          headers: {
            'Authorization': 'Basic ' + btoa(clientId + ':' + '')
          },
        });

        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        
        return await response.json();
      } catch(error) {
        console.log('There was an error', error);
      }
      },

      async getPosts(endpoint, args) {
        if (token.expireTime <= Date.now() - 5000) {
            const tokenResponse = await this.getToken();
            token = {token: tokenResponse.access_token, expireTime: Date.now() + (tokenResponse.expires_in * 1000)};
        };

        try {
          const response = await fetch(`https://oauth.reddit.com/${endpoint}?raw_json=1${args}`, {
              method: 'GET',
              headers: { 'Authorization': 'Bearer ' + token.token },
          });

          if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }
          
          return await response.json();          
        } catch(error) {
          console.log('There was an error', error);
        }
    },

    async getComments(post) {
      if (token.expireTime <= Date.now() - 5000) {
          const tokenResponse = await this.getToken();
          token = {token: tokenResponse.access_token, expireTime: Date.now() + (tokenResponse.expires_in * 1000)};
      };

      try {
        const response = await fetch(`https://oauth.reddit.com/comments/${post}?raw_json=1`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token.token },
        });
        
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        const comments = await response.json();
        const flatComments = Parser.flatten(comments[1].data.children);
        comments[1].data.children.splice(0, Infinity, ...flatComments);

        return comments;
      } catch(error) {
        console.log('There was an error', error);
      }        
    },

    async getMoreComments(post, comments) {
      if (token.expireTime <= Date.now() - 5000) {
          const tokenResponse = await this.getToken();
          token = {token: tokenResponse.access_token, expireTime: Date.now() + (tokenResponse.expires_in * 1000)};
      };

      try {
        const response = await fetch(`https://oauth.reddit.com/api/morechildren/?api_type=json&children=${comments}&depth=6&link_id=${post}&raw_json=1`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token.token },
        });
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        return await response.json();
      } catch(error) {
        console.log('There was an error', error);
      }      
    }
};

export { Reddit };