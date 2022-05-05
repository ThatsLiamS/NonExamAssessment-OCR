/* Rolls a 6 sided dice */
const roll = () => Math.floor((Math.random() * 6) + 1);

/* Standard game round */
const rounds = (round, players) => {
	console.log(`\n_Round ${round}_\n`);

	for(const player of players) {
		let total = 0;

		const roll_one = roll();
		const roll_two = roll();

		if (roll_one == roll_two) total += roll();
		total = Number(total) + Number(roll_one) + Number(roll_two);
		player.score = Number(player.score) + total;

		if (player.score % 2 == 0) player.score += 10;
		else player.score -= 5;

		console.log(`${player.name} rolled a ${total}.\nTheir new total is: ${player.score}\n`);
	}
};

/* If it is a draw */
const shootOut = (pone, ptwo) => {

	let [one, two] = [0, 0];
	while (one == two) {
		one = roll();
		two = roll();
	}

	pone.score = Number(pone.score) + one;
	ptwo.score = Number(ptwo.score) + two;

	console.log(`\n_The Showdown!_\n\n${pone.name} rolled a ${one}\n${ptwo.name} rolled a ${two}`);
};

module.exports = {
	rounds,
	shootOut
};
