
import React, { Component } from 'react'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import './App.css';
import 'tachyons'


const DATABASE_URL = 'https://ztm-smart-brains.herokuapp.com'

const particlesAttributes = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const routes = ['signin', 'home', 'register', 'signout']

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      current_route: routes[0],
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      }
    };
  }

  loadUser = (user) => {
    const { id, name, email, entries, joined } = user;
    this.setState({
      user: {
        id: id,
        name: name,
        email: email,
        entries: entries,
        joined: joined,
      }
    })
  }

  calculateFaceLocations = (boxes) => {
    const image = document.getElementById('imageinput');
    const width = Number(image.width);
    const height = Number(image.height);
    const faceLocations = boxes.map((box) => {
      return {
        leftCol: box.left_col * width,
        topRow: box.top_row * height,
        rightCol: width - (box.right_col * width),
        bottomRow: height - (box.bottom_row * height)
      }
    })
    return faceLocations
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  displayBoundingBoxes = (boxes) => {
    this.setState({ boxes: boxes })
  }

  onSubmit = async () => {
    const { user, input } = this.state;
    const { id } = user;
    this.setState({ imageUrl: input });
    try {
      const response = await fetch(`${DATABASE_URL}/imageDetection`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: input
        })
      });
      let boxes = await response.json();
      boxes = this.calculateFaceLocations(boxes)
      this.displayBoundingBoxes(boxes)

      if (response) {
        const res = await fetch(`${DATABASE_URL}/image`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: id
          })
        })
        const data = await res.json()
        this.setState(Object.assign(user, { entries: data }))
      }
    } catch (err) {
      console.log(err)
    }
  }

  onRouteChange = (route) => {
    if (route === routes[3]) {
      this.setState({ isSignedIn: false })
    } else if (route === routes[1]) {
      this.setState({ isSignedIn: true })
    }
    this.setState({ current_route: route })
  }

  resetFace = () => {
    this.setState({
      input: '',
      imageUrl: '',
      boxes: [],
      isSignedIn: false,
    })
  }

  render() {
    const { boxes, imageUrl, current_route, isSignedIn, user } = this.state

    return (
      <div className="App">
        <Particles className='particles' params={particlesAttributes} />
        <Navigation resetFace={this.resetFace} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {
          current_route === routes[1] ?
            <div>
              <Logo />
              <Rank user={user} />
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
              <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
            </div>
            : (
              current_route === routes[0] ?
                <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                :
                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export { routes, DATABASE_URL };
export default App;
