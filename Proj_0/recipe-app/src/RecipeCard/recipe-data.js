import milkteaImage from '../assets/milktea.jpg'

const recipe = {
  title: 'Condensed Milk Milk Tea',
  image: milkteaImage,
  ingredients: [
    { name: 'Black Tea', amount: '15 g', link: 'https://example.com' },
    { name: 'Water', amount: '1300 g', link: 'https://example.com' },
    { name: 'Condensed Milk', amount: '10 g', link: 'https://example.com' },
    { name: 'Whole Milk', amount: '250 g', link: 'https://example.com' },
    { name: 'Granulated Sugar', amount: '25 g', link: 'https://example.com' }
  ],
  instructions: [
    'Boil the water and steep the black tea for 3–5 minutes.',
    'Mix condensed milk and sugar until dissolved.',
    'Combine tea with milk mixture and add whole milk.',
    'Serve hot or chilled.'
  ]
}

export default recipe
