import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Alan',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      ppsn: '1234567TW',
      isAdmin: true,
      prsiUsed: false,
    },
    {
      name: 'Ashly',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      ppsn: '1234567TX',
      isAdmin: false,
      prsiUsed: false,
    },
  ],

  products: [
    {
      //_id: '1',
      name: 'Mens Frame 1',
      slug: 'mens-fr1',
      category: 'men',
      image: '/images/p1.jpg',
      threeD: 'sample',
      price: 125,
      countInStock: 0,
      brand: 'Hugo',
      rating: 4.0,
      numRatings: 10,
      description:
        'Upgrade your style with these sleek and durable mens glasses, featuring a classic design and comfortable fit.',
    },

    {
      //_id: '2',
      name: 'Womens Frame 1',
      slug: 'womens-fr1',
      category: 'women',
      image: '/images/p2.jpg',
      threeD: 'sample',
      price: 150,
      countInStock: 10,
      brand: 'Gucci',
      rating: 4.5,
      numRatings: 20,
      description:
        "Elevate your look with these sophisticated and feminine women's glasses, designed with a modern aesthetic and premium materials.",
    },

    {
      //_id: '3',
      name: 'Kids Frame 1',
      slug: 'kids-fr1',
      category: 'child',
      image: '/images/p3.jpg',
      threeD: 'sample',
      price: 85,
      countInStock: 10,
      brand: 'Disney',
      rating: 5.0,
      numRatings: 15,
      description:
        'Get your little one ready for school with these fun and durable kids glasses, designed for a comfortable fit and with a colorful frame.',
    },

    {
      //_id: '4',
      name: 'Mens Frame 2',
      slug: 'mens-fr2',
      category: 'men',
      image: '/images/p1.jpg',
      threeD: 'sample',
      price: 200,
      countInStock: 10,
      brand: 'Diesel',
      rating: 3.0,
      numRatings: 5,
      description:
        'Refreshing new look for men with glossy black plastic and grey metal accents.',
    },

    {
      //_id: '5',
      name: 'Womens Frame 2',
      slug: 'womens-fr2',
      category: 'women',
      image: '/images/p2.jpg',
      threeD: 'sample',
      price: 125,
      countInStock: 10,
      brand: 'Coach',
      rating: 4.0,
      numRatings: 12,
      description:
        "Make a statement with these trendy women's glasses, featuring a unique frame design and high-quality lenses for optimal vision.",
    },

    {
      //_id: '6',
      name: 'Kids Frame 2',
      slug: 'kids-fr2',
      category: 'child',
      image: '/images/p3.jpg',
      threeD: 'sample',
      price: 75,
      countInStock: 10,
      brand: 'Marvel',
      rating: 4.0,
      numRatings: 2,
      description:
        'Keep your child seeing clearly and looking cute with these fun and durable child-sized glasses.',
    },

    {
      //_id: '7',
      name: 'Mens Frame 3',
      slug: 'mens-fr3',
      category: 'men',
      image: '/images/p1.jpg',
      threeD: 'sample',
      price: 250,
      countInStock: 10,
      brand: 'Tommy',
      rating: 4.5,
      numRatings: 25,
      description:
        "Upgrade your eyewear game with these stylish and durable men's glasses, perfect for both work and play.",
    },
  ],
};

export default data;
