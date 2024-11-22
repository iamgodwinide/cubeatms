import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      addItem: (item) => {
        const currentItems = get().items
        const existingItem = currentItems.find((i) => i.id === item.id)

        if (existingItem) {
          const updatedItems = currentItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          )
          set({ items: updatedItems })
        } else {
          set({ items: [...currentItems, { ...item }] })
        }
        // Open cart after adding item
        set({ isCartOpen: true })
      },
      removeItem: (itemId) => {
        set({ items: get().items.filter((item) => item.id !== itemId) })
      },
      updateQuantity: (itemId, quantity) => {
        const updatedItems = get().items.map((item) =>
          item.id === itemId ? { ...item, quantity: Math.max(0, quantity) } : item
        )
        set({ items: updatedItems.filter((item) => item.quantity > 0) })
      },
      clearCart: () => set({ items: [] }),
      getItemsCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      getTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)

export default useCart
