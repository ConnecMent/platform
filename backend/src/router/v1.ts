import { Router } from "express";
import { dataSource } from "../data-source";
import { User } from "../db/entities/user";
import { Transaction } from "../db/entities/transaction";
import { hash, compare } from "bcrypt";


export const encryptPassword = async (rawPassword: string) => {
  return hash(rawPassword, 10);
};
const router = Router();
const userRepository = dataSource.getRepository(User)
const txRepository = dataSource.getRepository(Transaction)

router.post("/login", async (req, res) => {
  const {username, password} = req.body
  const encPass = await encryptPassword(password)
  const user = await userRepository.findOne({where: {username: username}})
  console.log(`User found: ${user}`)
  if(!user) {
    res.status(403).send()
  }
  else if(user!.password) {
    if(await compare(password, user!.password)) res.status(200).send({token: user!.token})
    res.status(403).send()
  } else {
    const token = await hash(username + Date.now() + encPass, 10)
    await userRepository.update({username: username}, {token, password: encPass})
    res.status(200).send({token: token})
  }
});

router.post("/transfer", (req, res) => {
  throw new Error("no implemented");
});
router.get("/transactions", (req, res) => {
  throw new Error("no implemented");
});
router.get("/balances", (req, res) => {
  throw new Error("no implemented");
});
router.post("/info", (req, res) => {
  throw new Error("no implemented");
});

export default router;
