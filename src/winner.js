/* Displays the winner of the game */
const displayWinner = (pone, ptwo) => {

	const winner = pone.score > ptwo.score ? pone : ptwo;
	winner.games_won = Number(winner.games_won) + 1;

	console.log('\n\nThe winner is ' + winner.name + ' with a score of ' + winner.score);
};


/* Custom ID generator */
const generator = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

/* Save the stats to the database */
const saveData = async (pone, ptwo, firestore) => {

	/* Save the game data */
	const game = {
		id: `${generator()}-${generator()}-${generator()}`,
		date: new Date(),

		player_one: { id: pone.id, score: pone.score },
		player_two: { id: ptwo.id, score: ptwo.score }
	};
	await firestore.doc(`/games/${game.id}/`).set(game);

	/* Save player_one score */
	pone.games_played = Number(pone.games_played) + 1;
	pone.score = 0;
	await firestore.doc(`/players/${pone.id}/`).set(pone);

	/* Save player_one score */
	ptwo.games_played = Number(ptwo.games_played) + 1;
	ptwo.score = 0;
	await firestore.doc(`/players/${ptwo.id}/`).set(ptwo);

};

module.exports = {
	displayWinner,
	saveData,
	generator
};
