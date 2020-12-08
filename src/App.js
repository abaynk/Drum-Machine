import React from 'react';
import './App.css';
import q from './audioClips/audioQ.mp3';
import w from './audioClips/audioW.mp3';
import e from './audioClips/audioE.mp3';
import a from './audioClips/audioA.mp3';
import s from './audioClips/audioS.mp3';
import d from './audioClips/audioD.mp3';
import z from './audioClips/audioZ.mp3';
import x from './audioClips/audioX.mp3';
import c from './audioClips/audioC.mp3';
import {Howl, Howler} from 'howler';
import 'bootstrap/dist/css/bootstrap.min.css';

const audioClips = [
  {sound:q, label:'Q', text:'Drum 1', keycode:81},
  {sound:w, label:'W', text:'Drum 2', keycode:87},
  {sound:e, label:'E', text:'High Hit 1', keycode:69},
  {sound:a, label:'A', text:'High Hit 2', keycode:65},
  {sound:s, label:'S', text:'Snare 1', keycode:83},
  {sound:d, label:'D', text:'Snare 2', keycode:68},
  {sound:z, label:'Z', text:'Drum Stick 1', keycode:90},
  {sound:x, label:'X', text:'Drum Stick 2', keycode:88},
  {sound:c, label:'C', text:'Tom Tom Drum', keycode:67},
]

const Display = (props) => {
  return(
    <div id='display'>
      <h2>{props.title}</h2>
    </div>
  );
};
const Toggle = (props) => {
  return (
    <div className="container">
      <input type="checkbox" id="toggle-button" className="toggle-button" onClick={props.toggle}/>
      <label for="toggle-button" className="text">Power</label>
    </div>
  )
};
const Volume = (props) => {
  return (
    <div>
      <input id='volume' onChange={props.volume} type='range' min='0' max='1' step='0.01'/>
    </div>
  )
};

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title:'Welcome to Drum Machine',
      volume:1.0,
      muted: false
    }
    this.SoundPLay = this.SoundPLay.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
  }

  SoundPLay = (src) => {
    const sound = new Howl({
      src
    })
    sound.play();
  };

  RenderButtonAndSound = () => {
    return audioClips.map((soundObj, index) => {
      return (  
          <button className='drum-pad' id={soundObj.label} key={index} onClick={()=>{this.SoundPLay(soundObj.sound);this.setState({title:soundObj.text})}}>
            {soundObj.label}
          </button>
      )
    })
  };

  handleToggle = () => {
    const curState = this.state.muted;
    this.setState({muted:!curState});
  };

  handleVolume = () => {
    const vol = document.getElementById('volume').value;
    this.setState({
      volume:vol,
      title:`Volume: ${Math.floor(vol*100)}`
    });
  };

  render() {
    document.body.style.backgroundColor = '#113537';
    document.body.onkeydown = (event) => {
      for (let i = 0; i < audioClips.length; i++){
        if (event.keyCode === audioClips[i].keycode){
          this.SoundPLay(audioClips[i].sound);
          this.setState({title:audioClips[i].text});
          document.getElementById(audioClips[i].label).style.backgroundColor = '#FFEAD0';
        }
      }
    };
    document.body.onkeyup = (event) => {
      for (let i = 0; i < audioClips.length; i++){
        if (event.keyCode === audioClips[i].keycode){
          document.getElementById(audioClips[i].label).style.backgroundColor = '#F76F8E';
        }
      }
    };
    if(this.state.muted === true) {
      Howler.volume(0);
    } else {
      Howler.volume(this.state.volume);
    }
    return (
      <div className='App' id='drum-machine'>
        <Display title={this.state.title} />
        {this.RenderButtonAndSound()}
        <Toggle toggle={this.handleToggle}/>
        <Volume volume={this.handleVolume}/>
      </div>
    )
  }
}

export default App;
