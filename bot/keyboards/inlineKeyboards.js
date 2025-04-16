const { Markup } = require("telegraf");

function generateLessonTypeKeyboard() {
	return Markup.inlineKeyboard([
		[Markup.button.callback("Вокал", "lesson:Вокал")],
		[Markup.button.callback("Фортепиано", "lesson:Фортепиано")],
		[Markup.button.callback("Барабаны", "lesson:Барабаны")],
	]);
}

function generateLessonModeKeyboard() {
  return Markup.inlineKeyboard([
    [Markup.button.callback("С преподавателем", 'with_teacher')],
    [Markup.button.callback("Самостоятельно", 'self_practice')],
  ])
}

module.exports = { generateLessonTypeKeyboard, generateLessonModeKeyboard };
