import { BrowserRouter, Routes, Route } from "react-router";
import { Box } from "@mui/material";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import BoardPage from "./Pages/BoardPage";

function App() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <BrowserRouter>
                <Navbar />
                <Box component="main" sx={{ flexGrow: 1 }}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/board/:id" element={<BoardPage />} />
                    </Routes>
                </Box>
            </BrowserRouter>
        </Box>
    );
}

export default App;
