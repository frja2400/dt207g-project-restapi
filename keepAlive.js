require("dotenv").config();
const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Pinged MongoDB — keeping it alive!");
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

main();