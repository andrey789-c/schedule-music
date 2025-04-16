const { Scenes, Markup } = require("telegraf");

const subscriptionScene = new Scenes.BaseScene("subscriptionScene");

subscriptionScene.enter((ctx) => {
	ctx.reply(
		"Выбери тип оплаты:",
		Markup.inlineKeyboard([
			[Markup.button.callback("Разовое — 1500₽", "pay:1")],
			[Markup.button.callback("5 занятий — 7000₽", "pay:5")],
			[Markup.button.callback("8 занятий — 10 000₽", "pay:8")],
			[Markup.button.callback("10 занятий — 13 000₽", "pay:10")],
		])
	);
});

subscriptionScene.on("callback_query", async (ctx) => {
	const count = ctx.callbackQuery.data.split(":")[1];
	ctx.session.subscriptionCount = count;
	await ctx.answerCbQuery();
	await ctx.scene.enter("userInfoScene");
});

module.exports = { subscriptionScene };
