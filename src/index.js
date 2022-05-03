/* Import required modules */
require('dotenv').config();
const inquirer = require('inquirer');
const firebase = require('firebase-admin');

/* Import required Files */
const { logIn, signUp } = require('./util/logIn.js');
const { rounds, shootOut } = require('./util/play.js');
const { displayWinner, saveData } = require('./util/winner.js');

/* Establish connection to the database */
firebase.initializeApp({
	credential: firebase.credential.cert(JSON.parse(process.env['database']))
});
const firestore = firebase.firestore();


/* Manages the menu and response */
const menu = async () => {

	/* Send the game menu */
	const option = await inquirer
		.prompt([
			{ name: 'option', type: 'list', choices: [
				{ name: 'Display the rules', value: 'rules', short: 'Display Rules!' },
				{ name: 'Sign up', value: 'signup', short: 'Sign Up!' },
				{ name: 'Play game', value: 'play', short: 'Play Game!' },
			]},
		])
		.then((answers) => answers['option']);

	switch (option) {

		case "rules":
			console.log(`
- The points rolled on each player\'s dice are added to their score.
- If the total is an even number, an additional 10 points are added to their score.
- If the total is an odd number, 5 points are subtracted from their score.
- If they roll a double, they get to roll one extra die and get the number of points rolled added to their score.
- The score of a player cannot go below 0 at any point.
- The person with the highest score at the end of the 5 rounds wins.
- If both players have the same score at the end of the 5 rounds, they each roll 1 die and whoever gets the highest score wins (this repeats until someone wins).
			`);
			return false;
	
		case "signup":
			const { name } = await signUp(firestore);
			console.log(name + ' has successfully signed up.\n')
			return false;

		case "play":
			return true;
		}
};


/* Game Code */
(async () => {

	/* Welcome & Starting message */
	console.clear();
	console.log('\nWelcome to Dice Dice Revolution!\n');

	while (true) {
		const gameTime = await menu();
		if (gameTime == true) break;
	}

	/* Start the game! */
	console.log('\nPlayer One sign in')
	const player_one = await logIn(firestore);
	console.log(player_one.name + ' has logged in.');
	
	console.log('\nPlayer Two sign in');
	const player_two = await logIn(firestore);
	console.log(player_two.name + ' has logged in.');


	/* Play 5 rounds */
	setTimeout(() => rounds(1, [player_one, player_two]), 2500);
	setTimeout(() => rounds(2, [player_one, player_two]), 5000);
	setTimeout(() => rounds(3, [player_one, player_two]), 7500);
	setTimeout(() => rounds(4, [player_one, player_two]), 10_000);
	setTimeout(() => rounds(5, [player_one, player_two]), 12_500);

	setTimeout(async () => {

		/* If it is a draw */
		if (player_one.score == player_two.score) await shootOut(player_one, player_two);

		/* Game over, who won? */
		displayWinner(player_one, player_two);
		await saveData(player_one, player_two, firestore);
	}, 15_000);

})();
