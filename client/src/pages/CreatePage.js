import React, {Component} from "react";
import useHttp from "../class/useHttpClass";

export default class CreatePage extends Component{

    constructor() {
        super();
        this.httpRequest = new useHttp();
        this.data = {};
    }

    push = async () =>{
        try{
            this.data = await this.httpRequest.request('/api/rooms/generate', 'POST', {roomNumber: this.id}, {
                Authorization: `Bearer ${this.props.token}`
            })
        }catch (e) {
            console.log(e)
        }
    }


    render() {
        return (
            <div className="row">
                <div className="col s8 offset-s2">
                    <button onClick={this.push}>Create</button>
                </div>
            </div>
        )
    }
}
