// scenes/start.scene.js
const { Scenes } = require('telegraf');
const { generateLessonTypeKeyboard } = require('../keyboards/inlineKeyboards');

const startScene = new Scenes.BaseScene('startScene');

startScene.enter((ctx) => {
  ctx.reply('Привет! Выбери тип занятия:', generateLessonTypeKeyboard());

  
});

startScene.on('callback_query', async (ctx) => {
  const lessonType = ctx.callbackQuery.data.split(':')[1];
  ctx.session.lessonType = lessonType;
  await ctx.answerCbQuery();
  await ctx.scene.enter('typeScene');
});

module.exports = { startScene };
