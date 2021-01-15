const express = require("express");
const cors = require("cors");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

require("dotenv").config();

const auth = require("./routes/auth");
const game = require("./routes/game");
const event = require("./routes/event");
const hint = require("./routes/hint");
const public = require("./routes/public");
const sliderHint = require("./routes/sliderHint");
const valid = require("./routes/valid");

const { Timer, Event, Game, Hint, SliderHint } = require("./db");
const { isAuth, isAuthSock } = require("./middlewares/auth");

let timer;

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

io.on("connection", async (socket) => {
  socket.emit("RES_SEND_TIMER", timer);
  socket.on("START_TIMER", (data) => isAuthSock(socket, data, cb));
  socket.on("DELETE_TIMER", (data) => isAuthSock(socket, data, cb));
  setInterval(async () => {
    let event = await Event.findOne({
      where: { isVisible: true, isValid: false },
      include: [Game, Hint, SliderHint],
    });
    if (event) {
      if (event.timestamp * 1000 < Date.now() * 1000) {
        event.update({ isValid: true });
        if (event.Game.isVisible) {
          if (event.Hint) {
            event.Hint.foreach((hint) => {
              hint.update({ isVisible: true });
            });
          }
          if (event.SliderHint) {
            event.SliderHint.foreach((slh) => {
              slh.update({ isVisible: true });
            });
          }
          console.log("OUI");
          io.emit("RES_NEW_EVENT", "ok");
        }
      }
    }
  }, 1000);
});

http.listen(process.env.PORT, async () => {
  let [time] = await Timer.findOrCreate({
    where: { id: 1 },
    defaults: { date: null },
  });
  timer = time;
});
