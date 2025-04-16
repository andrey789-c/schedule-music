const { Scenes } = require("telegraf");
const { createBooking } = require("../services/bookingService");

const confirmScene = new Scenes.BaseScene("confirmScene");

confirmScene.enter(async (ctx) => {
	const {
		lessonType,
    lessonMode,
		date,
		time,
		subscriptionCount,
		firstName,
		lastName,
		phone,
	} = ctx.session;

	await createBooking({
		// telegram_id: ctx.from.id,
		first_name: firstName,
		last_name: lastName,
		phone: phone,
		lesson_type: lessonType,
    with_teacher: lessonMode === 'with_teacher',
		date,
		time: `${date}T${time}:00`,
		is_subscription: subscriptionCount > 1,
		subscription_type: subscriptionCount,
		// created_at: new Date().toISOString(),
	}).catch((e) => {
    console.log(e)
  })


	ctx.reply(
		`Готово! Вы записаны на ${lessonType} ${date} в ${time}\nФормат: ${subscriptionCount} занятие(й)\nСпасибо!`
	);
  ctx.session = {};
	await ctx.scene.leave();
});

module.exports = { confirmScene };
