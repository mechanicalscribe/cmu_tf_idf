var d3 = require("d3");
var fs = require("fs");

var words = {};

var letters = d3.range(97, 123).map(function(d) { return String.fromCharCode(d); });

letters.forEach(function(letter) {
	var csv = d3.csvParse(fs.readFileSync("letters/" + letter + ".csv", "utf8"));
	console.log(letter, csv.length);
	csv.forEach(function(d) {
		words[d.word] = {
			word: d.word,
			pronunication: d.pronunication,
			tf: +d.tf,
			df: +d.df,
			years: +d.years,
			year_first: +d.year_first,
			year_recent: +d.year_recent
		}
	});
});

console.log(Object.keys(words).length, "words");

//fs.writeFileSync("cmu_google.json", JSON.stringify(words));
fs.writeFileSync("cmu_google.csv", d3.csvFormat(d3.values(words)));