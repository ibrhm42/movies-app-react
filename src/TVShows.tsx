import React, { useEffect, useState } from 'react';
import { Nav, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {imgURL} from './GlobalVariables';
import {
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
  import genres from './genres';
  import Header from './Header';

 

  const TVShows = () => {

    const [TVShows, setTVShows]=useState<any>([]);
    const [category, setCategory] = useState('airing_today');

    const fetchData=()=>{
     
        fetch('https://api.themoviedb.org/3/tv/'+category+'?api_key=369f86b614006cd7c965f3f582810609&language=en-US&page=1')
        .then(response => response.json()).then((response:any)=> {

        let genreArr:string[]=[];
        
          let array:any=[];
          let detailsArr:string[]=[];
          let genreStr:string='';
          response.results.map((x:any)=> {
            genreArr=[];
            detailsArr=[];
            x.genre_ids.map((x:number)=> genres.map(y=> {if(y.id==x) {genreArr.push(y.name);}}));
          if(genreArr.length>3){
            genreStr=genreArr[0]+', '+genreArr[1]+', '+genreArr[2];
          }
          else{
            genreStr=genreArr.join(', ');
          }
          array.push(detailsArr.concat(x.id,imgURL+x.poster_path,x.name,x.vote_average+'/10', genreStr));
          })
          setTVShows(array);
    
  
      })
      
    }
    
    useEffect(()=> fetchData(), [category]);

   const handlePopular = () => {
     setCategory('popular');
   }
   const handleTopRated = () => {
    setCategory('top_rated');
  }
  const handleAiringToday = () => {
    setCategory('airing_today');
  }
  const handleOnAir = () => {
    setCategory('on_the_air');
  }

  interface style{
    color: string,
    backgroundColor:string
  }

  const activeStyle:style={
    color: 'white',
    backgroundColor: 'rgba(256,256,256,0.1)'
  }
  const passiveStyle:style={
    color: 'black',
    backgroundColor: 'transparent'
  }
      return (
        <div className='header-main'>
        <Header />
        <div className='movies-tv-container'>
        <Nav className='categoriesNav'>
            <Nav.Item><Nav.Link style={category=='popular'?activeStyle:passiveStyle} onClick={handlePopular}>Popular</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link style={category=='airing_today'?activeStyle:passiveStyle} onClick={handleAiringToday}>Airing Today</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link style={category=='on_the_air'?activeStyle:passiveStyle} onClick={handleOnAir}>On Air</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link style={category=='top_rated'?activeStyle:passiveStyle} onClick={handleTopRated}>Top Rated</Nav.Link></Nav.Item>
        </Nav>
        <div className='movies-tv-grid-container'><h4>{category=='popular'?'Popular':category=='on_the_air'?'On Air'
        :category=='top_rated'?'Top Rated': 'Airing Today'} TVShows</h4>
      <div className='movies-tv-grid' >
        {TVShows.map((x:any)=> 
        <Link to={'/tv/'+x[0]} className='movies-tv-link'><div className='movies-tv-card' >
      <div className='movies-tv-img' style={{backgroundImage:'url('+x[1]+')'}} ></div>
    <div className='movie-tv-card-details'><h6>{x[2]}</h6>
    <p>{x[3]}</p></div>
        </div></Link>)}
      </div>
      </div>
      </div>
      </div>
      )
  }

  export default TVShows;