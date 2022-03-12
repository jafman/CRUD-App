const validateRequired = (name) => {
  if (name === undefined) {
    return false;
  }
  return name.trim().length > 0;
};

const validatePassword = (password) => {
  if (password === undefined) {
    return false;
  }
  var regEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regEx.test(password);
};

const validateEmail = (email) => {
  if (email === undefined) {
    return false;
  }
  var regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEx.test(email);
};

exports.validateNewUser = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!validateRequired(name)) {
    return res.status(400).send({
      message: "Name is required",
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).send({
      message: "Email is invalid",
    });
  }

  if (!validatePassword(password)) {
    return res.status(400).send({
      message: `Password must be at least 8 characters long, 
        contain at least one number, one uppercase letter, 
        one lowercase letter and one special character`,
    });
  }

  next();
};

exports.validateCredentials = (req, res, next) => {
  const { email, password } = req.body;

  if (!validateRequired(email)) {
    return res.status(400).send({
      message: "Email is required",
    });
  }

  if (!validateRequired(password)) {
    return res.status(400).send({
      message: "Password is required",
    });
  }

  next();
};
