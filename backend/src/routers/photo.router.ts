import { Router } from "express";
import { sample_photos } from "../data";
import asynceHandler from "express-async-handler";
import { PhotoModel } from "../Models/photo.model";

const router = Router();

router.get(
  "/seed",
  asynceHandler(async (req, res) => {
    const photosCount = await PhotoModel.countDocuments();
    if(photosCount>0){
      res.send("Seed is already done !")
      return;
    }
    await PhotoModel.create(sample_photos);
    res.send("Seed is done ! ")
  })
);

router.get("/", (req, res) => {
  res.send(sample_photos);
});

router.get("/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const photos = sample_photos.filter((photo) =>
    photo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(photos);
});

export default router;
