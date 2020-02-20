# GithubLanguageCalculator
Calculates the languages inside a GitHub profile.

# Usage
The 'calculating' function returns a promise, you can import this as a module for another file. The example below is from another file.
```JS
let Calculator = require("./LanguageCalculator.js")

Calculator("nabilridhwan")
.then(results => {
    console.log(results)
})
```

## Possible Output:
Example:
``` json
{
    "JavaScript": 3,
    "Python": 1,
    "Java": 1,
    "None": 3
}
```