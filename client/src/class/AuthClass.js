import React, {Component} from "react";

export default class AuthClass extends Component{
    constructor() {
        super();
        this.state = {
            token: null,
            userId: null
        }
        this.storangeName = 'userData';
    }

    login(token, userId){
        this.setState({
            token: token,
            userId: userId
        })

        localStorage.setItem(this.storangeName, JSON.stringify({
            userId, token
        }))
    }
    logout(){
        this.setState({
            token: null,
            userId: null
        })
    }
    getUserInfo(){
        return {
            token: this.state.token,
            userId: this.state.userId,
            logout: this.logout,
            login: this.login,
            isAuthticated: !!this.state.token
        }
    }
}
