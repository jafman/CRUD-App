const db = require("../models");
const User = db.users;
//const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const saltRounds = 10;

// ==================================
// CREATE USER
// ==================================
exports.create = async (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
  };

  const plainPassword = req.body.password;

  try {
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    user.password = hash;
    User.create(user)
      .then((data) => {
        res.status(201).send({
          name: data.name,
          email: data.email,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User.",
        });
      });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred.",
    });
  }
};

// ==================================
// GET USER DETAILS
// ==================================
exports.findOne = (req, res) => {
  const { email, password } = req.body;
  User.findOne({
    where: {
      email: email,
    },
  })
    .then(async (data) => {
      const match = await bcrypt.compare(password, data.password);
      if (match) {
        const result = {
          id: data.id,
          name: data.name,
          email: data.email,
          createdAt: data.createdAt,
        };
        res.status(200).send(result);
      } else {
        res.status(401).send({
          message: "Invalid credentials",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving User.",
      });
    });
};

// ==================================
// UPDATE USER
// ==================================

exports.update = async (req, res) => {
  const id = req.params.id;
  const { password } = req.body;
  if (password) {
    req.body.password = await bcrypt.hash(password, saltRounds);
  }
  User.update(req.body, {
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "User was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// ==================================
// DELETE USER
// ==================================
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "User was deleted successfully!",
        });
      } else {
        res.status(200).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
