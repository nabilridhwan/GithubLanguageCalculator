let fetch = require('node-fetch');

async function LanguageCalculator(user) {
    let languages = {};

    let response = await fetch(`https://api.github.com/users/${user}/repos?per_page=100`)
    let data = await response.json();

    data.forEach(repo => {
        let {language} = repo;
        if (language == null) language = "None"
        if (languages[language] == undefined) languages[language] = 0
        languages[language] = languages[language] + 1
    })
    return languages
}

module.exports = LanguageCalculator