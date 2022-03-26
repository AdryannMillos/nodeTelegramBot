const env = require("./.env");
const Telegraf = require("telegraf");

const bot = new Telegraf(env.token);

bot.start((content) => {
  const from = content.update.message.from;

  console.log(from);

  content.reply(`Hello World, ${from.first_name}.`);
});

bot.on("text", (content, next) => {
  content.reply("Adryann");
  next();
});

bot.startPolling();
