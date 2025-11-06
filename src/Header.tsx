import React, { useEffect, useState } from 'react';
import { Nav, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faList, faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchDiv from './SearchDiv';
import {alertDialogue} from './GlobalVariables';



const Header = () => {

    
  
    return (<Container fluid className='movie-tv-header'>
        <Row>
            <Col xs={12} className='headerPrime'>
            <Row>
                <Col md={7} lg={6} className='headerPrimeLeft'>
                
<Nav activeKey="" className="align-items-center" >
<Nav.Item>
<Nav.Link href="/imdb"><h4>IMDb</h4></Nav.Link>
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

                <Col md={5} lg={6} className='headerPrimeRight'>
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
<SearchDiv />
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
</Row>
</Container>)
}

export default Header;