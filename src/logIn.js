/* Import packages and files */
const inquirer = require('inquirer');
const { validate } = require('./util/validate.js');
const defaultData = require('./util/database.json');


/* Custom ID generator */
const generator = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);


/* LogIn system */
const log_in = async (answers, firestore) => {

	/* validate user input, returns boolean */
	const email = validate({ value: answers['email'], type: { name: 'email', minLength: 5, maxLength: 50 } });
	const password = validate({ value: answers['password'], type: { name: 'password', maxLength: 25 } });

	if (email == false || password == false) {
		return false;
	}

	/* Does the user account exist */
	let found = false;
	const players = await firestore.collection('players').get();
	players.forEach(async doc => {
		/* If the login data matches, return user object */
		if (doc.data().email == answers['email'] && doc.data().password == answers['password']) found = doc.data();
	});

	/* returns userData or boolean*/
	return found;
};

const basicQuestions = async (firestore) => {

	/* Get the user input */
	const answers = await inquirer.prompt([
		{ name: 'email', type: 'input' }, { name: 'password', type: 'password' }
	]);

	/* Log In */
	const userData = await log_in(answers, firestore);
	if (!userData || userData == false) {
		console.log('Invalid email or password. Please try again:\n');
		return await basicQuestions(firestore);
	}

	/* Return userData */
	return userData;
};


/* SignUp system */
const sign_up = async (answers, firestore) => {

	/* validate user input, returns boolean */
	const email = validate({ value: answers['email'], type: { name: 'email', minLength: 5, maxLength: 50 } });
	if (!email) {
		return false;
	}

	const password1 = validate({ value: answers['password'], type: { name: 'password', maxLength: 25 } });
	const password2 = validate({ value: answers['confirm password'], type: { name: 'password', maxLength: 25 } });
	if (!password1 || !password2 || answers['password'] != answers['confirm password']) {
		return false;
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
};

const extensiveQuestions = async (firestore) => {

	/* Get the user input */
	const answers = await inquirer.prompt([
		{ name: 'name', type: 'input' }, { name: 'date of birth', type: 'input' },
		{ name: 'email', type: 'input' },
		{ name: 'password', type: 'password' }, { name: 'confirm password', type: 'password' }
	]);

	/* Sign up */
	const userData = await sign_up(answers, firestore);
	if (!userData || userData == false) {
		console.log('Invalid email or password. Please try again:\n');
		return await extensiveQuestions(firestore);
	}

	/* Return userData */
	return userData;
};


module.exports = {
	logIn: basicQuestions,
	signUp: extensiveQuestions,
	log_in,
	sign_up,
	generator
};
