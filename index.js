let fetch = require('node-fetch');
let user = process.argv[2]

let all_lang = []
let lang_obj = []
let lang_set = []

console.log(`https://api.github.com/users/${user}/repos?per_page=100`)
fetch(`https://api.github.com/users/${user}/repos?per_page=100`)
    .then(response => {
        return response.json()
    })
    .then(json => {

        try {
            json.forEach(item => {
                if (item.language) {
                    all_lang.push(item.language)
                }
            });
        } catch (error) {
            console.log(`An error has occured, it may seem that you have went over GitHub's Rate Limit or you typed in a wrong username!`)
        }

        lang_set = Array.from(new Set(all_lang))
        console.log(calculate_all_lang(lang_set))

    })

function calculate_all_lang(u) {
    let count = 0;

    u.forEach(lang => {
        lang_obj[lang] = 0
    })

    while (count !== u.length) {
        for (let i = 0; i < all_lang.length; i++) {
            if (all_lang[i] == u[count]) {
                lang_obj[all_lang[i]] += 1
            }
        }

        count++
    }
    lang_obj['Total'] = all_lang.length

    return lang_obj
}