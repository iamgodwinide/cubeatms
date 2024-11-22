const products = [
  {
    id: 1,
    name: "Cube Bitcoin ATM",
    slug: "cube-bitcoin-atm",
    price: 3600,
    image: "/atm1.webp",
    hoverImage: "/atm1-hover.webp",
    gallery: Array(15).fill("").map((_, index) => `/gallery/${index+1}.jpg`)
  },
  {
    id: 2,
    name: "Custom Cube Bitcoin ATM (10 ATM Minimum)",
    slug: "custom-cube-bitcoin-atm",
    price: 34000,
    image: "/IMG_4953.jpg",
    hoverImage: "/IMG_4953-hover.jpg",
    gallery: Array(15).fill("").map((_, index) => `/gallery/${index+1}.jpg`)
  }
]

export default products;