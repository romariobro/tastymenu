import { HashRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Shopping from './pages/Shopping'
import Settings from './pages/Settings'

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        <Nav />
        <main className="flex-1 md:ml-64 pb-20 md:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}

export default App
