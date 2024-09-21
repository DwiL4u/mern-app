import { Box } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import Navbar from './components/Navbar';

function App() {
 
  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.200", "gray.900")}>
        {/* Navbar */}
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </>
  );
}
 export default App;