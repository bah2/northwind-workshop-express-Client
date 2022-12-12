"use strict";

const tableBody = document.getElementById("tableBody");
window.onload = () => {
  const linkPr = new URLSearchParams(location.search);
  let id = -1;

  if (linkPr.has("productId") == true) {
    id = linkPr.get("productId");

    fetch(`http://localhost:8081/api/products/${id}`)
      .then((Response) => Response.json())
      .then((data) => {
        // if(1 == products.categoryId){
        let row = tableBody.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        cell1.innerHTML = `${data.productName} ${data.productName}`;
        cell2.innerHTML = `$${parseFloat(data.unitPrice).toFixed(2)}`;
        cell3.innerHTML = data.categoryId;
        cell4.innerHTML = data.productId;
      });
  }
};
