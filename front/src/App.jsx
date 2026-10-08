import Header from './components/layout/Header'
import FloatingMenu from './components/layout/FloatingMenu'
import HomePage from './pages/HomePage'

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <HomePage />
      </main>
      <FloatingMenu />
    </>
  )
}

export default App
