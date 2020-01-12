export function getTop5ByIcomingLinks() {
    const url = 'http://134.209.90.92:3200/subreddit/top5byIncomingLinks'
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}