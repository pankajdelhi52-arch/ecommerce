const express = require("express");

const app = express();

// Fake Database
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    id: "2",
    name: "Pankaj",
    email: "pankaj@gmail.com",
  },
];

// Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("API Running");
});

// Get All Users
app.get("/api/users", (req, res) => {
  res.json({
    success: true,
    users: users,
  });
});

// Add New User
app.post("/api/users", (req, res) => {
  users.push(req.body);

  res.json({
    success: true,
    message: "User Added",
    data: req.body,
  });
});
  
  app.get("/api/products", (req, res) => {
    res.json([
        {
            id: 1,
            name: "Laptop",
            price: 50000
        },
        {
            id: 2,
            name: "Mobile",
            price: 20000
        }
    ]);
});
app.get("/api/products/:id", (req, res) => {

    res.json({
        success: true,
        productId: req.params.id
    });

});

module.exports = app;