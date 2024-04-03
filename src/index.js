import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import fs from "fs"
import {
  tweetsBaseURI,
  authBaseURI,
  rolesBaseURI,
  usersBaseURI,
} from "./config/paths.js";

import {
  tweetRouter,
  authRouter,
  roleRouter,
  userRouter,
} from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: ["*"]
};
dotenv.config();

const dataSourceFile = "assets/initial-data.json";
const newDataSourceFile = "assets/data.json";

const isDataExist = fs.existsSync(newDataSourceFile)

if (isDataExist) {
  console.log("le fichier de donnée existe");
} else {
  fs.readFile(dataSourceFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Une erreur est survenue lors de la lecture du fichier:', err);
      return;
    }
    
    fs.writeFile(newDataSourceFile, data, (err) => {
      if (err) {
        console.error('Une erreur est survenue lors de la création du nouveau fichier:', err);
        return;
      }
  
      console.log('Le contenu a été copié avec succès dans le nouveau fichier.');
    });
  });
}

// Config
app.use(json());
app.use(cors());
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// Routes
app.use(authBaseURI, authRouter);
app.use(rolesBaseURI, roleRouter);
app.use(usersBaseURI, userRouter);
app.use(tweetsBaseURI, tweetRouter);

app.listen(PORT, () => {
  console.log(`The server listens on http://localhost:${PORT}`);
});
