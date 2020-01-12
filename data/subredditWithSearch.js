export function getSubredditsWithSearch(text) {
    const url = 'http://134.209.90.92:3200/subreddit/?contains=' + text
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}