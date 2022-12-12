"use strict";
const mainDropdown = document.getElementById("mainDropdown");
const Searchbycategory = document.getElementById("Searchbycategory");
const viewall = document.getElementById("viewall");
const SearchProductBycategory = document.getElementById(
  "SearchProductBycategory"
);
const tableHead = document.getElementById("tableHead");
document.getElementById("SearchProductBycategory").style.display = "none";
const entireTable = document.getElementById("entireTable");

window.onload = () => {
  function displayData() {
    let row = tableBody.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    cell1.innerHTML = `<a href = "details.html?productId=${products.productName}"> ${products.productName}</a>`;
    cell2.innerHTML = `$${parseFloat(products.unitPrice).toFixed(2)}`;
    cell3.innerHTML = products.categoryId;
    cell4.innerHTML = products.productId;
  }

  mainDropdown.onchange = SearchByCategoryDd;
  clearField(tableBody);

  function SearchByCategoryDd() {
    SearchProductBycategory.length = 0;
    document.getElementById("mainDropdown").value;
    fetch(`http://localhost:8081/api/categories`)
      .then((Response) => Response.json())
      .then((data) => {
        for (let category of data) {
          let newOption = document.createElement("option");
          newOption.text = category.name;
          newOption.value = category.categoryId;
          SearchProductBycategory.appendChild(newOption);
        }
      });

    mainDropdown.onchange = () => {
      clearField(tableBody);
      document.getElementById("SearchProductBycategory").style.display =
        "block";
      // document.getElementById("tableHead").style.display = "block"

      if (mainDropdown.value == "viewall") {
        fetch(`http://localhost:8081/api/products`)
          .then((Response) => Response.json())
          .then((data) => {
            productDisplay(data);
          });
      }

      function productDisplay(data) {
        for (let products of data) {
          let row = tableBody.insertRow(-1);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          let cell4 = row.insertCell(3);

          cell1.innerHTML = products.productName;
          cell2.innerHTML = `$${parseFloat(products.unitPrice).toFixed(2)}`;
          cell3.innerHTML = products.categoryId;
          cell4.innerHTML = products.productId;
        }
      }
    };
  }

  SearchProductBycategory.onchange = () => {
    clearField(tableBody);
    fetch(`http://localhost:8081/api/products`)
      .then((Response) => Response.json())
      .then((data) => {
        productDisplay(data);
      });

    function productDisplay(data) {
      for (let products of data) {
        if (SearchProductBycategory.value == products.categoryId) {
          let row = tableBody.insertRow(-1);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          let cell4 = row.insertCell(3);

          cell1.innerHTML = `<a href = "details.html?productId=${products.productId}"> ${products.productName}</a>`;
          cell2.innerHTML = `$${parseFloat(products.unitPrice).toFixed(2)}`;
          cell3.innerHTML = products.categoryId;
          cell4.innerHTML = products.productId;
        }
      }
    }
  };

  function clearField(table) {
    table.replaceChildren();
  }
};
