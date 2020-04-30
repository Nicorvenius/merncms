import React, {Component} from "react";
import {NavLink} from "react-router-dom";

export default class Navbar extends Component{

    constructor() {
        super();
    }

    logoutHendler = event =>{
        event.preventDefault()
        this.props.logout()
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper blue darken-1" style={{padding: '0.2rem'}}>
                    <span className="brand-logo">Big Content</span>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to="/create-post">Create Post</NavLink></li>
                        <li><NavLink to="/myposts">My Posts</NavLink></li>
                        <li><NavLink to="/posts">Posts</NavLink></li>
                        <li><NavLink to="/create-category">Create Category</NavLink></li>
                        <li><NavLink to="/list">List</NavLink></li>
                        <li><a href="/" onClick={this.logoutHendler}>Выйти</a></li>
                    </ul>
                </div>
            </nav>
        )
    }

}
