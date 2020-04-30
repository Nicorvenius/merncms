import React, {Component} from "react";
import {Link} from "react-router-dom";
import useHttp from "../class/useHttpClass";

export default class RoomsList extends Component {


    constructor(props) {
        super(props);
        this.httpRequest = new useHttp();
        this.list = this.getItem();
        this.state = {
            list: []
        }
    }



    getItem = async () => {
        await this.httpRequest.request(`/api/posts/user/${this.props.userId}`, 'GET', null, {
            Authorization: `Bearer ${this.props.token}`
        }).then((result) => {
            console.log(result)
            this.setState({
                list: result
            })
        })
    }


    render() {
        return (
            <div className="">
                <table>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Read</th>
                    </tr>
                    </thead>

                    <tbody>
                    { this.state.list.map((item, index) => {
                        return (
                            <tr key={item._id}>
                                <td>{index}</td>
                                <td>{item.title}</td>
                                <td>{item.catId.name}</td>
                                <td>{item.userId.email}</td>
                                <td><Link to={`/read/${item._id}`}>Read</Link></td>
                            </tr>
                        )
                    }) }
                    </tbody>
                </table>
            </div>
        )
    }
}
