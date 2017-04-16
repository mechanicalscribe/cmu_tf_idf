var fs = require("fs");
var csv = require("fast-csv");
var CMUDict = require('cmudict').CMUDict;
var cmudict = new CMUDict();

function parseLetter(letter) {

	var words = {},
		trash = {},
		word,
		line = 0;

	var PATH_TO_GOOGLE = "ngrams/";

	var stream = fs.createReadStream(PATH_TO_GOOGLE + "googlebooks-eng-all-1gram-20120701-" + letter);

	csv
		.fromStream(stream, {headers : ["word", "year", "tf", "df"], delimiter: "\t"})
		.on("data", function(data) {
			line += 1;
			if (/\_/.test(data.word) || data.word != data.word.toLowerCase()) {
				return;
			}
			word = data.word.toLowerCase();

			// if we already checked and this word isn't in CMUDict...
			if (trash[word]) {
				return;
			}

			// if we've already verified this word, add to it's tf and df
			if (words[word]) {
				words[word].tf += +data.tf;
				words[word].df += +data.df;
				words[word].year_first = Math.min(words[word].year_first, +data.year);
				words[word].year_recent = Math.max(words[word].year_recent, +data.year);
				words[word].years += 1;
				return;			
			}

			var p = cmudict.get(word);
			
			// if word isn't in the CMUDict, return
			if (!p) {
				trash[word] = true;
				return;
			}

			// otherwise, add it!
			console.log(word, line);
			words[word] = {
				word: word,
				pronunication: p,
				tf: +data.tf,
				df: +data.df,
				years: 1,
				year_first: +data.year,
				year_recent: +data.year
			};
		})
		.on("end", function() {
			console.log("writing CSV for", letter);

			var csvStream = csv.createWriteStream( {headers: true} ),
				writableStream = fs.createWriteStream("letters/" + letter + ".csv");

			writableStream.on("finish", function(){
				console.log("DONE!");
			});

			csvStream.pipe(writableStream);
			var all_words = Object.keys(words).sort();
			all_words.forEach(word=> {
				csvStream.write(words[word]);
			});
			csvStream.end();

			// fs.writeFileSync("trash_a.json", JSON.stringify(trash));
		});
}

parseLetter('r');