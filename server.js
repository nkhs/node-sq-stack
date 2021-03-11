const express = require("express");
const productRouter = require("./routers/productRouter");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Запрос на таблицу с продуктами
app.use("/shop", productRouter);

app.listen(PORT, () => console.log("Server is working ... "));