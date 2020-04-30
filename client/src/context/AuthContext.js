import {createContext} from "react";
import AuthClass from "../class/AuthClass";

function noop() {}
let auth  = new AuthClass();
export const AuthContext = createContext({
    token: null,
    usedId: null,
    login: auth.login(),
    logout: auth.logout(),
    isAuthenticated: false
})
