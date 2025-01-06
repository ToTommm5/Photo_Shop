import { Request, Response, Router } from "express";
import asynceHandler from "express-async-handler";
import fs from "fs";
import multer from "multer";
import path from "path";
import { PhotoModel } from "../Models/photo.model";
import data from "../data.json";

const router = Router();
const photosDir = path.join(__dirname, "../../public/photos");
const dataPath = "/Users/tom/Desktop/VSCode/Photo_Shop/backend/src/data.json";
const photos = data.photos;

router.get(
  "/seed",
  asynceHandler(async (req, res) => {
    const photosCount = await PhotoModel.countDocuments();
    if (photosCount > 0) {
      res.send("Seed is already done !");
      return;
    }
    await PhotoModel.create(photos);
    res.send("Seed is done ! ");
  })
);

// Charger les données de data.ts
router.get("/", (req, res) => {
  res.send(photos);
});

// charger les photos recherchées dans la barre de recherche
router.get("/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const photosfilter = photos.filter((photo) =>
    photo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(photosfilter);
});

//configuration de multer pour upload les photos
const stockage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, photosDir);
  },
  filename: (req, file, callback) => {
    const uniqueName = file.originalname.replace(/\s+/g, "_");
    callback(null, uniqueName);
  },
});

//Création de l'instance de multer
const upload = multer({ storage: stockage });

router.post(
  "/upload",
  upload.single("photo"),
  (req: Request, res: Response): void => {
    console.log(photosDir);
    console.log(dataPath);

    if (!req.file) {
      res.status(400).send("Pas de fichier téléchargé !");
      return;
    }

    const newPhoto = {
      id: Date.now(),
      name: req.body.name || "NoName Photo",
      size: "4*5",
      favorite: false,
      imgUrl: "/photos/" + req.file.filename,
      price: 8,
    };
    //lecture du fichier data
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        res.status(500).send("Erreur de lecture du fichier !");
        return;
      }

      let photos = JSON.parse(data); // Parse les données JSON
      photos.push(newPhoto); // Ajout de la photo au tableau.

      // Ecrire les données dans data.ts
      const updatedData = JSON.stringify(photos, null, 2);
      fs.writeFile(dataPath, updatedData, (err) => {
        if (err) {
          res.status(500).send("Erreur lors de l'écriture du fichier ! ");
          return;
        }

        res
          .status(200)
          .send("Photo téléchargée et données ajoutées avec succès !");
      });
    });
  }
);

export default router;
