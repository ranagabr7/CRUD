// 1- call all inputs
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let discount = document.getElementById("discount");
let totalPrice = document.getElementById("total");
let category = document.getElementById("category");
let submit = document.querySelector(".submit");
let update = document.querySelector(".update");
let tbody = document.getElementById("tbody");
let data = [];
let index = 0;
// console.log(title, price, taxes, discount, totalPrice, count, category, submit);
// 3- empty input -> will remove because we use local storage
// window.onload = function () {
//   price.value = "";
//   taxes.value = "";
//   discount.value = "";
//   totalPrice.innerHTML = "";
//   totalPrice.style.color = "#364153";
// };
// 2- function getTotalPrice

if (localStorage.getItem("product") !== null) {
  data = JSON.parse(localStorage.getItem("product"));
  displayData();
}
function getTotalPrice() {
  //   console.log("done");
  //   console.log(price.value);
  if (price.value !== "" && taxes.value !== "") {
    //   console.log(totalPrice.innerHTML);
    let result = +price.value + +taxes.value - +discount.value;
    totalPrice.innerHTML = result;
    totalPrice.style.color = "#ec003f";
  } else {
    totalPrice.style.color = "#364153";
    totalPrice.innerHTML = "";
  }
}
// 4- create product
// the best way to save data -> array (add/loop/delet/edit)
// object -> related data stored together in one place
submit.addEventListener("click", function () {
  let product = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    discount: discount.value,
    category: category.value,
    totalPrice: totalPrice.innerHTML,
  };
  data.push(product);
  localStorage.setItem("product", JSON.stringify(data));
  displayData();
  // 7- store data in local storage -> store string value
  console.log(data);
  clearInput();
});
// 5- clear input
function clearInput() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  discount.value = "";
  category.value = "";
  totalPrice.innerHTML = "";
}
// 6- display data
function displayData() {
  let cartona = ""; //tr tr tr
  for (let i = 0; i < data.length; i++) {
    cartona += `
    <tr>
              <td>${i}</td>
              <td>${data[i].title}</td>
              <td>${data[i].price}</td>
              <td>${data[i].taxes}</td>
              <td>${data[i].discount}</td>
              <td>${data[i].category}</td>
              <td>${data[i].totalPrice}</td>
              <td>
                <button class="btn1" onclick={updateFormProduct(${i})}>Update</button>
              </td>
              <td>
                <button class="btn2" onclick={deleteProduct(${i})}>Delete</button>
              </td>
     </tr>
    `;
  }
  tbody.innerHTML = cartona;
}
// 8- delete product
function deleteProduct(id) {
  // console.log(id);
  data.splice(id, 1);
  localStorage.setItem("product", JSON.stringify(data));
  displayData();
}
// 9- update
function updateFormProduct(id) {
  //  console.log(id);
  console.log(data[id]);
  title.value = data[id].title;
  price.value = data[id].price;
  taxes.value = data[id].taxes;
  discount.value = data[id].discount;
  category.value = data[id].category;
  totalPrice.innerHTML = data[id].totalPrice;
  submit.style.display = "none";
  update.style.display = "block";
  index = id;
}
update.addEventListener("click", function updateProduct() {
  let product = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    discount: discount.value,
    category: category.value,
    totalPrice: totalPrice.innerHTML,
  };
  console.log(product);
  data.splice(index, 1, product);
  displayData();
  clearInput();
  update.style.display = "none";
  submit.style.display = "block";
  localStorage.setItem("product", JSON.stringify(data));
});
