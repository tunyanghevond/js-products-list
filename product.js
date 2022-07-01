const productDOM = document.querySelector('.product');

const url = 'https://course-api.com/javascript-store-single-product';

const fetchProduct = async () => {
    try {
        productDOM.innerHTML = `<h4 class='product-loading'>Loading...</h4>`;

        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const response = await fetch(`${url}?id=${id}`);
        const data = await response.json();
        return data
    } catch (error) {
        productDOM.innerHTML = `<h4 class='error'>This page have some problem.Please try later!</h4>`;
    }
}

const displayProduct = (productList) => {
    const { name: title, price, company, description, image, colors } = productList.fields;
    const { url: img } = image[0];
    document.title = title.toUpperCase();

    const productColor = colors.map(color => {
        return ` <span class="product-color" style='background: ${color}'></span>`
    }).join('')

    productDOM.innerHTML = `
<div class="product-wrapper">
            <img src="${img}" class="img" alt="">
            <div class="product-info">
                <h3>${title}</h3>
                <h5>${company}</h5>
                <span>$${price / 100}</span>
                <div class="colors">
                   ${productColor}
                </div>
                <p>${description}</p>
                <button class="btn"> add to cart</button>
            </div>
        </div>
`
};

const start = async () => {
    const list = await fetchProduct()
    displayProduct(list)
}
start()