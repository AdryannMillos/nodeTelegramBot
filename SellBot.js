const env = require("./.env");
const Telegraf = require("telegraf");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");

const session = require("telegraf/session");

const bot = new Telegraf(env.token);

const buttons = (list) =>
  Extra.markup(
    Markup.inlineKeyboard(
      list.map((item) => Markup.callbackButton(item, `delete ${item}`)),
      { columns: 3 }
    )
  );

bot.use(session());

bot.start(async (content) => {
  const name = content.update.message.from.first_name;

  await content.reply(`Olá ${name}! Seja bem vindo(a)`);
  await content.reply(`Digite o que deseja adicionar ao carrinho`);
  content.session.list = [];
});

bot.on("text", async (content) => {
  await content.session.list.push(content.update.message.text);
  await content.reply(
    `Produto ${content.update.message.text} adicionado ao carrinho!`,
    buttons(content.session.list)
  );
});

bot.action(/delete (.+)/, async (content) => {
  content.session.list = content.session.list.filter((item) => item !== content.match[1]);
  await content.reply(`${content.match[1]} removida do carrinho`, buttons( content.session.list));
});

console.log("server running");
bot.startPolling();
