import React, {Component} from "react";
import useHttp from "../class/useHttpClass";
import Message from "../class/MessageClass";


export default class AuthPage extends Component {

    constructor() {
        super();
        this.httpRequest = new useHttp();
        this.message = new Message();
        this.state = {
            email: '',
            password:''
        };
        this.data = {};
    }


    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    registerHandler = async () => {
        try {
            this.data = await this.httpRequest.request('api/auth/register', 'POST', {...this.state})
            if (this.data.message){
                this.message.sendMessange(this.data.message)
            }
        } catch (e) {
            this.message.sendMessange(e)
        }
    }

    loginHandler = async () => {
        try {
            this.data = await this.httpRequest.request('/api/auth/login', 'POST', {...this.state})
            if (this.data.message){
                this.message.sendMessange(this.data.message)
            }
            this.props.login(this.data.token, this.data.userId)
        } catch (e) {
            this.message.sendMessange(e)
        }
    }

    render() {
        window.M.updateTextFields();
        return (
            <div className="row">
                <div className="col s6 offset-s3">
                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Big Content</span>
                            <div>
                                <div className="input-field">
                                    <input placeholder="Введите email" id="email" type="text" name="email" className="yellow-input" onChange={this.changeHandler}/>
                                        <label htmlFor="email">Email</label>
                                </div>
                                <div className="input-field">
                                    <input placeholder="Введите password" id="password" name="password" type="password" onChange={this.changeHandler}/>
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>
                        </div>
                        <div className="card-action">
                            <button className="btn yellow darken-4" onClick={this.loginHandler}>Войти</button>
                            <button className="btn yellow darken-4" onClick={this.registerHandler}>Регистрация</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
