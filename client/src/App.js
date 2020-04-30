import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from './routes'
import Navbar from "./components/Navbar";
import "materialize-css"

export default class App extends Component{

    constructor() {
        super();
        this.storangeName = 'userData';
        this.localStorage = JSON.parse(localStorage.getItem(this.storangeName)) || {token: null, userId: null}
        this.state = {
            token: this.localStorage.token,
            userId: this.localStorage.userId,
            isAuthticated: !!this.localStorage.token
        }
    }

    login = (token, userId) => {
        this.setState({
            token: token,
            userId: userId,
            isAuthticated: true
        })

        localStorage.setItem(this.storangeName, JSON.stringify({
            userId, token
        }))
    }
    logout = () =>{
        this.setState({
            token: null,
            userId: null,
            isAuthticated: false
        })
        this.clearLocalStorage()
    }
    clearLocalStorage(){
        localStorage.setItem(this.storangeName, '[{}]');
    }

    render() {
        const routes = useRoutes(!!this.state.token, {login: this.login, logout:this.logout, token: this.state.token, userId:this.state.userId});
        return (
            <Router>
                { this.state.isAuthticated && <Navbar logout={this.logout}/>}
                <div className="container">
                    {routes}
                </div>
            </Router>
        );
    }
}
