let fetch = require('node-fetch');
function LanguageCalculator(user) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.github.com/users/${user}/repos?per_page=100`)
            .then(res => res.json())
            .then(data => {
                let languages = {};
                data.forEach(repo => {
                    let {
                        language
                    } = repo;
                    if (language == null) language = "None"
                    if (languages[language] == undefined) languages[language] = 0
                    languages[language] = languages[language] + 1
                })
                resolve(languages)
            })
    })
}

module.exports = LanguageCalculator