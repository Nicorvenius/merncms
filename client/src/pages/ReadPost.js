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
            data: {
                userId: {
                    email: ''
                },
                catId:{
                    name: ''
                }
            }
        }
    }

    componentDidMount() {
        this.getItem();
    }

    getItem = async () => {
        await this.httpRequest.request(`/api/posts/${this.state.id}`, 'GET', null, {
            Authorization: `Bearer ${this.props.token}`
        }).then((result) => {
            console.log(result)
            this.setState({
                data: result
            })
        })
    }
    removePost = async () => {
        await this.httpRequest.request(`/api/posts/remove/${this.state.id}`, 'DELETE', {user_id: this.props.user_id}, {
            Authorization: `Bearer ${this.props.token}`
        }).then((result) => {
            alert('Remove success')
        }).catch((resone) => {
            console.log(resone)
        })
    }
    Edit = async () => {
        await this.httpRequest.request(`/api/posts/edit/${this.state.id}`, 'PUT', {user_id: this.props.user_id}, {
            Authorization: `Bearer ${this.props.token}`
        }).then((result) => {
            alert('Remove success')
        }).catch((resone) => {
            console.log(resone)
        })
    }
    render() {
        const {data} = this.state;
        // const email = data.userId.email != 0;
        // const name = data.userId.name != 0;
        return (
            <div>
                <h1>{data.title}</h1>
                <h6>Author: {data.userId.email}</h6>
                <h6>Category: {data.catId.name}</h6>
                <p>{data.content}</p>
                <button onClick={() => this.removePost()}>Delete</button>
                <Link to={`/edit/${data._id}`}>Edit</Link>
            </div>
        )
    }
}
export default withRouter(ReadPost);
