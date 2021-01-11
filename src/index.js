const express = require("express");
const app = express();

require("dotenv").config();

const auth = require("./routes/auth");
const game = require("./routes/game");
const event = require("./routes/event");
const hint = require("./routes/hint");
const sliderHint = require("./routes/sliderHint");

const isAuth = require("./middlewares/auth");

app.use(express.json());

app.use("/auth", auth);
app.use("/game", isAuth, game);
app.use("/event", isAuth, event);
app.use("/hint", isAuth, hint);
app.use("/sliderhint", isAuth, sliderHint);

app.listen(process.env.PORT);
