import User from "../../data_Persistence/daos/users/usersDaoMongoDb.js";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import generateToken from "../../middleware/jsonWebToken.js";
const users = new User();
import Logger from "../../utils/Log4js.js";
const logger = Logger.loggerCustom;

function createHash(password) {
  return hashSync(password, genSaltSync(10), null);
}

const registerUser = async (req, res) => {
  try {
    const { password, email, name } = req.body;

    const allUsers = await users.getAll();
    let user = allUsers.find((u) => u.email === email);
    if (user) {
      console.log("User already exists");
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = {
      id: allUsers.length + 1,
      password: createHash(password),
      name: name,
      email: email,
    };
    await users.save(newUser);

    const usuario = { name, password };

    const access_token = generateToken(usuario);

    req.headers.authorization = access_token;

    res.json({ success: true, access_token });
  } catch (error) {
    logger.error(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(req.body);

    req.session.user = email;

    const allUsers = await users.getAll();
    let user = allUsers.find((user) => user.email === email);
    if (!user) {
      return res.json({ error: "credenciales invalidas" });
    }

    // Usar bcrypt.compareSync para verificar la contraseña
    const passwordCorrect = compareSync(password, user.password);

    if (!passwordCorrect) {
      return res.json({ error: "credenciales invalidas" });
    }

    const usuario = { email, password };

    const access_token = generateToken(usuario);
    console.log("access_token", access_token);
    req.session.authorization = access_token;

    console.log("req.session.authorization", req.session.authorization);

    const cookies = {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict', // También puedes usar 'Lax' o 'None'
        maxAge: 3600000 // Tiempo de vida de la cookie en milisegundos
      };

    res.cookie("jwt", access_token, cookies);


    // res.cookie("jwt", access_token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "Strict",
    // });

    res.json({ success: true, access_token });
  } catch (error) {
    logger.error(error);
  }
};

export default { registerUser, loginUser };
