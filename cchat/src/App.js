
import './App.css';
import {BrowserRouter as Router,Route,Routes}from "react-router-dom"; 
import Chat from './component/chat/Chat';
import Join from './component/join/Join'

function App() {
  
  return (
    <div className="App">
     <Router>
      <Routes>
      <Route path="/" Component={Join}/>
      <Route path="/chat" Component={Chat}/>
      </Routes>
      
      
      
      
     </Router>
    </div>
  ); 
}

export default App;
