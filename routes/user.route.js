module.exports = (app) => {
  const userController = require("../controllers/user.controller");
  let router = require("express").Router();
  // Create a new User
  router.post("/", userController.create);
  // Get a User by email
  router.get("/:email", userController.findOne);
  // Update a User by id
  router.patch("/:id", userController.update);
  // Delete a User by id
  router.delete("/:id", userController.delete);
  app.use("/api/user", router);
};
