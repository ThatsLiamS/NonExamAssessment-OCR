/* Import packages and files */
const inquirer = require('inquirer');
const validate = require('./validate.js');
const defaultData = require('./../database.json');


/* Allows the user to log in and return user object */
const logIn = async (firestore) => {

	return await inquirer
		.prompt([{ name: 'email', type: 'input' }, { name: 'password', type: 'password' }])
		.then(async (answers) => {

			/* validate user input, returns boolean */
			const email = validate({ value: answers['email'], type: { name: 'email', minLength: 5, maxLength: 50 } });
			const password = validate({ value: answers['password'], type: { name: 'password', maxLength: 25 } });

			if (email == false || password == false) {
				console.log('Invalid email or password. Try again!\n');
				return await logIn(firestore);
			}

			/* Searches the database for the user's account */
			let found = false;
			const players = await firestore.collection('players').get();
			players.forEach(async doc => {

				/* If the login data matches, return user object */
				if (doc.data().email == answers['email'] && doc.data().password == answers['password']) found = doc.data();

			});

			if (!found) {
				console.log('Invalid email or password. Try again!\n');
				return await logIn(firestore);
			}

			/* returns userData */
			return found;

		});

};


/* Custom ID generator */
const generator = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

/* Signs a user up to the program */
const signUp = async (firestore) => {

	return await inquirer
		.prompt([
			{ name: 'name', type: 'input' },
			{ name: 'date of birth', type: 'input' },

			{ name: 'email', type: 'input' },

			{ name: 'password', type: 'password' },
			{ name: 'confirm password', type: 'password' }
		])
		.then(async (answers) => {

			/* validate user input, returns boolean */
			const email = validate({ value: answers['email'], type: { name: 'email', minLength: 5, maxLength: 50 } });
			if (!email) {
				console.log('Invalid email provided. Try again!');
				return await signUp(firestore);
			}

			const password1 = validate({ value: answers['password'], type: { name: 'password', maxLength: 25 } });
			const password2 = validate({ value: answers['confirm password'], type: { name: 'password', maxLength: 25 } });
			if (!password1 || !password2 || answers['password'] != answers['confirm password']) {
				console.log('Invalid password provided. Try again!');
				return await signUp(firestore);
			}

			/* Set the data */
			const userData = defaultData.player;
			userData.id = `${generator()}-${generator()}-${generator()}`;
			userData.name = answers['name'];
			userData.dob = answers['date of birth'];

			userData.email = answers['email'];
			userData.password = answers['password'];

			await firestore.doc(`/players/${userData.id}/`).set(userData);

			/* Return userData */
			return userData;
		});
};

module.exports = {
	logIn,
	signUp,
};
