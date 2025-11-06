import React, { useEffect, useState } from 'react';
import './TV.scss';
import { Nav, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faList, faSearch, faHeart, faBookmark, faCaretRight, faStar, faCircle, faArrowRight, faCalendar, faHome, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import {faTwitter, faInstagram, faFacebook} from '@fortawesome/free-brands-svg-icons'
import genres from './genres';
import languageCodes from './language-codes.json';
import {alertDialogue} from './GlobalVariables';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";


let type='TV';

const TV= ()=> {
    
  const [contentType, setContentType]=useState(type);
  const [id, setID]= useState('44217');
  const [title,setTitle]=useState('');
  const [poster, setPoster]=useState('');
  const [cover, setCover]= useState('');
  const [year, setYear]=useState('');
  const [genres, setGenres]=useState('');
  const[duration, setDuration]=useState('');
  const[parentalGuidance]=useState('TV-MA');
  const [rating, setRating]=useState(0);
  const [popularity, sePopularity]=useState('');
  const [tagLine, setTagLine]=useState('');
  const [overview, setOverview]=useState('');
  const [trailer, setTrailer]=useState('');
  const [trailerClick, setTrailerClick] =useState(0);
  const [directors, setDirectors]=useState<string[]>(['']);
  const [writers, setWriters]=useState<string[]>([]);
  const [creators, setCreators]=useState<string[]>([]);
  const [cast, setCast]=useState<string[]>([]);
  const [season, setSeason] = useState<number>(0);
  const [airDate, setAirDate]=useState('');
  const [episodes, setEpisodes] = useState<number>();
  const [videos, setVideos]= useState<string[]>([]);
  const [posters, setPosters]= useState<string[]>([]);
  const [backdrops, setBackdrops]= useState<string[]>([]);
  const [mediaType, setMediaType] = useState('Most Popular');
  const [recommendations, setRecommendations]=useState<any[]>([]);
  const [homepage, setHomepage]=useState('');
  const [networks, setNetworks]=useState<string[]>([]);
  const [TVShowtype, setTVShowType]=useState('');
  const [keywords, setKeywords]=useState<string[]>([]);
  const [originalLanguage, setOriginalLanguage]=useState('');
  const [originalName, setOriginalName]=useState('');
  const [status, setStatus]=useState('');
  const [languages, setLanguages]=useState<string[]>([]);
  const [numberOfEpisodes, setNumberOfEpisodes]=useState<number>();
  const [numberOfSeasons, setNumberOfSeasons]=useState<number>();
  const [originCountry, setOriginCountry]=useState<string[]>([]);
  const [productionCompanies, setProductionCompanies]=useState<string[]>([]);
  const [IMDB, setIMDB]=useState('');
  const [twitter, setTwitter]=useState('');
  const [insta, setInsta]=useState('');
  const [facebook, setFacebook]=useState('');
  const [TVSearch, setTVSearch]=useState<string[]>([]);
  const [filmSearch, setFilmSearch]=useState<string[]>([]);
  const [searchVisibility, setSearchVisibility] = useState(false);
  

  const imgURL='http://image.tmdb.org/t/p/original';
  const youtubeURL='https://www.youtube.com/embed/';
  let TV='44217';
  let match:any = useRouteMatch();

  let movie='';
  const languageByCode = (code:string):string =>{
    let x=0;
    let i=0;
    let language='';
    while(x==0){
      if(languageCodes[i].alpha2==code){
        x=1;
        language= languageCodes[i].English;
      }
      i++;
    }
    return language;
  }


  const updateTV = (id:string) => {
    fetch('https://api.themoviedb.org/3/tv/'+id+'?api_key=369f86b614006cd7c965f3f582810609&language=en-US')
    .then(response => response.json()).then(response => {
      setTitle(response.name);
      setPoster(imgURL+response.poster_path);
      setCover(imgURL+response.backdrop_path)
      setYear(response.first_air_date.slice(0,4));
      setGenres(response.genres.map((x:any) => x.name).reduce((a:string,b:string)=> `${a}, ${b}`));
      let durationHour=Math.trunc(response.episode_run_time[0]/60)!=0 ? Math.trunc(response.episode_run_time[0]/60).toString()+'h ':'';

      let durationMin=(response.episode_run_time[0]%60)!=0 ? (response.episode_run_time[0]%60).toString()+'m': '';
      
      setDuration(durationHour+durationMin);
      setRating(response.vote_average);
      setOverview(response.overview);
      setCreators([]);
      setCreators(prev=> prev.concat(response.created_by.map((x:any)=> x.name)));
      setSeason(response.last_episode_to_air.season_number);
      setHomepage(response.homepage);
      setNetworks(prev=> prev.concat(response.networks.map((x:any)=> imgURL+x.logo_path)));
      setTVShowType(response.type);
      setStatus(response.status);
      setOriginalLanguage(languageByCode(response.original_language));
      setOriginalName(response.original_name);
      setLanguages(prev=> prev.concat(response.languages.map((x:string)=> x)));
      setOriginCountry(prev=> prev.concat(response.origin_country.map((x:string)=> x)));
      setNumberOfEpisodes(response.number_of_episodes);
      setNumberOfSeasons(response.number_of_seasons);
      setProductionCompanies(prev=> prev.concat(response.production_companies.map((x:any)=> imgURL+x.logo_path)))

       // Update Last Season

    fetch('https://api.themoviedb.org/3/tv/'+id+'/season/'+response.last_episode_to_air.season_number+'?api_key=369f86b614006cd7c965f3f582810609&language=en-US')
    .then(response => response.json()).then(response => {
      setEpisodes(response.episodes.length);
      setAirDate(response.air_date);
    });

    });

    // Update SetTrailer & Videos

    fetch('https://api.themoviedb.org/3/tv/'+id+'/videos?api_key=369f86b614006cd7c965f3f582810609&language=en-US')
    .then(response => response.json()).then(response => {
      response.results[0] && setTrailer(youtubeURL+response.results[0].key);
      let array:string[]=[];
      response.results.map((x:any)=> array.push(youtubeURL+x.key));

      setVideos(prev=> prev.concat(array));
    });

    // Update Cast

    fetch('https://api.themoviedb.org/3/tv/'+id+'/credits?api_key=369f86b614006cd7c965f3f582810609&language=en-US')
    .then(response => response.json()).then(response => {
      let array:any=[];
      let detailsArr:string[];
      response.cast.map((x:any)=> {
        detailsArr=[];
        array.push(detailsArr.concat(x.name, x.character, imgURL+x.profile_path,x.gender));
      });

      setCast(prev=> prev.concat(array));
});

    // Update Images

    fetch('https://api.themoviedb.org/3/tv/'+id+'/images?api_key=369f86b614006cd7c965f3f582810609')
    .then(response => response.json()).then(response => {
      let backdropArr:string[]=[];
      let posterArr:string[]=[];
    
      response.backdrops.map((x:any)=> backdropArr.push(imgURL+x.file_path));
      response.posters.map((x:any)=> posterArr.push(imgURL+x.file_path));
      setBackdrops(prev=> prev.concat(backdropArr));
      setPosters(prev=> prev.concat(posterArr));
    })

  //  Update Recommendations

  fetch('https://api.themoviedb.org/3/tv/'+id+'/recommendations?api_key=369f86b614006cd7c965f3f582810609&language=en-US&page=1')
  .then(response => response.json()).then(response => {
    let array:any=[];
    let detailsArr:string[]=[];
    response.results.map((x:any)=> {
      detailsArr=[];
      array.push(detailsArr.concat(x.name, x.vote_average, imgURL+x.backdrop_path, x.first_air_date,x.id))});
      setRecommendations(array);
  })

  // Update External IDs

  fetch('https://api.themoviedb.org/3/tv/'+id+'/external_ids?api_key=369f86b614006cd7c965f3f582810609&language=en-US')
  .then(response => response.json()).then(response => {
    setIMDB('https://imdb.com/title/'+response.imdb_id);
    setTwitter('https://twitter.com/'+response.twitter_id);
    setInsta('https://instagram.com/'+response.instagram_id);
    setFacebook('https://facebook.com/'+response.facebook_id);
  })

  // Update Keywords

  fetch('https://api.themoviedb.org/3/tv/'+id+'/keywords?api_key=369f86b614006cd7c965f3f582810609')
  .then(response => response.json()).then(response => {
    setKeywords(prev=> prev.concat(response.results.map((x:any)=> x.name)));
  })

  }

  useEffect(()=> {
    updateTV(match.params.id);
  },[])

  interface coverStyle{
    backgroundImage:string;
  };

  let coverStyle:coverStyle={
    backgroundImage:'url('+cover+')'
  }


  const dateFormat = (date:string)=>{
    let month=date[5]=='0'?date.slice(6,7):date.slice(5,7);
    let mon='';
    switch(parseInt(month)){
      case 1: mon= 'January';
      break;
      case 2: mon= 'February';
      break;
      case 3: mon= 'March';
      break;
      case 4: mon= 'April';
      break;
      case 5: mon= 'May';
      break;
      case 6: mon= 'June';
      break;
      case 7: mon= 'July';
      break;
      case 8: mon= 'August';
      break;
      case 9: mon= 'September';
      break;
      case 10: mon= 'October';
      break;
      case 11: mon= 'November';
      break;
      case 12: mon= 'December';
      break;
    };
    return mon+', '+date.slice(8)+' '+date.slice(0,4);
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
    const mostPopularMedia = () => {
      setMediaType('Most Popular');
    }
    const videosMedia = () => {
      setMediaType('Videos');
    }
    const backdropsMedia = () => {
      setMediaType('Backdrops');
    }
    const postersMedia = () => {
      setMediaType('Posters');
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

   
   
    return(
      <>
      {console.log('match',match)}
        <Container fluid>
            <Row>
                <Col xs={12} className='headerPrime'>
                <Row>
                    <Col className='headerPrimeLeft'>
                    
  <Nav activeKey="" className="align-items-center" >
  <Nav.Item>
    <Nav.Link href="/imdb" ><h4>IMDb</h4></Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="/imdb/Movies" >Movies</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="/imdb/shows" >TV Shows</Nav.Link>
  </Nav.Item>
  {/* <Nav.Item>
    <Nav.Link href="#" onClick={alertDialogue}>People</Nav.Link>
    </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={alertDialogue}>More</Nav.Link>
    </Nav.Item> */}
    </Nav>
                    </Col>

                    <Col className='headerPrimeRight'>
                        <Nav activeKey="" className="align-items-center" >
  {/* <Nav.Item>
    <Nav.Link href="#"  onClick={alertDialogue}><h4>+</h4></Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#"  onClick={alertDialogue}>EN</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#"  onClick={alertDialogue}>Login</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={alertDialogue}>Join IMDb</Nav.Link>
    </Nav.Item> */}
  <Nav.Item className='search-div' onClick={()=> setSearchVisibility(true)}>
  <div className='search-bar'>
      <input type='text' placeholder='Search movies, tv shows...' onChange={handleSearch}/>
      <Nav.Link href="#"><FontAwesomeIcon icon={faSearch}/> </Nav.Link>
    </div>
    <div className='search-results' style={searchVisibility?displayBlock:display0}>
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
    </Nav>
                    </Col>
                </Row>

                </Col>
                <Col xs={12} className='headerSecond'>
                <Nav activeKey="" className="align-items-center headerSecond-nav" >
  <Nav.Item className='headerSecond-overview'>
    <Nav.Link href="#"  onClick={alertDialogue}>Overview &nbsp; <FontAwesomeIcon icon={faCaretDown}/></Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#"  onClick={alertDialogue}>Media &nbsp; <FontAwesomeIcon icon={faCaretDown}/></Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#"  onClick={alertDialogue}>Fandom &nbsp; <FontAwesomeIcon icon={faCaretDown}/></Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={alertDialogue}>Share &nbsp; <FontAwesomeIcon icon={faCaretDown}/></Nav.Link>
    </Nav.Item>
    </Nav>
  
    </Col>
                <Col  className='cover-col' xs={12} style={coverStyle}>
               <div className='cover-gradient'>
                  <div className='cover'>
               <div className='cover-image'>
                 <img src={poster} />
               </div>
                <div className='cover-details'>
                  <div className='title-parent'>
                  <div className='cover-title-heading'>
    <h1 className='cover-title-heading'>{title} <h2>&nbsp;({year})</h2></h1>

    </div>
    <div className='parent-genres-time'>
    <div className='parent'>{parentalGuidance}</div>{ genres} <FontAwesomeIcon id='faCircle' icon={faCircle}/>{duration}
    </div>
    </div>
    <div className='rating-like-play'>
    <div className='rating-container'><div className='rating'><h4>{rating*10}</h4><sup>%</sup></div><h6>User <br/> Score</h6></div> 
    {/* <div className='login-like-bookmark-rate' onClick={alertDialogue}><FontAwesomeIcon icon={faList}/></div> <div className='login-like-bookmark-rate' onClick={alertDialogue}><FontAwesomeIcon icon={faHeart}/></div> 
    <div className='login-like-bookmark-rate' onClick={alertDialogue}><FontAwesomeIcon icon={faBookmark}/></div><div className='login-like-bookmark-rate' onClick={alertDialogue}><FontAwesomeIcon icon={faStar}/></div> */}
     <div className='play-trailer' onClick={()=> setTrailerClick(1)}><FontAwesomeIcon className='faCaretRight' icon={faCaretRight}/> <h6><a href='#'>Play Trailer</a></h6></div>
     <div className='trailer-div' style={trailerClick?display1:display0}>
     <iframe src={trailer} frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowFullScreen></iframe>
       <FontAwesomeIcon icon={faTimesCircle} className='cross' onClick={()=> setTrailerClick(0)} style={trailerClick?display1:display0}/>
     </div>

     </div>
    <p><em>{tagLine}</em></p>
    <div className='overview'>
      <h4>Overview</h4>
      {overview}
    </div>
    <div className='directors'>
    <h6>{creators.map((x:string)=> x).join(', ')}</h6>
    {creators.length>1 ? <span>Creators</span> : <span>Creator</span>}
    </div>
                  </div> 
                  </div>
                  </div>
                </Col>
                <Col xs={12}>
                <Row className='middle-section'>
                  <Col md={9}>
                  {cast.length>0 && <div className='cast-section' >
    <h5>{contentType=='TV'?'Series Cast':'Top Billed Cast'}</h5>
    <div className='cast-container'>
     {cast.map((x:any)=> <div className='cast' >
     <div className='cast-img' style={x[2]=='http://image.tmdb.org/t/p/originalnull'&&x[3]==1 ? {backgroundImage:'url(https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg)'} : x[2]=='http://image.tmdb.org/t/p/originalnull'&&(x[3]==2||x[3]==0) ? {backgroundImage:'url(https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg)'} : {backgroundImage:'url('+x[2]+')'}}>

      </div>
      <div className='name-char'>
    <h6>{x[0]}</h6>
    <span>{x[1]}</span>
    </div>
    </div>
    )}



    {/* <h6 className='view-more-cast'>View More&nbsp; <FontAwesomeIcon icon={faArrowRight} /> </h6> */}
    </div>
    <h5 className='full-cast'>Full Cast &amp; Crew</h5>
    </div>
}
    {season!==0 && <div className='last-season'>

      <h4>Last Season</h4>
      <div className='last-season-card'>
        <div className='last-season-poster'>
        <img src={poster} />
        </div>
        <div className='last-season-details'>
    <h4>Season {season}</h4>
    <strong>{airDate.slice(0,4)} | {episodes} Episodes</strong>
    <p>Season {season} of {title} premiered on {dateFormat(airDate)}.</p>
        </div>
      </div>
                  
      <h5 className='all-seasons'>View All Seasons</h5>
    </div>}
    <div className='media-section'>
      <h4>Media</h4>
      <div>
      <Nav activeKey="" className="flex-row align-items-center" >
  <Nav.Item >
    <Nav.Link href="#" onClick={mostPopularMedia} >Most Popular</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={videosMedia}>Videos</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={backdropsMedia}>Backdrops</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={postersMedia}>Posters</Nav.Link>
  </Nav.Item>
  </Nav>

  {/* Most Popular Media */}

  {poster.length>0 && <div className='popular-media' style={mediaType=='Most Popular'?display1:display0}>
  {trailer.length>0 && <iframe className='media-iframes' src={trailer}    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowFullScreen></iframe>}
    {cover.length>0 &&<img className='media-backdrop' src={cover}/>}
    <img className='media-poster' src={poster}/>
  </div>}

      {/* Videos Media */}

      {videos.length>0 &&<div className='videos-media' style={mediaType=='Videos'?display1:display0}>
        {videos.map((x:any)=> <iframe className='media-iframes' src={x}></iframe>)}
      </div>}

      {/* Backdrops Media */}

      {backdrops.length>0 &&<div className='backdrops-media' style={mediaType=='Backdrops'?display1:display0}>
        {backdrops.map((x:any)=> <img className='media-backdrop' src={x} />)}
      </div>}

      {/* Posters Media */}

      {posters.length>0 &&<div className='posters-media' style={mediaType=='Posters'?display1:display0}>
        {posters.map((x:any)=> <img className='media-poster' src={x} />)}
      </div>}

      </div>
    </div>

    {/* Recommendatons Section */}

    {recommendations.length>0 &&<div className='recommendations-section'>

      <h4>Reccomendations</h4>
      <div className='recommendations-container'>

      {recommendations.map((x:any)=> <a href={'/imdb/tv/'+x[4]}><div className='reccomendations-tile'>
        <div className='recommendations-image-div'>
          <img src={x[2]} />
          <div className='recommendations-airDate-div'>
            <FontAwesomeIcon icon={faCalendar} /> {x[3]}
          </div>
        </div>
        <div className='recommendations-title-rating'>
    <span>{x[0]}</span><span>{parseInt(x[1])*10}%</span>
        </div>
      </div></a>)}

      </div>

    </div>}
                  </Col>
                  <Col md={3} className='side-panel'>
                  <div className='external-ids'>
                  {IMDB && <a href={IMDB} className='imdb-link'>IMDB</a>}
                  {facebook && <a href={facebook} ><FontAwesomeIcon icon={faFacebook} /></a>}
                    {twitter && <a href={twitter}><FontAwesomeIcon icon={faTwitter} /></a>}
                    {insta && <a href={insta}><FontAwesomeIcon icon={faInstagram} /></a>}
                    {homepage && <a href={homepage} className='faHome'><FontAwesomeIcon icon={faHome} /></a>}
                  </div>
                  <div className='facts'>
                  <h5>FACTS</h5>
                  {status.length>0 &&<div className='status'>
                    <h6>Status</h6>
                    {status}
                  </div>}
                  {networks.length>0 && <div className='networks'>
                    <h6>Network</h6>
      {networks.map((x:string)=> {if(x!=='http://image.tmdb.org/t/p/originalnull')  {return <img src={x} />}})}
                  </div>}

                  {productionCompanies.length>0 && <div className='networks'>
                    <h6>Production Companies</h6>
                    {productionCompanies.map((x:string)=> {if(x!=='http://image.tmdb.org/t/p/originalnull')  {return <img src={x} />}})}
                  </div>}

                  {TVShowtype.length>0 && <div className='TVShowType'>
                    <h6>Type</h6>
                    {TVShowtype}
                  </div>}
                  {originalLanguage.length>0 && <div className='original-language'>
                    <h6>Original Language</h6>
                    {originalLanguage}
                  </div>}
                  {keywords.length>0 && <div >
                  <h6>Keywords</h6>
                      <div className='keywords'>{keywords.map((x:string)=> <span>{x}</span>)}</div>

                  </div>}
                  </div>

                  </Col>
                </Row>
                </Col>
                <Col xs={12} className='footer-col'>
                  <div className='footer'>

                  <div className='imdb-joinCommunity-div'>
                  <a href='/imdb'><div className='imdbLogo'>
                    <strong>INTERNET</strong>
                    <strong>M  O  V  I  E</strong>
                    <strong>DATABASE</strong>
                  </div></a>

                  <div className='joinCommunity' onClick={alertDialogue}>
                    <strong>JOIN THE COMMUNITY</strong>
                  </div>
                  </div>

                    <div className='footer-nav-div'>

        {/* The Basics Nav */}
                    <Nav activeKey="" className="flex-column basics" >
                      <h5>THE BASICS</h5>
  <Nav.Item>
    <Nav.Link href="#"  onClick={alertDialogue}>About IMDb</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={alertDialogue}>Contact us</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={alertDialogue}>Support Forums</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={alertDialogue}>API</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={alertDialogue}>System Status</Nav.Link>
  </Nav.Item>
  </Nav>
      {/* GET INVOLVED NAV */}
  <Nav activeKey="" className="flex-column getInvolved" >
                      <h5>GET INVOLVED</h5>
  <Nav.Item>
    <Nav.Link href="#"  onClick={alertDialogue}>Contribution Bible</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={alertDialogue}>3rd Part Applications</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={alertDialogue}>Add New Movie</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={alertDialogue}>Add New TV Show</Nav.Link>
  </Nav.Item>
  </Nav>

      {/* COMMUNITY NAV */}
  <Nav activeKey="" className="flex-column community" >
                      <h5>COMMUNITY</h5>
  <Nav.Item>
    <Nav.Link href="#"  onClick={alertDialogue}>Guidelines</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={alertDialogue}>Discussions</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={alertDialogue}>Leaderboard</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={alertDialogue}>Twitter</Nav.Link>
  </Nav.Item>
  </Nav>
      {/* LEGAL NAV */}
  <Nav activeKey="" className="flex-column legal" >
                      <h5>LEGAL</h5>
  <Nav.Item>
    <Nav.Link href="#"  onClick={alertDialogue}>Terms of Use</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={alertDialogue}>API Terms of Use</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="#" onClick={alertDialogue}>Privacy Policy</Nav.Link>
  </Nav.Item>
  </Nav>
                    </div>
                  </div>
                </Col>
            </Row>
        </Container>
        {/* <Route path='/:id'>
          <Details />
        </Route> */}
        </>
    )
}

export default TV;