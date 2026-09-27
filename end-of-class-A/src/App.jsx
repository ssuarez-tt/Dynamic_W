// useEffect form: none
// This file only declares routes; there is no document listener here, so no useEffect is needed.
import AccordionPage from './pages/AccordionPage'
import ConnectedAccordionPage from './pages/ConnectedAccordionPage'
import ButtonPage from './pages/ButtonPage'
import PanelPage from './pages/PanelPage'
import DropdownPage from './pages/DropdownPage'
import NotFoundPage from './pages/NotFoundPage'
import NavBar from './components/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<ConnectedAccordionPage />} />
        <Route path="/button" element={<ButtonPage />} />
        <Route path="/accordion" element={<AccordionPage />} />
        <Route path="/panel" element={<PanelPage />} />
        <Route path="/dropdown" element={<DropdownPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App