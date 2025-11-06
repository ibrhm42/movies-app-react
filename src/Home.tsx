import React, { useEffect, useState, useRef} from 'react';
import './Home.scss';
import { Nav, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faTv, faGamepad, faMale, faClock, faFile, faHeart, faSearch,faArrowDown, faPlayCircle,faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import profile from './tom-cruise.jpg';
import genres from './genres';
import {alertDialogue} from './GlobalVariables';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";


const imgURL='http://image.tmdb.org/t/p/original';
const youtubeURL='https://www.youtube.com/embed/';
function Home() {

  const [cover, setCover]= useState<string[]>([]);
  const [trailer, setTrailer]=useState('');
  const [trailerClick, setTrailerClick] =useState(0);
  const [profileClick, setProfileClick] =useState(false);
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [recommended, setRecommended]=useState<any>([]);
  const [topRated, setTopRated]=useState<any>([]);
  const [mostPopular, setMostPopular]=useState<any>([]);
  const [boxOffice, setboxOffice]=useState<any>([]);
  const [TVCategory, setTVCategory] = useState('Recommended');
  const [TVSearch, setTVSearch]=useState<string[]>([]);
  const [filmSearch, setFilmSearch]=useState<string[]>([]);
  

  const updateCover=()=>{
    let movieID:string;
    fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=369f86b614006cd7c965f3f582810609&language=en-US&page=1')
    .then(response => response.json()).then((response:any)=> {
      movieID=response.results[0].id.toString();
      let genreArr:string[]=[];
    
      response.results[0].genre_ids.map((x:number)=> genres.map(y=> {if(y.id==x) {genreArr.push(y.name);}}));
      let genreStr:string;
      if(genreArr.length>4){
        genreStr=genreArr[0]+', '+genreArr[1]+', '+genreArr[2];
      }
      else{
        genreStr=genreArr.join(', ');
      }
      setCover(prev=> prev.concat(response.results[0].id,imgURL+response.results[0].backdrop_path,response.results[0].title,response.results[0].vote_average+'/10',response.results[0].overview,response.results[0].release_date.slice(0,4),genreStr));
      
      genreArr=[];
      let array:any=[];
      let detailsArr:string[]=[];
      response.results.map((x:any)=> {
        genreArr=[];
        detailsArr=[];
        x.genre_ids.map((x:number)=> genres.map(y=> {if(y.id==x) {genreArr.push(y.name);}}));
      if(genreArr.length>3){
        genreStr=genreArr[0]+genreArr[1]+genreArr[2];
      }
      else{
        genreStr=genreArr.join();
      }
      array.push(detailsArr.concat(x.id,imgURL+x.backdrop_path,x.title,x.vote_average, genreStr));
      })
      setboxOffice(array);

      // Update Trailer
  fetch('https://api.themoviedb.org/3/movie/'+movieID+'/videos?api_key=369f86b614006cd7c965f3f582810609')
  .then(response => response.json()).then((response:any)=> {
    setTrailer(youtubeURL+response.results[0].key);
  })
  })
  
}

  const updateTV=()=>{
    fetch('https://api.themoviedb.org/3/tv/1399/recommendations?api_key=369f86b614006cd7c965f3f582810609&language=en-US&page=1')
    .then(response=> response.json()).then(response=> {
      let genreArr:string[]=[];
      let genreStr:string;
      let array:any=[];
      let detailsArr:string[]=[];
      response.results.map((x:any)=> {
        genreArr=[];
        detailsArr=[];
        x.genre_ids.map((x:number)=> genres.map(y=> {if(y.id==x) {genreArr.push(y.name);}}));
      genreStr=genreArr.join();
      array.push(detailsArr.concat(x.id,imgURL+x.backdrop_path,x.name,x.vote_average, genreStr,x.id));
      });
      setRecommended(array);

    });

    // 'TOP RATED' API CALL & STATE UPDATE

    fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=369f86b614006cd7c965f3f582810609&language=en-US&page=1')
    .then(response=> response.json()).then(response=> {
      let genreArr:string[]=[];
      let genreStr:string;
      let array:any=[];
      let detailsArr:string[]=[];
      response.results.map((x:any)=> {
        genreArr=[];
        detailsArr=[];
        x.genre_ids.map((x:number)=> genres.map(y=> {if(y.id==x) {genreArr.push(y.name);}}));
      genreStr=genreArr.join();
      array.push(detailsArr.concat(x.id,imgURL+x.backdrop_path,x.name,x.vote_average, genreStr,x.id));
      });
      setTopRated(array);

    })

    // 'MOST POPULAR TV' API Call & State Update

    fetch('https://api.themoviedb.org/3/tv/popular?api_key=369f86b614006cd7c965f3f582810609&language=en-US&page=1')
    .then(response=> response.json()).then(response=> {
      let genreArr:string[]=[];
      let genreStr:string;
      let array:any=[];
      let detailsArr:string[]=[];
      response.results.map((x:any)=> {
        genreArr=[];
        detailsArr=[];
        x.genre_ids.map((x:number)=> genres.map(y=> {if(y.id==x) {genreArr.push(y.name);}}));
      genreStr=genreArr.join();
      array.push(detailsArr.concat(x.id,imgURL+x.backdrop_path,x.name,x.vote_average, genreStr,x.id));
      });
      setMostPopular(array);

    })

  } 

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


  useEffect(()=>{updateCover();
  updateTV();
          },[]);
  interface coverStyle{
    backgroundImage:string;
  }
  let coverStyle: coverStyle={
    backgroundImage:'linear-gradient(-90deg,black,transparent), url("'+cover[1]+'")'
  }
  let coverStyleBlack:coverStyle={
    backgroundImage:'linear-gradient(-90deg,rgba(0, 0, 0, 1),rgba(0, 0, 0, 1))'
  }
  interface display{
    display:string;
  }
  let display0:display={
    display:'none'
  }
  let display1:display={
    display:'flex'
  }
  let displayBlock:display={
    display:'block'
  }

    const topRatedTV=()=> {
      setTVCategory('Top Rated');
    } 
    const mostPopularTV=()=> {
      setTVCategory('Most Popular');
    } 
    const recommendedTV=()=> {
      setTVCategory('Recommended');
    } 
  
  

    function profileDropdownClick() {
      alertDialogue();
      setProfileClick(false); 
      }

      

  return (
  <div className='main-container home-container' >
<div className='navBar' onClick={()=> {setProfileClick(false);setSearchVisibility(false)}}>
<Nav activeKey="" className="flex-column align-items-center" >
  <Nav.Item className='imdb'>
    <Nav.Link href="/imdb" ><h6>IMDb</h6></Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="/imdb/movies" ><FontAwesomeIcon icon={faFilm} /></Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="/imdb/shows" ><FontAwesomeIcon icon={faTv} /></Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={alertDialogue}>
    <FontAwesomeIcon icon={faGamepad} />
    </Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={alertDialogue}>
    <FontAwesomeIcon icon={faFile} />
    </Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={alertDialogue}>
    <FontAwesomeIcon icon={faMale} />
    </Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={alertDialogue}>
    <FontAwesomeIcon icon={faHeart} />
    </Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={alertDialogue}>
    <FontAwesomeIcon icon={faClock} />
    </Nav.Link>
  </Nav.Item>
</Nav>
</div>
<div className='content'>
  <Container fluid className='h-100'>
<Row className='content-row' >
  <Col className='header' md={12} >
    <Container fluid>
    
  <Row className='headerRow' noGutters={true}>
   
    <Col className='search-div' sm='auto' onClick={()=> {setProfileClick(false);setSearchVisibility(true)}}>
    <div className='search-bar-home'>
      <input type='text' placeholder='Search movies, tv shows...' onChange={handleSearch}  />
      <Nav.Link href="#"><FontAwesomeIcon icon={faSearch}/> </Nav.Link>
    </div>
    <div className='search-results' style={searchVisibility?displayBlock:display0} >
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
    </Col>
    <Col className='hideSearch-div' onClick={()=> {setProfileClick(false);setSearchVisibility(false)}}>.</Col>
    <Col className='movies-tv-home' sm='auto'>
      <Nav>
    <Nav.Item>
    <Nav.Link href="/imdb/movies" ><FontAwesomeIcon icon={faFilm} /> <span>Movies</span></Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="/imdb/shows" ><FontAwesomeIcon icon={faTv} /> <span>TV</span></Nav.Link>
  </Nav.Item>
  </Nav>
    </Col>
    <Col className='profile-pro' sm='auto'>
    {/* <div className='imdbPro' onClick={alertDialogue}>IMDb<span>Pro</span> &nbsp;  <FontAwesomeIcon icon={faArrowDown} /></div> */}
    <div><div className='profile' onClick={()=> {setProfileClick((prev:boolean)=> !prev);setSearchVisibility(false);}}><img src={profile} ></img><span>Ethane Carter &nbsp;</span><FontAwesomeIcon icon={faArrowDown} /></div>
        <div className='profile-dropdown'  style={profileClick?displayBlock:display0} contentEditable onBlur={()=> {setProfileClick(false);console.log('blur');}} >
          <Nav>
            <Nav.Item flex-column>
              <Nav.Link onClick={profileDropdownClick} >Watchlist</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={profileDropdownClick} >Account Settings</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={profileDropdownClick} >Sign out</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
    </div>
    </Col>
    
  </Row>
  </Container>
  </Col>
 
  <Col className='cover-box-tv' onClick={()=> {setProfileClick(false);setSearchVisibility(false)}}>
   
  <Row className='h-100'>
    <Col md={9} className='cover-tv'>
    <Row className='cover-tv-row'>
  <Col xs={12} className='coverHome' id='coverDiv' style={trailerClick?coverStyleBlack:coverStyle}>
    <div className='film-data' style={trailerClick?display0:display1}>
  <div><h4>{cover[2]}</h4>
  <div className='rating-genre'><span>{cover[3]}</span><span>{cover[6]}</span><span>{cover[5]}</span></div></div>
  <p>{cover[4]}</p>
       
          <div className='learn-trailer'>
          <Link to={'/film/'+cover[0]}><div className='learn'>Learn More</div></Link>
          <div className='trailer' onClick={()=> setTrailerClick(1)}><FontAwesomeIcon  icon={faPlayCircle}/> Play Trailer</div>
          </div>
    </div>
    <div className='trailer-div' style={trailerClick?display1:display0}>
     <iframe src={trailer} frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowFullScreen></iframe>
       <FontAwesomeIcon icon={faTimesCircle} className='cross' onClick={()=> setTrailerClick(0)} style={trailerClick?display1:display0}/>
     </div>
  </Col>
      <Col className='tv-series'>
      <Nav activeKey="" className="align-items-center navigator" >
  <Nav.Item>
    <Nav.Link href="#" onClick={topRatedTV}>TOP RATED(100)</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={mostPopularTV}>MOST POPULAR</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={recommendedTV}>RECOMMENDED</Nav.Link>
  </Nav.Item>
  {/* <Nav.Item>
    <Nav.Link href="#">IMDb TV</Nav.Link>
    </Nav.Item> */}
    </Nav>
    <h6>TV Series </h6>
    
      {/* TOP RATED */}

      <div className='tv-row topRatedTV' style={TVCategory=='Top Rated'? display1 : display0}>
        {topRated.map((x:any) => (<Link className='tv-link' to={'/tv/'+x[5]}><div className='tv-thumbnail'>
          <img src={x[1]} />
      <h6>{x[2]}</h6>
      <p>{x[3]}&nbsp; &nbsp; {x[4]}</p>
          </div></Link> )
        )}
    </div>

    {/* MOST POPULAR */}
    <div className='tv-row mostPopularTV' style={TVCategory=='Most Popular'? display1 : display0}>
    {mostPopular.map((x:any)=> (<Link className='tv-link' to={'/tv/'+x[5]}><div className='tv-thumbnail'>
          <img src={x[1]} />
      <h6>{x[2]}</h6>
      <p>{x[3]}&nbsp; &nbsp; {x[4]}</p>
          </div></Link>)
        )}
    </div>
   

    {/* RECOMMENDED */}

    <div className='tv-row recommendedTV' style={TVCategory=='Recommended'? display1 : display0} >
    {recommended.map((x:any)=> (<Link className='tv-link' to={'/tv/'+x[5]}><div className='tv-thumbnail'>
          <img src={x[1]} />
      <h6>{x[2]}</h6>
      <p>{x[3]}&nbsp; &nbsp; {x[4]}</p>
          </div></Link>)
        )}
    </div>

      </Col>
    </Row>
    </Col>
    <Col md={3} className='boxOffice'>
    
      <div className='now-playing'><h5>Now Playing (Box Office)</h5></div>
    <div className='boxOffice-row' >
      {boxOffice.map((x:any)=> 
      <Link to={'/film/'+x[0]} className='boxOffice-link'><div >
    <img src={x[1]} />
  <h6>{x[2]}</h6>
  <p>{x[3]}&nbsp; &nbsp; {x[4]}</p>
      </div></Link>)}
    </div>
    </Col>
  </Row>
  </Col>
</Row>
</Container>
</div>
</div>


  );
}

export default Home;
