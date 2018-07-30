var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "12345",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    console.log("connected")
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});


function start(){
        inquirer.prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
              "View Products for sale",
              "View Low Inventory",
              "Add to Inventory",
              "Add New Product"
            ]
          })
          .then(function(answer) {
            switch (answer.action) {
            case "View Products for sale":
              displayProducts();
              break;
      
            case "View Low Inventory":
              lowInventory();
              break;
      
            case "Add to Inventory":
              addInventory();
              break;
      
            case "Add New Product":
              addProduct();
              break;
            }
          });
      
}

function displayProducts(){   
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log("Products For Sale: ")
        for (var i = 0; i < results.length; i++){

            console.log("Item ID: "+ results[i].id)
            console.log("Product Name: "+ results[i].product_name)
            console.log("department_name: "+ results[i].department_name)
            console.log("Price: "+ results[i].price)
            console.log("Quantity Remaining: "+ results[i].stock_quantity)
            console.log("------------------------------------------------------")

        }
      
        start();
    });
}

function addProduct() {

  inquirer.prompt([
    {
    name: "product_name",
    type: "input",
    message: "What is the name of the product you would like to add?"
  },
  {
    name: "department_name",
    type: "input",
    message: "What is the department for the product you're adding?"
  },
  {
    name: "item_price",
    type: "input",
    message: "What is the price of the item you're adding?"
  },
  {
    name: "current_inventory",
    type: "input",
    message: "What is the current inventory of the product"
  },
  ]).then(function(answer) {

  
    var query = connection.query(
      "INSERT INTO products SET ?",
      {
        product_name: answer.product_name,
        department_name: answer.department_name,
        price: answer.item_price,
        stock_quantity: answer.current_inventory
      },
      function(err, res) {
        start();
        
      }
    );
  
 });

}

function lowInventory(){
  var query = "SELECT * FROM products WHERE stock_quantity < 5";
  connection.query(query, function(err, results) {
    console.log("Here are the items with low inventory");

    for (var i = 0; i < results.length; i++) {
      console.log("Item ID: "+ results[i].id)
      console.log("Product Name: "+ results[i].product_name)
      console.log("department_name: "+ results[i].department_name)
      console.log("Price: "+ results[i].price)
      console.log("Quantity Remaining: "+ results[i].stock_quantity)
      console.log("------------------------------------------------------")
    }
  });



}
function addInventory() {
  inquirer.prompt([
    {
    name: "product",
    type: "input",
    message: "Which products inventory would you like to add to? (use product ID)"
  },
  {
    name: "restock",
    type: "input",
    message: "How much inventory would you like to add?"
  }
  ]).then(function(answer) {

    var currentQuantity;
    var inventory = parseInt(answer.restock);
    
    var newInventory;
    var currentProduct;
    connection.query("SELECT * FROM products WHERE ?", { id: answer.product }, function(err, res) {
      currentQuantity = res[0].stock_quantity;
      currentProduct=res[0].product_name;
      newInventory = currentQuantity + inventory;
      connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity: newInventory},{ id: answer.product}],function(err, res) {
      
        console.log("Product: "+ currentProduct);
        console.log("Old inventory: " + currentQuantity);
        console.log("New inventory: "+ newInventory);
        console.log()
        start();
        }
      );
    });


 });
}
