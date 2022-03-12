module.exports = (app) => {
  const userController = require("../controllers/user.controller");
  const userMiddleware = require("../middlewares/user.middleware");
  let router = require("express").Router();
  // Create a new User
  router.post("/", userMiddleware.validateNewUser, userController.create);
  // Get a User by email and password
  router.get("/", userMiddleware.validateCredentials, userController.findOne);
  // Update a User by id
  router.patch("/:id", userController.update);
  // Delete a User by id
  router.delete("/:id", userController.delete);
  app.use("/api/user", router);
};
