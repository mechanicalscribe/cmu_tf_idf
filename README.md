# CMUDict + Google Books Unigrams

Google provides [fantastic data](http://storage.googleapis.com/books/ngrams/books/datasetsv2.html) on the frequency of words and ngrams in all the books it has scanned, in many cases going back centuries. The only drawback is that these files are enormous. The unigrams alone are 11GB, not including numbers and punctuation.

There are also many, many words that aren't actually words or of much interest. So I thought I'd parse the unigrams down to only those that show up in the [CMU Pronunciation Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict). It's not a complete list of English words by any stretch, but it's remarkably complete.

The result is [cmu_google.csv](cmu_google.csv), a 4MB file of term frequency and document frequency for 86,972 words, plus the CMU pronunciation. Please let me know at wilson@mechanicalscribe.com if you find it of any use!

# Sources

[Google Books Ngrams](http://storage.googleapis.com/books/ngrams/books/datasetsv2.html)
Creative Commons Attribution 3.0 Unported License.

[CMU Pronunciation Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict) via the Node module [cmudict](https://www.npmjs.com/package/cmudict).
"An open-source machine-readable pronunciation dictionary."

# License
MIT