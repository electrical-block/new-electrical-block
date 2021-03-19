const url = 'https://hexi.wokwi.com'
export async function buildHex (source) {
  const resp = await fetch(url + '/build', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sketch: source })
  })
  return (await resp.json())
}

/* export async function buildHex (source, then) {
  request.post(
    {
      url: url + '/build',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sketch: source })
    },
    (err, httpResponse, body) => {
      if (err) {
        console.log(err.stack)
        console.log(httpResponse)
      }
      then({
        stdout: JSON.parse(body).stdout,
        stderr: JSON.parse(body).stderr,
        hex: JSON.parse(body).hex
      })
    }
  )
} */
