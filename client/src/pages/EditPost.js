import React, {Component} from "react";
import { withRouter } from "react-router";
import {Link} from "react-router-dom";
import useHttp from "../class/useHttpClass";

class ReadPost extends Component {


    constructor(props) {
        super(props);
        this.httpRequest = new useHttp();
        this.state = {
            id: this.props.match.params.id,
            select_value: "",
            title: "",
            content: "",
            category_list: []
        }
        this.edit = this.edit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
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

    componentDidMount() {
        this.getItem();
        this.getCategory();
    }

    getCategory = async() => {
        console.log("Call")
        this.data = await this.httpRequest.request('/api/category/', 'GET', null, {
            Authorization: `Bearer ${this.props.token}`
        }).then((result) => {
            console.log("Success category upload")
            this.setState({category_list: result})
            // this.category_list = result;
            console.log(this.state.category_list)
        }).catch(function (e) {
            console.log("Error category upload: " + e);
        })
    }

    getItem = async () => {
        await this.httpRequest.request(`/api/posts/${this.state.id}`, 'GET', null, {
            Authorization: `Bearer ${this.props.token}`
        }).then((result) => {
            console.log(result)
            this.setState({
                title: result.title,
                content: result.content,
                select_value: result.catId._id,
            })
        })
    }
    edit = async (event) => {
        const {select_value, title, content} = this.state;
        this.data = this.httpRequest.request(`/api/posts/edit/${this.state.id}`, 'PUT', {catId: select_value, title, content , userId: this.props.userId }, {
            Authorization: `Bearer ${this.props.token}`
        }).then(function () {
            console.log("Success category create")
        }).catch(function (e) {
            alert("Error category create: " + e);
        })
        event.preventDefault();
    }
    render() {
        console.log(this.props)
        return (
            <div className="row">
                <div className="col s8 offset-s2">
                    <form onSubmit={this.edit}>
                        <label>Post title:
                            <input type="text" name="name" value={this.state.title} onChange={this.handleChange} />

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
                        <input type="submit" value="Edit" />
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(ReadPost);
