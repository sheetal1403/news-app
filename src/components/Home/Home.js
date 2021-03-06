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
        filteredItems: [],
        error: false
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
            .catch(e => this.setState({error: true, loading: false}))    
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
                favs = [...this.state.favorites];
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

        //Get an array of search terms
        let searchWords = ref.trim().split(' ');

        //Get all items where headline string contains any of the the search term
        let filteredItems = this.state.items.filter(item => { 
                    let validSearchWords = searchWords.filter(word => item.item.headline[0].toLowerCase().indexOf(word.toLowerCase()) !== -1);
                    return !!validSearchWords.length
                }
               )
        this.setState({
            searchTerm: ref.trim(),
            filteredItems
        });
        
    }

    render(){

        let content = this.state.error ? <h2 style={{textAlign: 'center'}}>Error in loading</h2> : <h2 style={{textAlign: 'center'}}>Loading</h2>;
        let itemsToBeDisplayed = this.state.items;

        //If a search term exists, filtered items to be displayed
        if(this.state.searchTerm !== ''){
            itemsToBeDisplayed = this.state.filteredItems;
        }
        if(!this.state.loading && !this.state.error){
            content =<div className={styles.Home}>
                        {itemsToBeDisplayed.map(item => 
                        <Card 
                        headline = {item.item.headline[0]} 
                        key={item.id} 
                        clicked={(fav) => this.addRemoveFavHandler(item.id, fav)}
                        fav={this.state.favorites ? this.state.favorites.includes(item.id) : false}/>)}
                    </div>
            
            
            
            
            
        }

        return (
            <React.Fragment>
                <SearchBar submit={(e, ref) => this.submitForm(e, ref)}/>
                
                    {content}
                
            </React.Fragment>

        )
    }

    
}

export default Home
