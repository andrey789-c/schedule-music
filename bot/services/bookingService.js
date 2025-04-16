const { supabase } = require("../db/supabaseClient");

async function getBookingsForDate(date) {
	const { data, error } = await supabase
		.from("bookings")
		.select("*")
		.eq("date", date);
	if (error) throw error;
	return data;
}

async function createBooking(booking) {
	const { data, error } = await supabase.from("bookings").insert([booking]);
	if (error) throw error;
	return data;
}

module.exports = { getBookingsForDate, createBooking };
