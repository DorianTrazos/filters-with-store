import '../css/styles.css';

const productsListElement = document.getElementById('products-list');
const noProductsElement = document.getElementById('no-products');
const sugarlessCheckboxElement = document.getElementById('sugarless-checkbox');
const searchInputElement = document.getElementById('search');
const orderByElement = document.getElementById('order-by');
const PRODUCTS = [
  {
    name: 'Waffle with Berries',
    image: 'assets/images/image-waffle.jpg',
    price: 6.5,
    sugarless: true
  },
  {
    name: 'Vanilla Bean Crème Brûlée',
    image: './assets/images/image-creme-brulee.jpg',
    price: 7,
    sugarless: true
  },
  {
    name: 'Macaron Mix of Five',
    image: './assets/images/image-macaron.jpg',
    price: 8,
    sugarless: false
  },
  {
    name: 'Classic Tiramisu',
    image: './assets/images/image-tiramisu.jpg',
    price: 5.5,
    sugarless: false
  },
  {
    name: 'Pistachio Baklava',
    image: './assets/images/image-baklava.jpg',
    price: 4,
    sugarless: true
  },
  {
    name: 'Lemon Meringue Pie',
    image: './assets/images/image-meringue.jpg',
    price: 5,
    sugarless: true
  },
  {
    name: 'Red Velvet Cake',
    image: './assets/images/image-cake.jpg',
    price: 4.5,
    sugarless: false
  },
  {
    name: 'Salted Caramel Brownie',
    image: './assets/images/image-brownie.jpg',
    price: 5.5,
    sugarless: false
  },
  {
    name: 'Vanilla Panna Cotta',
    image: './assets/images/image-panna-cotta.jpg',
    price: 6.5,
    sugarless: true
  }
];

const resetSearch = () => (searchInputElement.value = '');
const resetInput = () => (sugarlessCheckboxElement.checked = false);
const resetOrderBy = () => (orderByElement.selectedValue = 'default');

const printProducts = products => {
  productsListElement.textContent = '';
  if (products.length === 0) {
    noProductsElement.classList.remove('hide');
    return;
  } else {
    noProductsElement.classList.add('hide');
  }
  const fragment = document.createDocumentFragment();
  products.forEach(product => {
    const newProductContainer = document.createElement('div');
    newProductContainer.classList.add('product');

    const newImage = document.createElement('img');
    newImage.src = product.image;

    const newTitle = document.createElement('h2');
    newTitle.textContent = product.name;
    newTitle.classList.add('product-title');

    const newTag = document.createElement('span');
    newTag.classList.add('product-tag');
    if (product.sugarless) {
      newTag.textContent = 'Sugarless';
    }

    const newSpan = document.createElement('span');
    newSpan.textContent = '$' + product.price.toFixed(2);
    newSpan.classList.add('product-price');

    newProductContainer.append(newImage, newTitle, newTag, newSpan);

    fragment.append(newProductContainer);
  });
  productsListElement.append(fragment);
};

const filterProductsBySugarless = event => {
  const isSugarless = event.target.checked;
  if (!isSugarless) {
    printProducts(PRODUCTS);
    return;
  }

  const filteredProducts = PRODUCTS.filter(product => product.sugarless);
  printProducts(filteredProducts);
};

const filteredProductsByName = event => {
  resetInput();
  resetOrderBy();
  const search = event.target.value;

  if (!search) {
    printProducts(PRODUCTS);
    return;
  }

  const filteredProducts = PRODUCTS.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
  printProducts(filteredProducts);
};

const sortBy = event => {
  resetInput();
  resetSearch();
  const order = event.target.value;
  const sortedProducts = [...PRODUCTS];

  if (order === 'name') {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (order === 'price') {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  printProducts(sortedProducts);
};

printProducts(PRODUCTS);

sugarlessCheckboxElement.addEventListener('change', filterProductsBySugarless);
searchInputElement.addEventListener('input', filteredProductsByName);
orderByElement.addEventListener('change', sortBy);
