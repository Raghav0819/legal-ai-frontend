export async function parseStreamingResponse(

  response: Response,

  onToken: (
    token: string
  ) => void
) {

  if (!response.body) {

    throw new Error(
      "No response body"
    )
  }

  const reader =
    response.body.getReader()

  const decoder =
    new TextDecoder()

  let buffer = ""

  while (true) {

    const {
      done,
      value,
    } = await reader.read()

    if (done) break

    buffer += decoder.decode(
      value,
      {
        stream: true,
      }
    )

    // Split by spaces for token effect
    const tokens =
      buffer.split(" ")

    // Keep unfinished token
    buffer =
      tokens.pop() || ""

    for (const token of tokens) {

      onToken(
        token + " "
      )

      // Smooth AI typing effect
      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            12
          )
      )
    }
  }

  // Flush remaining
  if (buffer) {

    onToken(buffer)
  }
}
