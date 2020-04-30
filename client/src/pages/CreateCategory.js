import React, {Component} from "react";
import useHttp from "../class/useHttpClass";

export default class CreatePage extends Component{

    constructor() {
        super();
        this.httpRequest = new useHttp();
        this.state = {
            name: ""
        };
        this.push = this.push.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({name: event.target.value})
    }

    push(event) {
        this.data = this.httpRequest.request('/api/category/create', 'POST', {name: this.state.name}, {
            Authorization: `Bearer ${this.props.token}`
        }).then(function () {
            alert("Success category create")
        }).catch(function (e) {
            alert("Error category create: " + e);
        })

        event.preventDefault();
    }


    render() {
        return (
            <div className="row">
                <div className="col s8 offset-s2">
                    <form onSubmit={this.push}>
                        <label>Category name:
                            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Create category!" />
                    </form>
                </div>
            </div>
        )
    }
}
