// import react router
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import pages
import { Users, UserDetail } from "./pages";

// import css
import "./App.css";
import "./css/font.css"

function App() {
  return (
    // define routes
    <div className="kanit-400 text-base">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} /> {/* Users */}
          <Route path="/user/:id" element={<UserDetail />} /> {/* UserDetail */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
