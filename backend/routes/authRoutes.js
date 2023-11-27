const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/register', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmPassword;

  console.log(req.body);

  // check for required fields
  if (!name || !email || !password) {
    console.log('email', email);
    return res.status(400).json({ error: 'Por favor, preencha todos os campos.' });
  }

  // confirm password validation
  if (password !== confirmpassword) {
    console.log(password);
    console.log(confirmpassword);
    return res.status(400).json({ error: 'As senhas não conferem.' });
  }

  // verify user email
  const isEmailExists = await User.findOne({ email: req.body.email });

  if (isEmailExists) {
    return res.status(400).json({ error: 'O e-mail informado já está em uso.' });
  }

  // creating password
  // lib bcrypt
  const salt = await bcrypt.genSalt(6);
  const reqPassword = req.body.password;

  //password + salt = encrypt everyone
  const passwordHash = await bcrypt.hash(reqPassword, salt);

  const user = new User({
    name: name,
    email: email,
    password: passwordHash,
  });

  try {
    const newUser = await user.save();

    // create token
    // put data in token
    // encrypt
    const token = jwt.sign(
      // payload data
      {
        name: newUser.name,
        id: newUser._id,
      },
      'secret',
    );

    // return token
    res.json({
      error: null,
      msg: 'Você realizou o cadastro com sucesso!',
      token: token,
      userId: newUser._id,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // check if user exists
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ error: 'Não há usuário cadastrado com este e-mail!' });
  }

  // check if password match
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(400).json({ error: 'Senha inválida' });
  }

  // create token
  const token = jwt.sign(
    // payload data
    {
      name: user.name,
      id: user._id,
    },
    'nossosecret',
  );

  // return token
  res.json({
    msg: 'Você está autenticado!',
    token: token,
    userId: user._id,
  });
});

module.exports = router;
