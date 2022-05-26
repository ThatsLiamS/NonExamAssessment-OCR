const { createHash } = require('crypto');

const hash = (variable) => {
	const md5 = createHash('md5');
	const hashedValue = md5.update(variable).digest('hex');
	return hashedValue;
};

module.exports = hash;