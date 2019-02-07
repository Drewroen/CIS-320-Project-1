/*
 This is a quick primer on JavaScript.
 For more detail on how the language works, see:
 http://www.w3schools.com/js/default.asp
 */

/*
 * Multiline comments work like this.
 */

// Single line comments work like this

// Print to the JavaScript console.
// Hit F12 in your browser to bring up the console.
// Also, note that statements end with a semi-colon in JavaScript.
console.log("This is a test message that will print on the console.");

// Variables

// By convention, we usually use CamelCase for variable names, and not underscores.
// So myAccountNumber as an example.

// Before you use a variable, you should declare it.For example:
var variableOne, variableTwo;

// After that you can use it:
variableOne = 5;
variableTwo = variableOne + 2;
console.log("variableOne: " + variableOne + " - variableTwo: " + variableTwo );

// Functions work like this:
function addNumbers(numberOne, numberTwo) {
    return numberOne + numberTwo;
}

var functionResult = addNumbers(20, 30);
console.log("Function result: " + functionResult);

// Function pointers are used a lot in JavaScript. Figure this out:
var anotherAddNumberFunction = addNumbers;
functionResult = anotherAddNumberFunction(40, 50);
console.log("Function result: " + functionResult);

// Simple objects:
var personA = {name: "Paul", email: "paul.craven@simpson.edu"};
console.log("personA.name: " + personA.name);
console.log("person['name']: " + personA['name']);

// This doesn't print much:
console.log("personA: " + personA);
// But check out this print:
console.log(personA);

// Objects with methods:
var personB =
    {
        firstName: "Paul",
        lastName: "Craven",
        fullName: function() {
            return this.firstName + " " + this.lastName;
        },
        email: "paul.craven@simpson.edu"
    };
console.log("personB.name: " + personB.fullName());

// Loop
for (var i = 0; i < 10; i++) {
    console.log(i);
}

// Loop through an array
var colors = ["Red", "Blue", "Green"];
for (i = 0; i < colors.length; i++) {
    console.log(colors[i]);
}

// Loop through fields in an object
var personC = {name: "Paul", email: "paul.craven@simpson.edu"};
for (var field in personC) {
    console.log(field + " = " + personC[field]);
}

// Testing numbers
x = 5;
y = 6;
if(x == y) {
    console.log("x == y");
} else {
    console.log("x != y");
}

// Testing strings
// Use === not ==
// http://stackoverflow.com/questions/3586775/what-is-the-correct-way-to-check-for-string-equality-in-javascript

x = "Orange";
y = "Orange";
if(x === y) {
    console.log("x == y");
} else {
    console.log("x != y");
}

// Convert to string
x = 5;
y = 6;

z = x + y;
console.log("z = " + z);

z = x.toString() + y.toString();
console.log("z = " + z);

// Convert to number
x = "5";
y = "6";

z = x + y;
console.log("z = " + z);

z = Number(x) + Number(y);
console.log("z = " + z);