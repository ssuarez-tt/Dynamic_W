import AccordionPage from './pages/AccordionPage'
import ConnectedAccordionPage from './pages/ConnectedAccordionPage'
import ButtonPage from './pages/ButtonPage'
import PanelPage from './pages/PanelPage'
import DropdownPage from './pages/DropdownPage'
import ModalPage from './pages/ModalPage'
import NavBar from './components/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <div className="appLayout">
        <NavBar />
        <main className="appMain">
          <Routes>
            <Route path="/" element={<ConnectedAccordionPage />} />
            <Route path="/button" element={<ButtonPage />} />
            <Route path="/accordion" element={<AccordionPage />} />
            <Route path="/panel" element={<PanelPage />} />
            <Route path="/dropdown" element={<DropdownPage />} />
            <Route path="/modal" element={<ModalPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App