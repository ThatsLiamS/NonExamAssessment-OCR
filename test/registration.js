/* eslint-disable no-undef */
const assert = require('assert');

require('dotenv').config();
const firebase = require('firebase-admin');
firebase.initializeApp({
	credential: firebase.credential.cert(JSON.parse(process.env['database']))
});
const firestore = firebase.firestore();

const { log_in, sign_up } = require('./../src/logIn.js');

describe('Registration', () => {


	describe('Log In', () => {

		it('Should return false: false password', async () => assert.equal(
			await log_in({ email: 'test_account@example.com', password: 'Th1s_P@SSW0RD_is_F@K3' }, firestore),
			false
		));

		it('Should return false: false email', async () => assert.equal(
			await log_in({ email: 'this_email@does_not.exist', password: 'Test_2022' }, firestore),
			false
		));

		it('Should return Object: test email & password', async () => assert.equal(
			typeof await log_in({ email: 'test_account@example.com', password: 'Test_2022' }, firestore),
			'object'
		));

	});


	describe('Sign Up', () => {

		it('Should return false: false password', async () => assert.equal(
			await sign_up({
				email: 'test_account@example.com',
				password: 'TH1S_P@SSW0RD_IS_F@LSE',
				'confirm password': 'TH1S_P@SSW0RD_IS_F@LSE',
				'date of birth': '01/01/1970',
				name: 'Test Account'
			}, firestore),
			false
		));

		it('Should return false: false email', async () => assert.equal(
			await sign_up({
				email: 'this_email@does_not.exist',
				password: 'Test_2022',
				'confirm password': 'Test_2022',
				'date of birth': '01/01/1970',
				name: 'Test Account'
			}, firestore),
			false
		));

		it('Should return false: non matching passwords', async () => assert.equal(
			await sign_up({
				email: 'test_account@example.com',
				password: 'Test_2022',
				'confirm password': 'Th1s_P@SSW0RD_is_F@K3',
				'date of birth': '01/01/1970',
				name: 'Test Account'
			}, firestore),
			false
		));

		it('Should return Object: test email & password', async () => assert.equal(
			typeof await sign_up({
				email: 'test_account@example.com',
				password: 'Test_2022',
				'confirm password': 'Test_2022',
				'date of birth': '01/01/1970',
				name: 'Test Account'
			}, firestore),
			'object'
		));

	});


});
