import React, { Component } from 'react'
import axios from 'axios';
import styles from './Home.module.css';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SeachBar';


class Home extends Component{

    state = {
        items: [],
        loading: true,
        favorites: [],
        searchTerm: '',
        filteredItems: []
    }

    componentDidMount(){
        //Fetch all reports 
        axios.get('https://nl-static-site-assets.s3.ap-south-1.amazonaws.com/reports.json')
            .then(response =>{
                this.setState({
                    loading: false,
                    items: response.data.items
                });
                //Fetch favorites from local storage and set state of 'favorites'
                const items = JSON.parse(localStorage.getItem("items"));
                this.setState({
                    favorites: items
                })
            })
            .catch(e => console.log(e))     
    }

    addRemoveFavHandler = (id, fav) => {
        let favs = [];
        if(!fav){
            //If the item is not already a favorite, add to favs array
            const item = this.state.items.find(item => item.id === id);
            
            if(this.state.favorites){ //If there are favorites in the array
                favs = [...this.state.favorites, item.id];
            }else{
                favs.push(item.id);
            }
        }else{
                //If item is in the favorites array, remove it
                favs = {...this.state.favorites};
                favs = favs.filter(itemId => itemId !== id)
            }

            //UPdate the state of favorites array
            this.setState({
                favorites: favs
            })

            //Locally store the favorite items
            localStorage.setItem("items", JSON.stringify(favs));
        
    }

    submitForm = (event, ref) => {
        event.preventDefault();
        event.persist();

        //Get all items where headline string contains the search term
        let filteredItems = this.state.items.filter(item => 
            item.item.headline[0]
            .toLowerCase()
            .indexOf(ref.trim().toLowerCase()) !== -1)

        this.setState({
            searchTerm: ref.trim(),
            filteredItems
        });
        
    }

    render(){

        let content = <p>Loading</p>;
        let itemsToBeDisplayed = this.state.items;

        //If a search term exists, filtered items to be displayed
        if(this.state.searchTerm !== ''){
            itemsToBeDisplayed = this.state.filteredItems;
        }
        if(!this.state.loading){
            content = itemsToBeDisplayed.map(item => 
                <Card 
                    headline = {item.item.headline[0]} 
                    key={item.id} 
                    clicked={(fav) => this.addRemoveFavHandler(item.id, fav)}
                    fav={this.state.favorites ? this.state.favorites.includes(item.id) : false}/>);
            
        }

        return (
            <React.Fragment>
                <SearchBar submit={(e, ref) => this.submitForm(e, ref)}/>
                <div className={styles.Home}>
                    {content}
                </div>
            </React.Fragment>

        )
    }

    
}

export default Home
