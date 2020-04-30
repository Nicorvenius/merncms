import {Component} from 'react'

export default class Messange extends Component {

    sendMessange(text) {
        if (window.M && text) {
            window.M.toast({html: text})
        }
    }
}
