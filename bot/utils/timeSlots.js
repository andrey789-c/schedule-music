const unavailableHours = {
	0: [12, 13, 14, 15, 16, 17],
	1: [12, 13, 14, 15, 16, 17],
	2: [14, 15, 16, 17, 18, 19],
	3: [14, 15, 16, 17, 18, 19],
	4: [14, 15, 16, 17, 18, 19],
	5: [12, 13, 14, 15, 16, 17],
	6: [12, 13, 14, 15, 16, 17],
};

const WORK_START = 6;
const WORK_END = 23;

async function getAvailableTimeSlots(date, existingBookings = []) {
	const targetDate = new Date(date);
	const dayOfWeek = targetDate.getDay();
	const bookedHours = existingBookings.map((b) => new Date(b.time).getHours());
	const blockedHours = unavailableHours[dayOfWeek] || [];
	const allSlots = [];
	for (let hour = WORK_START; hour <= WORK_END; hour++) {
		if (!blockedHours.includes(hour) && !bookedHours.includes(hour)) {
			allSlots.push(`${String(hour).padStart(2, "0")}:00`);
		}
	}
	return allSlots;
}

module.exports = { getAvailableTimeSlots };
