let fetch = require('node-fetch');
let user = process.argv[2]

let all_lang = []
let lang_obj = []
let lang_set = []

console.log(`Fetching: https://api.github.com/users/${user}/repos?per_page=100`)
fetch(`https://api.github.com/users/${user}/repos?per_page=100`)
    .then(response => response.json())
    .then(json => {

        // Try if it works, if not there is something wrong with the response
        try {
            json.forEach(item => {
                if (item.language) {

                    // This is where we store all the languages with duplicates as we need to count!
                    // ['JavaScript', 'Java', 'Java', 'Python', 'JavaScript']
                    all_lang.push(item.language)
                }
            });

            // This is where we store the languages found but none of it is a duplicate.
            // ['JavaScript', 'Java', 'Java', 'Python', 'JavaScript'] => ['JavaScript', 'Java', 'Python']
            lang_set = Array.from(new Set(all_lang))

            // Run the calculate languages function passing the languages set
            console.log(calculate_all_lang(lang_set))
        } catch (error) {

            // Error handling!
            console.log(`An error has occured, it may seem that you have went over GitHub's Rate Limit or you typed in a wrong username!`)
        }
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