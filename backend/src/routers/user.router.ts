import { Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import asynceHandler from 'express-async-handler'
import { UserModel } from "../Models/user.model";
const router = Router();


router.get(
  "/seed",
  asynceHandler(async (req, res) => {
    const usersCount = await UserModel.countDocuments();
    if(usersCount>0){
      res.send("Seed is already done !")
      return;
    }
    await UserModel.create(sample_users);
    res.send("Seed is done ! ")
  })
);

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = sample_users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      res.send(generateTokenResponse(user));
    }else{
      res.status(400).send("user or mdp not valid ! ")
    }
  });
  
  const generateTokenResponse = (user: any) => {
    const token = jwt.sign(
      {
        email: user.email,
        isAdmin: user.isAdmin,
      },
      "someRandomtext",
      { expiresIn: "30d" }
    );
    user.token = token;
    return user;
  };

  export default router;