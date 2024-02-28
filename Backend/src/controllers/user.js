const bcrypt = require('bcrypt');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

const validateName = (name, fieldName) => {
  const isValid = /^[a-zA-Z]+$/.test(name);

  if (!isValid) {
    return {
      isValid: false,
      error: `${fieldName} should only contain alphabets.`,
    };
  }

  return { isValid: true };
};

const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateEmail = (email) => ({
  isValid: isEmailValid(email),
  error: 'Invalid email format.',
});

// SignUp User
const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const firstNameValidation = validateName(firstName, 'FirstName');
    const lastNameValidation = validateName(lastName, 'LastName');

    if (!firstNameValidation.isValid) {
      return res.status(400).json({ error: firstNameValidation.error });
    }

    if (!lastNameValidation.isValid) {
      return res.status(400).json({ error: lastNameValidation.error });
    }
    // Validate email format
    const emailValidation = validateEmail(email);

    if (!emailValidation.isValid) {
      return res.status(400).json({ error: emailValidation.error });
    }

    // Check if the user with the given email already exists
    const existingUser = (email) => {
      return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0]);
          }
        });
      });
    };

    const existUser = await existingUser(email);

    if (existUser) {
      return res.status(400).json({ message: 'User Already Exists' });
    }

    // Generate a salt
    const saltRounds = parseInt(process.env.saltRounds);
    const saltKey = await bcrypt.genSalt(saltRounds);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, saltKey);

    // Insert the user into the database with hashed password and saltKey
    const query = 'INSERT INTO users (firstName, lastName, email, password, saltKey) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [firstName, lastName, email, hashedPassword, saltKey], (err, results) => {
      if (err) {
        console.log("server error about query", err);
      } else {
        // Inside the signup code
        const token = jwt.sign({ id: results.insertId }, process.env.SECRET_KEY, (err, token) => {
          res.header('Authorization', token).status(201).json({ message: "SignUp successful", token: token });
        })
      }
    });

  } catch (error) {
    res.json({ error });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const emailValidation = validateEmail(email);

    if (!emailValidation.isValid) {
      return res.status(400).json({ error: emailValidation.error });
    }
    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Retrieve user from the database by email
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error("Server error about query", err);
        return res.status(500).json({ error: "Server Error" });
      }

      if (!results.length) {
        // Handle case where no user is found
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = results[0];

      // Compare the password with the hashed password in the database.
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      } else {
        // Generate a new JWT token
        const newToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, (err, token) => {
          if (err) {
            console.error("Error signing JWT token:", err);
            return res.json({ err });
          }

          res.header('Authorization', token).status(200).json({ message: "Login successful", Email: user.email, token: token });
        });
      }
    });
  } catch (error) {
    console.error("Error parsing request body:", error);
    return res.status(400).json({ error: "Invalid request body" });
  }
};

// UpdateUser
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, username, timezone } = req.body;

  try {
    const firstNameValidation = validateName(firstName, 'FirstName');
    const lastNameValidation = validateName(lastName, 'LastName');

    if (!firstNameValidation.isValid) {
      return res.status(400).json({ error: firstNameValidation.error });
    }

    if (!lastNameValidation.isValid) {
      return res.status(400).json({ error: lastNameValidation.error });
    }

    // Convert userId from string to number if needed
    const userIdNumber = Number(userId);

    // Compare the user ID from the token with the user ID from the request parameters
    if (req.user.id !== userIdNumber) {
      return res.status(403).json({ error: "Token does not match user ID" });
    }

    if (!firstName && !lastName && !username && !timezone) {
      return res.status(400).json({ error: "No fields to update" });
    }

    // Check if the username already exists
    if (username) {
      const usernameExistsQuery = 'SELECT id FROM users WHERE username = ?';
      db.query(usernameExistsQuery, [username], (usernameErr, usernameResults) => {
        if (usernameErr) {
          console.log("Server error while checking username existence", usernameErr);
          return res.status(500).json({ error: "Internal server error" });
        }

        if (usernameResults.length > 0) {
          return res.status(400).json({ error: "Username already exists" });
        }

        // Continue with the update if the username does not exist
        performUpdate();
      });
    }

    function performUpdate() {
      const updateFields = [];
      const updateValues = [];
      const updatedData = {};

      if (firstName) {
        updateFields.push('firstName=?');
        updateValues.push(firstName);
        updatedData.firstName = firstName;
      }

      if (lastName) {
        updateFields.push('lastName=?');
        updateValues.push(lastName);
        updatedData.lastName = lastName;
      }

      if (username) {
        updateFields.push('username=?');
        updateValues.push(username);
        updatedData.username = username;
      }

      if (timezone) {
        updateFields.push('timezone = ?');
        updateValues.push(timezone);
        updatedData.timezone = timezone;
      }

      const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id=?`;
      db.query(updateQuery, [...updateValues, userId], (err, results) => {
        if (err) {
          console.log("Server error about query", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "User not found" });
        }
        res.json({ status: "User data updated successfully", updatedData });
        console.log("Successfully Updated User Data");
      });
    }
  } catch (error) {
    console.log("Internal server error", error);
    return res.json({ error });
  }
};



// Get User By ID
const getUserById = (req, res) => {
  try {
    const userId = req.params.id;

    // Check if req.authData exists and has an 'id' property
    if (!req.authData || !req.authData.id || req.authData.id.toString() !== userId.toString()) {
      console.log("User ID mismatch. Token ID:", req.authData ? req.authData.id : 'undefined', "Request ID:", userId);
      return res.status(404).json({ error: "Token does not match user ID" });
    }

    const query = 'SELECT id, firstname, lastname, username, email FROM users WHERE id = ?';
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.log("Server error about query", err);
        return res.json({ error: err });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const userData = results[0];
      const response = {
        id: userData.id,
        firstname: userData.firstname,
        lastname: userData.lastname,
        username: userData.username,
        email: userData.email,
      };

      res.json(response);
      console.log("Successfully retrieved user data by ID");
    });
  } catch (error) {
    console.error("Error in getUserById:", error);
    return res.json({ error });
  }
};



// Delete User By ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Compare the user ID from the token with the user ID from the request parameters
    if (req.user.id !== Number(userId)) {
      console.log("User ID mismatch. Token ID:", req.user.id, "Request ID:", userId);
      return res.status(403).json({ error: "Token does not match user ID" });
    }

    // Continue with the deletion process
    const deleteQuery = 'UPDATE users SET deletedAt = CURRENT_TIMESTAMP() WHERE id = ?';

    const results = await new Promise((resolve, reject) => {
      db.query(deleteQuery, [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ status: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    return res.json({ error });
  }
};


module.exports = {
  getUserById,
  signUp,
  updateUser,
  deleteUser,
  login,
};


