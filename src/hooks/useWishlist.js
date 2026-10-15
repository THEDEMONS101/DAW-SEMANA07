import { useContext } from 'react'
import { WishlistContext } from '../contexts/WishlistContext'

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist debe usarse dentro de WishlistProvider')
  return ctx
}