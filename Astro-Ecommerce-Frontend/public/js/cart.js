export function addProductToCart(button) {
    const id = button.getAttribute('data-id');
    const product = {
      id: id,
      name: button.getAttribute('data-name'),
      url_key: button.getAttribute('data-url-key'),
      image: button.getAttribute('data-image'),
      price: button.getAttribute('data-price')
    };
  
    let products = localStorage.getItem('productCart');
    if (products) {
      const data = JSON.parse(products);
      const existingProduct = data.find(item => item.id === product.id);
      if (existingProduct) {
        if (!existingProduct.quantity) {
          existingProduct.quantity = 1;
        } else {
          existingProduct.quantity += 1;
        }
      } else {
        data.push(product);
      }
      localStorage.setItem('productCart', JSON.stringify(data));
    } else {
      localStorage.setItem('productCart', JSON.stringify([product]));
    }
  }
  