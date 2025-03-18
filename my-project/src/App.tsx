import Layout from "./components/Layout/Layout";
import Sidebar from "./components/Sidebar/Sidebar";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Layout />
    </div>
  );
}

export default App;
