import React, {Component} from "react";
import useHttp from "../class/useHttpClass";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default class CreatePage extends Component{

    constructor() {
        super();
        this.httpRequest = new useHttp();
        this.state = {
            select_value: "",
            title: "",
            content: "",
            category_list: []
        };
        this.push = this.push.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
    }
    componentDidMount(){
        this.getCategory();
    }
    handleChange(event){
        this.setState({title: event.target.value})
    }
    handleChangeContent(event){
        this.setState({content: event.target.value})
    }
    handleChangeSelect(event){
        this.setState({select_value: event.target.value})
    }
    output(){
        console.log("Success category create")
    }
    push(event) {
        const {select_value, title, content} = this.state;
        this.data = this.httpRequest.request('/api/posts/create', 'POST', {catId: select_value, title, content , userId: this.props.userId }, {
            Authorization: `Bearer ${this.props.token}`
        }).then(function (callback) {
            NotificationManager.success('Success', 'Success publication create')
        }).catch(error => NotificationManager.error(error.toString(), 'Error'))
        event.preventDefault();
    }
    getCategory = async() => {
        console.log("Call")
        this.data = await this.httpRequest.request('/api/category/', 'GET', null, {
            Authorization: `Bearer ${this.props.token}`
        }).then((result) => {
            console.log("Success category upload")
            this.setState({category_list: result})
        }).catch(function (e) {
            console.log("Error category upload: " + e);
        })
    }


    render() {
        return (
            <div className="row">
                <div className="col s8 offset-s2">
                    <form onSubmit={this.push}>
                        <label>Post title:
                            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />

                        </label>
                        <label>Post description:
                            <textarea value={this.state.content} onChange={this.handleChangeContent} />

                        </label>
                        <label>Please select category:
                            <select value={this.state.select_value} onChange={this.handleChangeSelect}>
                                {
                                    this.state.category_list.map((item, index) => {
                                    return (
                                        <option value={item._id}>{item.name}</option>
                                    )
                                }) }
                            </select>
                        </label>
                        <input type="submit" value="Create category!" />
                    </form>
                </div>
                <NotificationContainer/>
            </div>
        )
    }
}
