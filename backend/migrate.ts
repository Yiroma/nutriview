import dotenv from "dotenv";
import fs from "fs";
import mysql from "mysql2/promise";
import path from "path";

dotenv.config();

const migrate = async () => {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  try {
    // Première connexion sans base de données
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true,
    });

    // Suppression et création de la base de données
    console.log("Suppression de l'ancienne base de données...");
    await connection.query(`DROP DATABASE IF EXISTS ${DB_NAME}`);

    console.log("Création de la nouvelle base de données...");
    await connection.query(`CREATE DATABASE ${DB_NAME}`);
    await connection.query(`USE ${DB_NAME}`);

    // Lecture et exécution du fichier de structure
    console.log("Création des tables...");
    const structureSQL = fs.readFileSync(path.join(__dirname, "database.sql"), "utf8");
    await connection.query(structureSQL);

    // Lecture et exécution du fichier de seeds
    console.log("Insertion des données...");
    const seedsSQL = fs.readFileSync(path.join(__dirname, "src", "database", "seeds.sql"), "utf8");
    await connection.query(seedsSQL);

    await connection.end();
    console.log("Migration réussie !");
  } catch (error) {
    console.error("Erreur lors de la migration :");
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    process.exit(1);
  }
};

migrate();
