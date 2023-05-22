const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const secretKey = 'segredo';


exports.CreateUser = async (req, res) => {
    try {
      const { email, nome, senha } = req.body;
         nsessao='0';
      const payload = {
        email,
        nome,
        senha,
        nsessao
      };
  
      const newUser = new Users.UsuarioModel(payload);
      newUser.token = jwt.sign(payload, secretKey);
  
      await newUser.save();
  
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
exports.ValidaUser = async (req, res) => {

    const UserBd =  await Users.UsuarioModel.findOne({email: req.body.email,senha: req.body.senha});
    if(!UserBd){
        res.status(401).send("Credenciais invalidas")
    }else{
        const token = UserBd.token;

        jwt.verify(token, secretKey, (err, decodedToken) => {
            if (err) {
              return res.status(401).json({ message: 'Invalid token' });
            } else {               
                    res.status(201).send("Validado1");
                
            }
          });    
    }
    
    
}
