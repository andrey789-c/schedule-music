const { Telegraf, Scenes, session } = require("telegraf");
const { startScene } = require("./scenes/start.scene.js");
const { typeScene } = require("./scenes/type.scene");
const { dateScene } = require("./scenes/date.scene");
const { timeScene } = require("./scenes/time.scene");
const { subscriptionScene } = require("./scenes/subscription.scene");
const { userInfoScene } = require("./scenes/userinfo.scene");
const { confirmScene } = require("./scenes/confirm.scene");

const stage = new Scenes.Stage([
	startScene,
	typeScene,
	dateScene,
	timeScene,
	subscriptionScene,
	userInfoScene,
	confirmScene,
]);

function startBot() {
	const bot = new Telegraf(process.env.BOT_TOKEN);

	bot.use(session());
	bot.use(stage.middleware());

  bot.command('/start', (ctx) => ctx.scene.enter("startScene"))

	bot.start((ctx) => ctx.scene.enter("startScene"));

	bot.launch();
	console.log("Bot is running...");
}

module.exports = { startBot };
