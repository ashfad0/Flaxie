

async function getData() {
    const response = await fetch(url)
    const json = await response.json()
    return json
}

let data = await getData()
console.log(data)
