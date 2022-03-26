"use strict";

const Telegram = require("telegram-node-bot");
const TelegramBaseController = Telegram.TelegramBaseController;
const TextCommand = Telegram.TextCommand;
const chatbot = new Telegram.Telegram(
  ""
);

class EventsController extends TelegramBaseController {
  allEventsAction(scope) {
    let msg = `QConSP - 24-25-26/04/2017 - qconsp.com\nFrontInSampa - 01/07/2017 - frontinsampa.com.br`;
    scope.sendMessage(msg);
  }
  get routes() {
    return {
      command1: "allEventsAction",
      start: "startEventsAction",
    };
  }
}

class StartController extends TelegramBaseController {
    startEventsAction(scope) {
        const name = scope._update._message._from._firstName
        const text = scope._update._message._text

        let msg = `Olá ${name}! Seja bem vindo(a)`;
        console.log(text);
        scope.sendMessage(msg);
        new idController();
      }
    get routes() {
      return {
        start: "startEventsAction"
      };
    }
  }

class idController extends TelegramBaseController {
    idEventsAction(scope) {
        const text = scope._update._message._text

        let msg = `Olá ${id}! Seja bem vindo(a)`;
        console.log(text);
        scope.sendMessage(msg);
      }
    get routes() {
      return {
        start: "idEventsAction"
      };
    }
  }


chatbot.router
  .when(new TextCommand("/command1", "command1"), new EventsController())
  .when(new TextCommand("/start", "start"), new StartController())
