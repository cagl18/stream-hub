import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import streams from './streams';
import Header from './Header';

const App = () => {
  return (
    <div className='ui container'>
      <BrowserRouter>
        <div>
          <Header />
          <Route path='/' exact component={streams.streamList} />
          <Route path='/streams/new' exact component={streams.streamCreate} />
          <Route path='/streams/edit' exact component={streams.streamEdit} />
          <Route
            path='/streams/delete'
            exact
            component={streams.streamDelete}
          />
          <Route path='/streams/show' exact component={streams.streamShow} />
          {/* <div>StreamHubs</div> */}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
