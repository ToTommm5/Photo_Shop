import { Router } from "express";
import asynceHandler from "express-async-handler";
import path from "path";
import { sample_photos } from "../data";
import { PhotoModel } from "../Models/photo.model";

const router = Router();
const photosDir = path.resolve(__dirname, "../public/photos");

router.get(
  "/seed",
  asynceHandler(async (req, res) => {
    const photosCount = await PhotoModel.countDocuments();
    if (photosCount > 0) {
      res.send("Seed is already done !");
      return;
    }
    await PhotoModel.create(sample_photos);
    res.send("Seed is done ! ");
  })
);
// Charger les données depuis le fichier de photos et créer les data dans data.ts
router.get("/", (req, res) => {
  const photos = sample_photos;
  res.send(photos);
});

router.get("/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const photos = sample_photos.filter((photo) =>
    photo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(photos);
});

export default router;
