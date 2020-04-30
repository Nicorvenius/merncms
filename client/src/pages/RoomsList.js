import React, {Component} from "react";
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
        await this.httpRequest.request('/api/rooms/', 'GET', null, {
            Authorization: `Bearer ${this.props.token}`
        }).then((result) => {
            this.setState({
                list: result
            })
        })
    }


    reservation = async (roomNumber, reservations) =>{
        try{
            this.data = await this.httpRequest.request('/api/rooms/reservation', 'POST', {roomNumber: roomNumber, reservation: reservations}, {
                Authorization: `Bearer ${this.props.token}`
            }).then((result) => {
                this.setState({
                    list: result
                })
            })
        }catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className="">
                <table>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Состояние</th>
                        <th>Забронировать</th>
                    </tr>
                    </thead>

                    <tbody>
                    { this.state.list.map((item, index) => {
                        let res = 'Свободный'
                        let button =  'Забронировать'
                        if (item.reservation === true){
                            res = 'Занятый';
                            button = 'Разбронировать'
                        }
                        return (
                            <tr key={item.roomNumber}>
                                <td>{item.roomNumber}</td>
                                <td>{res}</td>
                                <td><button onClick={() => this.reservation(item.roomNumber, !item.reservation)}>{button}</button></td>
                            </tr>
                        )
                    }) }
                    </tbody>
                </table>
            </div>
        )
    }
}
