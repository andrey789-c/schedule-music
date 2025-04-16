const { Scenes } = require("telegraf");
const { getBookingsForDate } = require("../services/bookingService");
const { getAvailableTimeSlots } = require("../utils/timeSlots");
const { Markup } = require("telegraf");

const timeScene = new Scenes.BaseScene("timeScene");

timeScene.enter(async (ctx) => {
	const date = ctx.session.date;
	const bookings = await getBookingsForDate(date); 
	const slots = await getAvailableTimeSlots(date, bookings);

	if (slots.length === 0) {
		await ctx.reply("На эту дату нет доступных времён. Введите другую дату.");
		return ctx.scene.enter("dateScene");
	}

	const keyboard = Markup.inlineKeyboard(
		slots.map((time) => [Markup.button.callback(time, `time:${time}`)])
	);
	ctx.reply("Выбери время:", keyboard);
});

timeScene.on("callback_query", async (ctx) => {
	const time = ctx.callbackQuery.data.split(":")[1];
	ctx.session.time = time;
	await ctx.answerCbQuery();


  if(ctx.session.lessonMode === 'with_teacher') {
    await ctx.scene.enter("subscriptionScene");
  } else {
    await ctx.scene.enter("userInfoScene");
  }
	
});

module.exports = { timeScene };
