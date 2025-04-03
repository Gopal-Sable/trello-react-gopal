import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./Components/Navbar";
import BoardPage from "./Pages/BoardPage";
import HomePage from "./Pages/HomePage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/board/:id" element={<BoardPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
