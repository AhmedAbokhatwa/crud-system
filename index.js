let title = document.getElementById("title"),
price = document.getElementById("price"),
ads = document.getElementById("ads"),
tax = document.getElementById("tax"),
discount = document.getElementById("discount"),
submit = document.getElementById("submit"),
count = document.getElementById("count"),
category = document.getElementById("category"),
total = document.getElementById("total"),
mood = 'create',
tmp;
///////////////////////// // // getTotal // // //////////////////////////////
function getTotal(){
  console.log('mmmmmmmmmmmmmmm  ',price.value )
  if(price.value != ''){

    let result = (+price.value + +tax.value + +ads.value) - +discount.value;
    total.innerHTML  = result;  
    total.style.backgroundColor = '#040';
  }else{
    total.innerHTML = '';
    total.style.backgroundColor = '#a00d02'
  }
}

///////////////////////// // // local storage // // //////////////////////////////

let products;
if (localStorage.pro != null){
  products = JSON.parse(localStorage.pro)
}else{
  products = []
}
submit.onclick= function(){
  
  let new_product = {
    title: title.value,
    price: price.value,
    ads: ads.value,
    tax: tax.value,
    discount: discount.value,
    count: count.value,
    total: total.innerHTML,
    category: category.value,
  }
  // products.push(new_product)
  // localStorage.setItem('pro',JSON.stringify(products))
  // products.push(new_product)
  // console.log(products.length)
  ////////////////////////////////////////moood///////////////////////////
  console.log("====================",mood)
  if (mood === 'create'){
    console.log(products.length)
    console.log('new_product.count',new_product.count)
    console.log(new_product.count)
      if (products.length > 0){
        
    
        if (new_product.count > 1 ){
          
          for(let x = 1; x< new_product.count; x++){
            console.log( 'counter',x)
            products.push(new_product)
            localStorage.setItem('pro',JSON.stringify(products))
          }
        
        }if(new_product.count < 0){  
              console.log( 'counter is - nigative')
              alert('counter is - nigative')
              return
        }else{
          products.push(new_product)
          localStorage.setItem('pro',JSON.stringify(products))
        }
      }else{
        console.log("Else")
        products.push(new_product)
        localStorage.setItem('pro',JSON.stringify(products))
        console.log("new_prodct",new_product)
        console.log("products",products)
      }
  }else{
    products[tmp] = new_product
    console.log(products[tmp])
    console.log('=============22',new_product)
    console.log('=============33',products)
    mood = 'create';
    document.getElementById('submit').innerHTML = mood;
    localStorage.pro = JSON.stringify(products)

  }

  clearData();
  showData();
  getTotal()
}
function clearData (){
  title.value = '',  
  price.value = '',
  ads.value = '';
  tax.value = '';
  discount.value = '';
  total.innerHTML = '';
  category.value = '';
  count.value = '';



}
///////////////////////////////////showData//////////////////////////////////////

function showData (){
  let table = '';
    for(let i= 0; i< products.length; i++){
      table += `  <tr>
              <th>${i+1}</th>
                <th>${products[i].title}</th>
                <th>${products[i].price}</th>
                <th>${products[i].ads }</th>
                <th>${products[i].tax}</th>
                <th>${products[i].discount}</th>
                <th>${products[i].total}</th>
                <th>${products[i].category}</th>
                <td><button onclick="deleteProduct(${i})">Delete  </button></td>
                <td><button onclick="updateProduct(${i})" >Update</button></td>
            </tr>`
      // row.innerHTML += products[i]
      console.log("products i",products[i])
    
    }   

    document.getElementById('tbody').innerHTML = table;
    console.log("products.length",products)
    if(products.length>0){
      delete_all =document.getElementById('delete_all')
      delete_all.innerHTML =`<button onclick="deleteAll()" >Delete All</button>`
    }
}
showData();
///////////////////////////////////deleteProduct//////////////////////////////////////

function deleteProduct(i){
  console.log("i",i)
  products.splice(i,1);
  localStorage.pro= JSON.stringify(products)
  showData();

}

///////////////////////////////////deleteAll//////////////////////////////////////
function deleteAll(){
localStorage.clear();
products.splice(0);
showData();
}

///////////////////////////////////Counter//////////////////////////////////////
function updateProduct(i){
  getTotal()
  tmp= i;
  mood = 'Update'
  count.style.display ='none';
  document.getElementById('submit').innerHTML = mood
  console.log("iiiiiiiiiiiiiii",i)
  title.value = products[i].title
  price.value = products[i].price
  ads.value = products[i].ads
  tax.value = products[i].tax
  discount.value = products[i].discount
  total.innerHTML = products[i].total  
  category.value = products[i].category
}

//search
let search = 'Title';

function getSearch(value){
  let searchlabel = document.getElementById('search')
  searchlabel.focus()
  searchlabel.value = '';
  if(value == 'by-title'){
    search = 'Title';
    // searchlabel.value;
  
  }if(value == 'by-cat'){
    search = 'Category';
  }
  searchlabel.placeholder = "Search By "+ search;
  // getData(value)
}

function getData(value){
  console.log( value,search)
  let table = '';

  for(let i= 0; i< products.length; i++){
    if (search == 'Title'){

          if (products[i].title.includes(value)){
            console.log('Title',search,i)
            table += `  <tr>
            <th>${i}</th>
              <th>${products[i].title}</th>
              <th>${products[i].price}</th>
              <th>${products[i].ads }</th>
              <th>${products[i].tax}</th>
              <th>${products[i].discount}</th>
              <th>${products[i].total}</th>
              <th>${products[i].category}</th>
              <td><button onclick="deleteProduct(${i})">Delete  </button></td>
              <td><button onclick="updateProduct(${i})" >Update</button></td>
          </tr>`
          }
    }else{
      console.log(search,i)
      if (products[i].category.includes(value)){
        table += `  <tr>
        <th>${i}</th>
          <th>${products[i].title}</th>
          <th>${products[i].price}</th>
          <th>${products[i].ads }</th>
          <th>${products[i].tax}</th>
          <th>${products[i].discount}</th>
          <th>${products[i].total}</th>
          <th>${products[i].category}</th>
          <td><button onclick="deleteProduct(${i})">Delete  </button></td>
          <td><button onclick="updateProduct(${i})" >Update</button></td>
      </tr>`
      }
    }
  
  
  }
    document.getElementById('tbody').innerHTML = table;
}