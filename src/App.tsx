import React, { useEffect, useState } from 'react';
import Home from './Home';
import TV from './TV';
import Film from './Film';
import Movies from './Movies';
import TVShows from './TVShows'

import {homePath} from './GlobalVariables';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

  const App=()=> {
      return(
        <Switch>
        <Route exact path='/film/:id' component={Film} />
            
        <Route exact path='/tv/:id'>
            <TV />
        </Route>
        <Route exact path='/movies'>
            <Movies />
        </Route>
        <Route exact path='/shows'>
            <TVShows />
        </Route>
        <Route exact path='/'>
            <Home />
        </Route>
        
        </Switch>
      )
  }

  export default App;