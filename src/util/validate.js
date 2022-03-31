/* contains the regular expressions for data types */
const regex = {
	email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-._]+)$/,
	string: /^[a-zA-Z-_]$/,
	number: /^[0-9]$/,
	alphanumeric: /^[a-zA-Z0-9]$/
};

module.exports = ({ type, text: value }) => {

	/* Does text meet the expression */
	const expression = regex[type.name];
	if (!value.test(expression)) return false;

	/* Extra validation conditions */
	switch (type.name) {

	case "email":
		if (typeof value !== String || value.length < type.minLength || value.length > type.maxLength) return false;
		break;

	case "string":
		if (typeof value !== String || value.length < type.minLength || value.length > type.maxLength) return false;
		break;

	case "number":
		if (Number(value) == 'NaN') return false;
		break;

	case "alphanumeric":
		if (typeof value !== String || value.length < type.minLength || value.length > type.maxLength) return false;
		break;

	}

	return true;
};
