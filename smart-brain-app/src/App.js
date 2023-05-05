import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles';
import './App.css';

const particlesOptions = {
    "particles": {
      "number": {
        "value": 50
      },
      "size": {
        "value": 3
      }
      },
    "interactivity": {
      "events": {
        "onhover": {
            "enable": true,
            "mode": "repulse"
        }
      }
    }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles
          params={particlesOptions} 
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
      </div>
    );
  }
}

export default App;
