/* eslint-disable no-undef */
const assert = require('assert');

const { validate } = require('./../src/util/validate.js');

describe('Validation', () => {

	describe('Email', () => {
		it('Should return false: me_liamskinner.co.uk', () => assert.equal(
			validate({ value: 'me_liamskinner.co.uk', type: { name: 'email', minLength: 5, maxLength: 50 } }),
			false
		));
		it('Should return false: me@liamskinner', () => assert.equal(
			validate({ value: 'me@liamskinner', type: { name: 'email', minLength: 5, maxLength: 50 } }),
			false
		));
		it('Should return true: me@liamskinner.co.uk', () => assert.equal(
			validate({ value: 'me@liamskinner.co.uk', type: { name: 'email', minLength: 5, maxLength: 50 } }),
			true
		));
	});

	describe('Name', () => {
		it('Should return false: Michael2020', () => assert.equal(
			validate({ value: 'Michael2020', type: { name: 'string', minLength: 3, maxLength: 25 } }),
			false
		));
		it('Should return false: <no response>', () => assert.equal(
			validate({ value: '', type: { name: 'string', minLength: 3, maxLength: 25 } }),
			false
		));
		it('Should return true: Liam', () => assert.equal(
			validate({ value: 'Liam', type: { name: 'string', minLength: 3, maxLength: 25 } }),
			true
		));
	});

	describe('Number', () => {
		it('Should return false: <no response>', () => assert.equal(
			validate({ value: '', type: { name: 'number' } }),
			false
		));
		it('Should return false: fifteen', () => assert.equal(
			validate({ value: 'fifteen', type: { name: 'number' } }),
			false
		));
		it('Should return true: 15', () => assert.equal(
			validate({ value: '15', type: { name: 'number' } }),
			true
		));
	});

	describe('Password', () => {
		it('Should return false: <no response>', () => assert.equal(
			validate({ value: '', type: { name: 'password', maxLength: 25 } }),
			false
		));
		it('Should return false: helloworld', () => assert.equal(
			validate({ value: 'helloworld7', type: { name: 'password', maxLength: 25 } }),
			false
		));
		it('Should return false: Hello_World', () => assert.equal(
			validate({ value: '', type: { name: 'password', maxLength: 25 } }),
			false
		));
		it('Should return true: H3lloWor1d', () => assert.equal(
			validate({ value: 'H3lloWor1d', type: { name: 'password', maxLength: 25 } }),
			true
		));
	});

});
