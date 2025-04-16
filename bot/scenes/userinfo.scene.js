const { Scenes } = require("telegraf");

const userInfoScene = new Scenes.BaseScene("userInfoScene");

userInfoScene.enter((ctx) => {
	ctx.reply("Введите ваше имя:");
});

userInfoScene.on("text", async (ctx) => {
	if (!ctx.session.firstName) {
		ctx.session.firstName = ctx.message.text;
		return ctx.reply("Теперь фамилию:");
	}
	if (!ctx.session.lastName) {
		ctx.session.lastName = ctx.message.text;
		return ctx.reply("И номер телефона:");
	}
	if (!ctx.session.phone) {

		ctx.session.phone = ctx.message.text;
		await ctx.scene.enter("confirmScene");
	}
});

module.exports = { userInfoScene };
