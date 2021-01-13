const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

const auth = require("./routes/auth");
const game = require("./routes/game");
const event = require("./routes/event");
const hint = require("./routes/hint");
const public = require("./routes/public");
const sliderHint = require("./routes/sliderHint");
const valid = require("./routes/valid");

const isAuth = require("./middlewares/auth");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", auth);
app.use("/game", isAuth, game);
app.use("/event", isAuth, event);
app.use("/hint", isAuth, hint);
app.use("/public", public);
app.use("/sliderhint", isAuth, sliderHint);
app.use("/valid", isAuth, valid);

app.listen(process.env.PORT);
