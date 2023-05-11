import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

class App extends Component {
  /* To use state */
  constructor() {
    /* To use this. */
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }
  

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }
  
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input }, this.callClarifaiApi);
  }
  
  callClarifaiApi = () => {
    const PAT = '41e1940cac9e45a2ae29e33ebc006442';
    const USER_ID = 'ximaks';       
    const APP_ID = 'Smart-Brain-App';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';
    const IMAGE_URL = this.state.imageUrl;    
  
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };
  
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions) 
      .then(response => {
        return response.json();
      })
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .then(result => {
      })
      .catch(error => console.log('error', error));
  }
  
  render() {
    return (
      <div className="App">
        <ParticlesBg type="square" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
