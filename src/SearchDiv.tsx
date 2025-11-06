import React, { useEffect, useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Nav} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {imgURL} from './GlobalVariables';

const SearchDiv = () => {
    const [TVSearch, setTVSearch]=useState<string[]>([]);
    const [filmSearch, setFilmSearch]=useState<string[]>([]);

    const handleSearch=(e:any)=> {
        if(e.target.value.length>=1){
        fetch('https://api.themoviedb.org/3/search/tv?api_key=369f86b614006cd7c965f3f582810609&language=en-US&page=1&include_adult=true&query='+e.target.value)
    .then(response => response.json()).then(response => {
        let array:any=[];
        let detailsArr:string[]=[];
        
          response.results.map((x:any)=> {
            detailsArr=[];
            array.push(detailsArr.concat(x.name,x.vote_average, x.first_air_date, imgURL+x.poster_path,x.id.toString() ));
          })
          setTVSearch(array);
        
    })
    
    fetch('https://api.themoviedb.org/3/search/movie?api_key=369f86b614006cd7c965f3f582810609&language=en-US&page=1&include_adult=true&query='+e.target.value)
    .then(response => response.json()).then(response => {
        let array:any=[];
        let detailsArr:string[]=[];
       
          response.results.map((x:any)=> {
            detailsArr=[];
            array.push(detailsArr.concat(x.title,x.vote_average, x.release_date, imgURL+x.poster_path,x.id.toString()  ));
          })
          setFilmSearch(array);
        
    })
    }
    else{
    setTVSearch([]);
    setFilmSearch([]);
    }
      }

      return (
        <Nav.Item className='search-div'>
        <div className='search-bar'>
          <input type='text' placeholder='Search movies, tv shows...' onChange={handleSearch}/>
          <Nav.Link href="#"><FontAwesomeIcon icon={faSearch}/> </Nav.Link>
        </div>
        <div className='search-results'>
            <Nav className='flex-column'>
            {
              filmSearch.map((x:any, i:number)=> 
                ( <>{x &&
                  <a href={'/imdb/film/'+x[4]}><Nav.Item id={x[4]} >
                  <img src={x[3]} />
                  <div className='search-details'>
              <Nav.Link href={'/imdb/film/'+x[4]} >{x[0]}</Nav.Link>
              <Nav.Link href={'/imdb/film/'+x[4]} >{x[1]}</Nav.Link>
              <Nav.Link href={'/imdb/film/'+x[4]} >{x[2]}</Nav.Link>
                </div>
                </Nav.Item></a>}
        {TVSearch[i] && 
        <a href={'/imdb/tv/'+TVSearch[i][4]}><Nav.Item id={TVSearch[i][4]}>
        <img src={TVSearch[i][3]} />
        <div className='search-details'>
        <Nav.Link href={'/imdb/tv/'+TVSearch[i][4]} >{TVSearch[i][0]}</Nav.Link>
        <Nav.Link href={'/imdb/tv/'+TVSearch[i][4]} >{TVSearch[i][1]}</Nav.Link>
        <Nav.Link href={'/imdb/tv/'+TVSearch[i][4]} >{TVSearch[i][2]}</Nav.Link>
        </div>
        </Nav.Item></a>}
        </>
              ))
            }
            </Nav>
          </div>
        </Nav.Item>
      )
}

export default SearchDiv;