export function getSubreddits(text) {
    const url = 'http://134.209.90.92:3200/subreddit' + '&language=fr&query=' + text
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}