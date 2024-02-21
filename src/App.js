import ChatComponent from './components/ChatComponent';
import FileUpload from './components/FileUpload';
import MongoDisplay from "./components/MongoDisplay"

function App() {
  return (
    <div className="App">
      <FileUpload/>
      <MongoDisplay/>
      <ChatComponent/>
    </div>
  );
}

export default App;
