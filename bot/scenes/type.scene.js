// scenes/type.scene.js
const { Scenes } = require("telegraf");
const {
	generateLessonModeKeyboard,
	generateLessonTypeKeyboard,
} = require("../keyboards/inlineKeyboards");

const typeScene = new Scenes.BaseScene("typeScene");

typeScene.enter((ctx) => {
	ctx.reply(
		"Ты хочешь заниматься с преподавателем или самостоятельно?",
		generateLessonModeKeyboard()
	);
});

typeScene.on("callback_query", async (ctx) => {
	const data = ctx.callbackQuery.data;

  if(data !== "with_teacher") {
    ctx.session.subscriptionCount = 1
  }


	ctx.session.lessonMode = data;
	await ctx.answerCbQuery();
	return ctx.scene.enter("dateScene");
});

module.exports = { typeScene };
