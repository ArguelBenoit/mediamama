import history from 'Utils/history';
const jwtCookieName = 'datingJwt';

let setJwtCookie = (jwt, route) => {
  // document.cookie = `datjwt=${jwt}; Secure; HttpOnly;`;
  document.cookie = `${jwtCookieName}=${jwt};`;
  if (route) {
    setTimeout(() => history.push(route), 100);
  }
};

let destroyJwtCookie = route => {
  document.cookie = `${jwtCookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  if (route) {
    history.push(route);
  }
};

let getJwtCookie = () => {
  const name = `${jwtCookieName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export {
  setJwtCookie,
  destroyJwtCookie,
  getJwtCookie
};
