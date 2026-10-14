import { useState, useCallback } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider, useCart } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import GameGrid from './components/GameGrid'
import GameModal from './components/GameModal'
import Cart from './components/Cart'
import Wishlist from './components/Wishlist'
import Footer from './components/Footer'
import ProfilerWrapper from './components/ProfilerWrapper'
import AuthModal from './components/AuthModal'
import CheckoutModal from './components/CheckoutModal'

function AppContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [genre, setGenre] = useState('Todos')
  const [sort, setSort] = useState('default')
  const [selectedGame, setSelectedGame] = useState(null)
  const [section, setSection] = useState('catalog')

  const { checkout, closeCheckout } = useCart()

  const handleView = useCallback((game) => setSelectedGame(game), [])
  const handleCloseModal = useCallback(() => setSelectedGame(null), [])

  const sectionFilter =
    section === 'ofertas' ? 'price-asc' : section === 'novedades' ? 'default' : sort

  return (
    <>
      <Header section={section} setSection={setSection} />

      {section === 'catalog' && <Hero />}

      <main className="main" id="catalog">
        {section === 'catalog' && (
          <>
            <div className="toolbar">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>
            <Filters genre={genre} setGenre={setGenre} sort={sort} setSort={setSort} />
          </>
        )}

        {section === 'ofertas' && (
          <div className="section-header">
            <h1>🔥 Ofertas de la Semana</h1>
            <p>Descuentos exclusivos por tiempo limitado.</p>
          </div>
        )}

        {section === 'novedades' && (
          <div className="section-header">
            <h1>✨ Novedades</h1>
            <p>Los últimos lanzamientos disponibles en GameVault.</p>
          </div>
        )}

        <ProfilerWrapper id="GameGrid">
          <GameGrid
            searchTerm={searchTerm}
            genre={genre}
            sort={sectionFilter}
            section={section}
            onView={handleView}
          />
        </ProfilerWrapper>
      </main>

      <Footer />

      {selectedGame && <GameModal game={selectedGame} onClose={handleCloseModal} />}

      <Cart />
      <Wishlist />
      <AuthModal />

      {checkout && (
        <CheckoutModal
          orderNumber={checkout.orderNumber}
          total={checkout.total}
          items={checkout.items}
          onClose={closeCheckout}
        />
      )}
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}