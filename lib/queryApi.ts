import openai from './chatgpt'

const query = async (prompt: string) => {
  return await openai
    .createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0.9,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => {
      return res.data.choices[0].text?.trim()
    })
    .catch(
      (err) =>
        `ChatGPT was unable to find an answer for that! (Error: ${err.message})`,
    )
}

export default query
