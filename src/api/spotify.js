import axios from "axios";

const clientId = "e45b9aa8bed142158c16baceb64f9f43";
const redirectUrl = "https://pt-huang.github.io/react-alpha-cast/";

const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope = "user-read-private user-read-email";

// Data structure that manages the current active token, caching it in localStorage
const currentToken = {
  get access_token() {
    return localStorage.getItem("access_token") || null;
  },
  get refresh_token() {
    return localStorage.getItem("refresh_token") || null;
  },
  get expires_in() {
    return localStorage.getItem("refresh_in") || null;
  },
  get expires() {
    return localStorage.getItem("expires") || null;
  },

  save: function (response) {
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("expires_in", expires_in);

    const now = new Date();
    const expiry = new Date(now.getTime() + expires_in * 1000);
    localStorage.setItem("expires", expiry);
  },
};

// On page load, try to fetch auth code from current browser search URL
const args = new URLSearchParams(window.location.search);
const code = args.get("code");

// If we find a code, we're in a callback, do a token exchange
if (code) {
  const token = await getToken(code);
  currentToken.save(token);

  // Remove code from URL so we can refresh correctly.
  const url = new URL(window.location.href);
  url.searchParams.delete("code");

  const updatedUrl = url.search ? url.href : url.href.replace("?", "");
  window.history.replaceState({}, document.title, updatedUrl);
}

async function redirectToSpotifyAuthorize() {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  const randomString = randomValues.reduce(
    (acc, x) => acc + possible[x % possible.length],
    ""
  );

  const code_verifier = randomString;
  const data = new TextEncoder().encode(code_verifier);
  const hashed = await crypto.subtle.digest("SHA-256", data);

  const code_challenge_base64 = btoa(
    String.fromCharCode(...new Uint8Array(hashed))
  )
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  window.localStorage.setItem("code_verifier", code_verifier);

  const authUrl = new URL(authorizationEndpoint);
  const params = {
    response_type: "code",
    client_id: clientId,
    scope: scope,
    code_challenge_method: "S256",
    code_challenge: code_challenge_base64,
    redirect_uri: redirectUrl,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
}

// Soptify API Calls
async function getToken(code) {
  const code_verifier = localStorage.getItem("code_verifier");

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUrl,
      code_verifier: code_verifier,
    }),
  });

  return await response.json();
}

async function refreshToken() {
  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "refresh_token",
      refresh_token: currentToken.refresh_token,
    }),
  });
  return await response.json();
}

export async function getProfile() {
  const isValid = await isTokenValid();
  if (!isValid) return null;
  const { data } = await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + currentToken.access_token,
    },
  });
  return data;
}

// Click handlers
export async function loginWithSpotifyClick() {
  await redirectToSpotifyAuthorize();
}

export async function logoutClick() {
  localStorage.clear();
  window.location.href = redirectUrl;
}

export async function refreshTokenClick() {
  const token = await refreshToken();
  currentToken.save(token);
}

export async function isTokenValid() {
  const access_token = localStorage.getItem("access_token");
  const expires = localStorage.getItem("expires");

  if (!access_token || !expires) {
    return false;
  }

  const expiryDate = new Date(expires);
  const now = new Date();

  const timeDiff = expiryDate - now;

  if (timeDiff < 10 * 60 * 1000) {
    console.log("⚠️ Token 即將過期，請刷新");
    await refreshTokenClick();
    console.log("✅ Token 刷新完成");
  }

  // 嘗試發送 API，確認 token 是否有效
  try {
    await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
    return true;
  } catch (error) {
    console.error("Token Invalid", error);
    return false;
  }
}

export async function searchPodcast(str) {
  const isValid = await isTokenValid();
  if (!isValid) return null;
  try {
    const queryStr = encodeURIComponent(str);
    const { data } = await axios.get(
      `https://api.spotify.com/v1/search?q=${queryStr}&type=show&limit=12&include_external=audio`,
      {
        headers: {
          Authorization: "Bearer " + currentToken.access_token,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("[Search failed]: ", error);
  }
}

export async function getShows(showIds) {
  const isValid = await isTokenValid();
  if (!isValid) return null;
  if (!Array.isArray(showIds) || showIds.length === 0) {
    return [];
  }
  const payload = showIds.map(show => show.id).join(",");

  try {
    const {data} = await axios.get(`https://api.spotify.com/v1/shows?market=TW&ids=${payload}`, {
      headers: {
        Authorization: "Bearer " + currentToken.access_token,
      },
    })
    return data
  } catch (error) {
    console.error("[Get shows failed]: ", error);
  }
}

export async function getShowEpisodes(showId) {
  const isValid = await isTokenValid();
  if (!isValid) return null;
  try {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/shows/${showId}/episodes?market=TW&limit=20`,
      {
        headers: {
          Authorization: "Bearer " + currentToken.access_token,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("[Get episodes from show failed]: ", error);
    return [];
  }
}

export async function getEpisodes(episodeIds) {
  const isValid = await isTokenValid();
  if (!isValid) return null;
  try {
    const requests = episodeIds.map((episodeId) =>
      axios.get(`https://api.spotify.com/v1/episodes/${episodeId.id}`, {
        headers: {
          Authorization: "Bearer " + currentToken.access_token,
        },
      })
    );
    const responses = await Promise.all(requests);
    return responses.map((response) => response.data) || [];
  } catch (error) {
    console.error("[Get episodes failed]: ", error);
    return [];
  }
}
