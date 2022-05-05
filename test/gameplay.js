/* eslint-disable no-undef */
const assert = require('assert');

const { shootout_rollDice, roll } = require('./../src/play.js');

describe('Game Play', () => {


	describe('Winners\'s shootout', () => {

		it('Should return false: non-draw result', async () => assert.equal(
			await shootout_rollDice({ score: 15 }, { score: 10 }).then((a) => a[0] == a[1]),
			false
		));

		it('Should return false: end results are the same', async () => assert.equal(
			await shootout_rollDice({ score: 10 }, { score: 10 }).then((a) => a[0] == a[1]),
			false
		));

		it('Should return object: standard draw', async () => assert.equal(
			typeof await shootout_rollDice({ score: 10 }, { score: 10 }),
			'object'
		));

	});


	describe('Dice Roll', () => {

		it('Should return false: non-draw result', () => assert.equal(
			typeof roll(),
			'number'
		));

		it('Should return true: roll is between 1 and 6', () => assert.equal(
			roll() < 6 && roll() > 0,
			true
		));


	});


});
