// import react router
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import pages
import { Users } from "./pages";

// import css
import "./App.css";
import "./css/font.css"

// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    // define routes
    <div className="kanit-400 text-base">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} /> {/* Users */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
