export default function getTop5ByTotalLinks() {
    const url = 'http://134.209.90.92:3200/subreddit/top5byTotalLinks'
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}