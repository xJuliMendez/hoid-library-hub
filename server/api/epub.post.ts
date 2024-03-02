import fs from "fs"

export default defineEventHandler(async (event) => {
  const body: string = await readBody(event)

  fs.writeFileSync("epub.zip", body)


  return {
    body
  }

})
