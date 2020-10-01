import React, { Component } from 'react'
import axios from 'axios';
import styles from './Home.module.css';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SeachBar';


class Home extends Component{

    state = {
        items: [],
        loading: true,
        favorites: []
    }

    componentDidMount(){
        
        axios.get('https://nl-static-site-assets.s3.ap-south-1.amazonaws.com/reports.json')
            .then(response =>{
                this.setState({
                    loading: false,
                    items: response.data.items
                });
                const items = JSON.parse(localStorage.getItem("items"));
                this.setState({
                    favorites: items
                })
            })
            .catch(e => console.log(e))

        
    }

    addToFavHandler = (id, fav) => {
        let favs = [];
        if(!fav){
            
            const item = this.state.items.find(item => item.id === id);
            
            if(this.state.favorites){
                favs = [...this.state.favorites, item.id];
            }else{
                favs.push(item.id);
            }
        }else{
                //Remove from favorites
                favs = this.state.favorites;
                favs = favs.filter(itemId => itemId !== id)
                console.log(favs)
            }
            this.setState({
                favorites: favs
            })
            localStorage.setItem("items", JSON.stringify(favs));
        
    }

    render(){

        let content = <p>Loading</p>;
        if(!this.state.loading){
            content = this.state.items.map(item => 
                <Card 
                    headline = {item.item.headline[0]} 
                    key={item.id} 
                    clicked={(fav) => this.addToFavHandler(item.id, fav)}
                    fav={this.state.favorites ? this.state.favorites.includes(item.id) : false}/>);
            
        }

        return (
            <React.Fragment>
                <SearchBar/>
                <div className={styles.Home}>
                    {content}
                </div>
            </React.Fragment>
                
        )
    }

    
}

export default Home
