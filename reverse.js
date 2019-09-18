const util = require("util");

const INPUT = process.argv[2];

try {
	const parsed = JSON.parse(INPUT);
	const result = reverse(parsed);

	console.log(JSON.stringify(result));
} catch(error)  {
	console.error("Malformed JSON");
}

function reverseString(str) {
	return str.split("").reverse().join("");
}

/*
From the test description it was not exactly clear how you
would like object values to be handled.

The issue comes when you have a nested object. How
do you swap the key and value when the value is an object
and it has to just be a string? You could maintain
the structure and not swap when you encounter an object
and just swap the values in the object.

I opted for the different approach of taking the object
and making an actual key out of it by stringifying it
and recursively applying the reverse function as if
it was just a normal string.

This has the side effect of flattening the structure
completely since all nested objects enentually
become keys. I felt like this solution more accurately
followed what was asked of me.
*/
function reverse(object) {
	const result = {};

	for(const [key, value] of Object.entries(object)) {
		let stringKey = value;

		if (value === null) {
			stringKey = "null";
		} else if (!Array.isArray(value) && typeof value === "object") {
			stringKey = JSON.stringify(reverse(value));
		}

		result[stringKey.toString()] = reverseString(key);
	}

	return result;
}