let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');


let basket = JSON.parse(localStorage.getItem('data')) || [];

let calculation = () => {
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x+y, 0);
} 

calculation();


let generateCartItem = () => {

    if(basket.length !== 0){
        return (shoppingCart.innerHTML = basket.map((x) => {
            let {id, item} = x;
            let search = shopImagesData.find((y)=> y.id === id) || []
            let {img, name, price} = search;
            return `
            <div class="cart-item">
                <img width="100" src=${img} />
                        <div class="details">
                            <div class="title-price-x">
                            <h4 class="title-price">
                            <p> ${name}</p>
                            <p class="cart-item-price"> $ ${price}</p> 
                            </h4>
                            <i onclick = "removeItem(${id})" class="bi bi-x-lg"></i>
                            </div>
                            
                            <div class="buttons">
                                <i onclick = "decrement(${id})" class="bi bi-dash-lg"></i>
                                <div id="${id}" class="quantity">${item}</div>
                            <i onclick = "increment(${id})" class="bi bi-plus-lg"></i>
                            </div>
                            <h3>$ ${item * search.price}</h3> 

                        </div>
            </div>
            `;
        }).join(''));
    }else{
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is Empty</h2> 
        <a href="index.html">
            <button class="homeBtn">Back to home</button>
        </a> 
        `
    }

}

generateCartItem();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    
    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1
        });
    }
    else{
        search.item += 1;
    }
    generateCartItem();
    update(selectedItem.id)
    localStorage.setItem('data', JSON.stringify(basket));
};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    if(search === undefined) return;

    else if(search.item === 0) return;

    else{
        search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItem();
    localStorage.setItem('data', JSON.stringify(basket));
}; 

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x)=>x.id !== selectedItem.id);
    generateCartItem();
    totalAmount();
    calculation();
    localStorage.setItem('data', JSON.stringify(basket));
}

let totalAmount = () => {
    if(basket.length !==0){
        let amount = basket.map((x)=>{
            let {id, item} = x;
            let search = shopImagesData.find((y)=> y.id === id) || [];
            return item * search.price;
        }).reduce((x,y)=> x + y, 0)
        label.innerHTML = `
        <h2>Total Bill: $ ${amount}</h2>
        <button class ="checkout">checkout</button>
        <button onclick="clearCart()" class ="removeAll">Clear Cart</button>
        `;
    }
    else return
}

let clearCart = () => {
    basket = [];
    generateCartItem();
    calculation();
    localStorage.setItem('data', JSON.stringify(basket));
}

totalAmount();

