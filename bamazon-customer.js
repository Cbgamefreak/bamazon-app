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
  displayProducts();
});


function displayProducts(){   
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
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
function start(){
     inquirer.prompt({
       name: "item",
       type: "input",
       message: "What is the ID of the item would you like to buy?"
     }).then(function(answer) {
       console.log(answer.item);
       connection.query("SELECT * FROM products WHERE ?", { id: answer.item }, function(err, res) {
         console.log("Product Name: " + res[0].product_name)
         console.log("Department: " + res[0].department_name)
         console.log("Price: " + res[0].price)
         console.log("Quantity in inventory: " + res[0].stock_quantity)
         buyItem(res[0].stock_quantity, res[0].id, res[0].price, res[0].product_name);
       });
     
    });
}

function buyItem(itemQuantity, itemId, itemPrice, itemName){
    inquirer.prompt({
        name: "quantity",
        type: "input",
        message: "How many units of the item would you like to buy?"
      }).then(function(answer) {
        console.log(answer.quantity);
        var purchaseQuantity = parseInt(answer.quantity);
        if (purchaseQuantity < itemQuantity) {

            var newQuantity = itemQuantity - purchaseQuantity 
            connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity: newQuantity},{id: itemId}],function(error) {
                if (error) throw err;
                console.log("Item Bought sucessfully");
                
              }
            );

            var total = itemPrice*purchaseQuantity;
            console.log("Your reciept: ");
            console.log("Item Bought: " + itemName + " || Price: " + itemPrice);
            console.log("Total: " + total);
            confirmPurchase();
          }
          
          else{
            console.log("Inusfficient Quantity")
            start();
             
          }
      
     });

}

function confirmPurchase(){


  
}