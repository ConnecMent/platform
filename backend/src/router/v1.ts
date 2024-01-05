import { Router } from "express";
import { dataSource } from "../data-source";
import { User } from "../db/entities/user";
import { Transaction } from "../db/entities/transaction";
import { hash, compare } from "bcrypt";

export const encryptPassword = async (rawPassword: string) => {
  return hash(rawPassword, 10);
};
const router = Router();
const userRepository = dataSource.getRepository(User);
const txRepository = dataSource.getRepository(Transaction);

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const encPass = await encryptPassword(password);
  const user = await userRepository.findOne({ where: { username: username } });
  console.log(`User found: ${user}`);
  if (!user) {
    res.status(403).send();
    return;
  } else if (user.password) {
    if (await compare(password, user.password))
      res.status(200).send({ token: user.token });
    res.status(403).send();
  } else {
    const token = await hash(username + Date.now() + encPass, 10);
    await userRepository.update(
      { username: username },
      { token, password: encPass }
    );
    res.status(200).send({ token: token });
  }
});

router.post("/transfer", async (req, res) => {
  const { username, token, from, to, amount } = req.body;
  const user = await userRepository.findOne({
    where: { username: username, token: token },
  });
  if (!user) {
    res.status(403).send();
    return;
  }
  if (user.isAdmin || user.username == from) {
    const fromUser = await userRepository.findOne({
      where: { username: from },
    });
    const toUser = await userRepository.findOne({ where: { username: to } });
    console.log(
      `Transfer request from ${fromUser?.username} with balance ${fromUser?.balance}, to ${toUser?.username} with balance ${toUser?.balance}`
    );
    if (fromUser && toUser && fromUser.balance > amount) {
      fromUser.balance -= amount;
      toUser.balance += amount;
      await userRepository.save([fromUser, toUser]);
      res.status(200).send();
    }
    res.status(400).send();
  } else{
    res.status(403).send()
  }
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
