/* contains the regular expressions for data types */
const regex = {
	email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-._]+)$/,
	string: /^[a-zA-Z-_]$/,
	number: /^[0-9]$/,
	alphanumeric: /^[a-zA-Z0-9]$/
};

module.exports = ({ type, text }) => {

	/* Does text meet the expression */
	const expression = regex[type.name];
	if (!text.test(expression)) return false;

	/* Extra validation conditions */
	switch (type.name) {

	case "email":
		if (typeof text !== String || text.length < 5 || text.length > 50) return false;
		break;

	case "string":
		if (typeof text !== String || text.length < 5 || text.length > 25) return false;
		break;

	case "number":
		if (Number(text) == 'NaN') return false;
		break;

	case "alphanumeric":
		if (typeof text !== String || text.length < 5 || text.length > 2) return false;
		break;

	}

	return true;
};
