/*   
Jeff   5/7/2023
Vue3 Tutorial - netNinja
https://www.youtube.com/watch?v=YrxBCBibVo0&list=PL4cUxeGkcC9hYYGbV60Vq3IXYNfDk8At1&index=1&t=705s&ab_channel=TheNetNinja

1) Create a Vue instance and mount it to the HTML page
2) Must create a function, then return an object from inside that function

v-if and v-else will insert/remove the element from the DOM
v-show changes the css property to display:block or display:none

*/


"use strict";

const app = Vue.createApp({
    data() {
      return{
       url: "https://developer.mozilla.org/en-US/",
       showData: true,
       itemPricesForTotal : [],
       products: [
          {
            id: 9,
            title: "Infinix INBOOK",
            price: 875,
            image: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
            count: 0,
            ogPrice: 875
          },
          {
            id: 10,
            title: "HP Pavilion 15-DK1056WM",
            price: 1099,
            image: "https://i.dummyjson.com/data/products/10/thumbnail.jpeg",
            count: 0,
            ogPrice: 1099
          },
          {
            id: 11,
            title: "perfume Oil",
            price: 13,
            image: "https://i.dummyjson.com/data/products/11/thumbnail.jpg",
            count: 0,
            ogPrice: 13
          },
          {
            id: 12,
            title: "Brown Perfume",
            price: 40,
            image: "https://i.dummyjson.com/data/products/12/thumbnail.jpg",
            count: 0,
            ogPrice: 40
          }
       ]
      }
    },
    methods:{
      updateCount(e, qty){
        let target = e.target
        let cardId = Number(target.parentElement.parentElement.parentElement.id);
        let rowId = Number(target.parentElement.parentElement.id)
        return this.products.map(item => { 
            if (item.id == cardId || item.id == rowId) {
              if (target.classList.contains("add")) {
                item.count = item.count + qty
                item.price = item.ogPrice * item.count
                this.itemPricesForTotal.push(Number(item.ogPrice))
              } else if (target.classList.contains("minus") && item.count > 0) {
                item.count = item.count - qty
                item.price = item.ogPrice * item.count
                let newPrice = Number(-item.ogPrice)
                this.itemPricesForTotal.push(newPrice)
              } 
            }
        });
      },
      // How to toggle a boolean:  https://stackoverflow.com/questions/11604409/how-to-toggle-a-boolean
      showCart(){
        this.showData = !this.showData
      }
    },
    computed: {
      filteredCart(){
          return this.products.filter((product) => product.count > 0)
      },
      cartIconNumber(){
        let tempArr = []
        this.products.forEach(element => {
          tempArr.push(element.count)
        });
          let cartItemCount = tempArr.reduce((a, b) => 
            a + b, 0
          )
          return cartItemCount
      },
      cartTotalPrice(){
          let cartTotal = this.itemPricesForTotal.reduce((a, b) => 
          a + b, 0
      )
        return cartTotal;
      }
    }
});

app.mount('#app')




