const { Scenes } = require("telegraf");
const dateScene = new Scenes.BaseScene("dateScene");

dateScene.enter((ctx) => {
	ctx.reply("Введите дату", generateNext7DaysKeyboard());
});

dateScene.on("callback_query", async (ctx) => {
	const date = ctx.callbackQuery.data.split(":")[1];
	ctx.session.date = date;

	await ctx.answerCbQuery();
	await ctx.scene.enter("timeScene");
});

function generateNext7DaysKeyboard() {
	const buttons = [];
	const now = new Date();

	for (let i = 0; i < 7; i++) {
		const futureDate = new Date(now);
		futureDate.setDate(now.getDate() + i);

		const yyyy = futureDate.getFullYear();
		const mm = String(futureDate.getMonth() + 1).padStart(2, "0");
		const dd = String(futureDate.getDate()).padStart(2, "0");
		const dateFormatted = `${yyyy}-${mm}-${dd}`;

		const daysOfWeek = [
			"Воскресенье",
			"Понедельник",
			"Вторник",
			"Среда",
			"Четверг",
			"Пятница",
			"Суббота",
		];
		const label = `${daysOfWeek[futureDate.getDay()]}, ${dd}.${mm}`;

		buttons.push([
			{
				text: label,
				callback_data: `date:${dateFormatted}`,
			},
		]);
	}

	return {
		reply_markup: {
			inline_keyboard: buttons,
		},
	};
}

module.exports = { dateScene };
