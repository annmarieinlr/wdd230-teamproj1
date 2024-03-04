import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import jwt_decode from "jwt-decode";

const tokenKey = "so-token";

export async function login(creds, redirect = "/") {
    try {
        const token = await loginRequest(creds);
        setLocalStorage(tokenKey, token);
        window.location = redirect;
    } catch (err) {
        alertMessage(err.message.message);
    }
}

export function checkLogIn() {
    const token = getLocalStorage(tokenKey);
    const valid = isTokenValid(token);

    if (!valid) {
        localStorage.removeItem(tokenKey);
        const location = window.location();
        console.log(location);
        window.location = `/login/index.html?redirect=${location.pathname}`;
    } else return token;
};

function isTokenValid(token) {
    if (token) {
        // decode the token
        const decoded = jwt_decode(token);
        // get the current date
        let currentDate = new Date();
        // JWT exp is in seconds, the time from our current date will be milliseconds.
        if (decoded.exp * 1000 < currentDate.getTime()) {
            //token expiration has passed
            console.log("Token expired.");
            return false;
        } else {
            // token not expired
            console.log("Valid token");
            return true;
        }
        //no token...automatically return false.
    } else return false;
};