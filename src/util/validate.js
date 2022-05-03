/* contains the regular expressions for data types */
const regex = {
	email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-._]+)$/,
	string: /^[a-zA-Z-_]$/,
	number: /^[0-9]$/,
	password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
};

module.exports = ({ type, value }) => {

	/* Does text meet the expression */
	const expression = regex[type.name];
	if (!expression.test(value)) return false;

	/* Extra validation conditions */
	switch (type.name) {

	case "email":
		if (typeof value !== 'string' || value.length < type.minLength || value.length > type.maxLength) return false;
		break;

	case "string":
		if (typeof value !== 'string' || value.length < type.minLength || value.length > type.maxLength) return false;
		break;

	case "number":
		if (Number(value) == 'NaN') return false;
		break;

	case "password":
		if (typeof value !== 'string' || value.length < 8 || value.length > type.maxLength) return false;
		break;

	}

	return true;
};
