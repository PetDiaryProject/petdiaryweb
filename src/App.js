
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Diary from "./view/diary.js";

class App extends Component {
  state = {
    userid: localStorage.getItem('userid')
  }

 

  render() {
    console.log(this.state.userid === 'null')
    return (
      <>
        {
            this.state.userid === 'null' && <Redirect to='/login'></Redirect>
        }
        <Diary></Diary>
      </>
    );
  }
}

export default App;
