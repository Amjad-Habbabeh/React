import React from 'react';
import HobbyList from './components/ex1-Hobbies/HobbyList';
import Guarantee from './components/ex2-customerService/Guarantee';
import Counter from './components/ex3-counter/Counter';
import './App.css';
import chatImge from './Imges/chat.png';
import coinImge from './Imges/coin.png';
import deliveryImge from './Imges/f-delivery.png';

function App() {
  return (
    <div className="App">
      <HobbyList />
      <div className="services-section">
        <Guarantee
          src={deliveryImge}
          title="Free Shipping"
          description="Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna justo."
        />
        <Guarantee
          src={coinImge}
          title="100% Money back"
          description="Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna justo."
        />
        <Guarantee
          src={chatImge}
          title="online support 24/7"
          description="Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna justo."
        />
      </div>
      <div className="counter">
        <Counter />
      </div>
    </div>
  );
}

export default App;
