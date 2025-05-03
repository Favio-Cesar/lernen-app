require("dotenv").config({ path: __dirname + "/../.env" }); // <-- esto asegura que lo encuentre desde cualquier ruta

const { exec } = require("child_process");

const userProfile = process.env.USERPROFILE;

if (!userProfile) {
  console.error("USERPROFILE no está definido. Abortando...");
  process.exit(1);
}

exec(
  `ollama serve`,
  {
    env: {
      ...process.env,
      USERPROFILE: userProfile, // asegurar que esté definido
    },
  },
  (err, stdout, stderr) => {
    if (err) {
      console.error("Error al iniciar Ollama:", err);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  }
);
