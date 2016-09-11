import React from 'react';
import SyncryptComponent from '../components/SyncryptComponent';
import { Link } from 'react-router';
import './ConnectingScreen.css';
import Granim from 'granim'

class ConnectingScreen extends SyncryptComponent {
  componentDidMount() {
    var granimInstance = new Granim({
      element: '#granim-canvas',
      name: 'granim',
      opacity: [1, 1],
      states : {
        "default-state": {
          gradients: [
            ['#3B6491', '#F3967F'],
            ['#f3727f', '#F8B194']
          ]
        }
      }
    });

  }
  render() {
    return (
      <div className="connecting-screen">
        <canvas id="granim-canvas"></canvas>
        <div className="banner">
        </div>
      </div>
    );
  }
}

export default ConnectingScreen;
