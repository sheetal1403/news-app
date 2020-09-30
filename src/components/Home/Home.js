import React, { Component } from 'react'
import axios from 'axios';

class Home extends Component{

    componentDidMount(){
        axios.get('/reports.json')
            .then(response => console.log(response.data.items))
            .catch(e => console.log(e))
    }

    render(){
        return (
            <div>
                HOME
            </div>
        )
    }

    
}

export default Home
