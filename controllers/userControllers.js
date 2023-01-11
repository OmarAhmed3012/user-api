const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);


const registerUserController = (req, res) => {
    const { email, password } = req.body;
    
    // Check if user exists
    User.findOne({ where: { email }, attributes: ['id', 'email', 'password'] })
      .then(user => {
        if (user) {
          // User already exists
          return res.status(403).json({
            message: 'User already exists'
          });
        }

        const hashedPassword = bcrypt.hashSync(password, salt);
        
        // Create user if not
        User.create({
          email,
          password: hashedPassword
        })
          .then(user => {
            console.log(user)
            // Generate JWT
            const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret');
            
            // Return token in response
            res.json({ token })
          }).catch(error => {
            res.status(400).json({error})
          });
      });
  };

  const loginUserController = (req, res) => {
    const {email, password} = req.body

    const hashedPassword = bcrypt.hashSync(password, salt); 


    User.findOne({ where: { email, password: hashedPassword }})
      .then(user => {

                // Generate JWT
                const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret');
                
                // Return token in response
                res.json({ user, token })
          ;
        }).catch(error => {
            res.status(400).json({error})
        })

  }

  const updateUserController = (req, res) => {
    const id = req.params.id

    User.update(req.body, { where: { id }}).then(user => {
        res.status(200).json({user})

    }).catch(error => {
        res.status(400).json({error})
    })

  }

  module.exports= {
    registerUserController,
    loginUserController,
    updateUserController
  }