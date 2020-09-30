import React, { Component } from 'react'
import axios from 'axios';
import styles from './Home.module.css';
import Card from '../Card/Card';


class Home extends Component{

    state = {
        items: [],
        loading: true
    }

    componentDidMount(){
        
        axios.get('/reports.json')
            .then(response =>{
                this.setState({
                    loading: false,
                    items: response.data.items
                })
            })
            .catch(e => console.log(e))
    }

    render(){

        let content = <p>Loading</p>;
        if(!this.state.loading){
            content = this.state.items.map(item => <Card headline = {item.item.headline[0]} key={item.id}/>);
            
        }

        return (
            <div className={styles.Home}>
              {content}
            </div>
        )
    }

    
}

export default Home
