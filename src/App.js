import React from 'react';
import Layout from './components/Layout';
import docChatImage from './images/docChatImage.jpg'; // Assuming it's a jpg image
import Typewriter from 'typewriter-effect';

function App() {
  return (
    <div className="flex">
      <Layout />
      <div className="ml-auto mt-8"> {/* Added mt-8 class for top margin */}
        <img src={docChatImage} alt="Doc Chat Image" className="w-98 h-72 mr-16 mb-4" /> {/* Added mb-4 class for bottom margin */}
        <p className="max-w-lg text-lg text-left">
        Introducing our MVP document chatting platform—a streamlined hub for collaborative text discussions. Instantly upload text, engage in dynamic dialogue, and exchange feedback in real-time. Powered by AI, our platform simplifies communication, saving time and effort. Say goodbye to disjointed conversations—welcome to seamless document collaboration.
      </p>
         <div className='mt-10'>
        <Typewriter
            onInit={(typewriter) => {
              typewriter.typeString("An MVP by Aaron and Neeraj")
                .callFunction(() => {
                  console.log('String typed out!');
                })
                .pauseFor(10000)
                .deleteAll()
                .callFunction(() => {
                  console.log('All strings were deleted');
                })
                .start();
            }}
            options={{  
              loop: true,
            }}
          />
          </div>
      </div>
    </div>
  );
}

export default App;
