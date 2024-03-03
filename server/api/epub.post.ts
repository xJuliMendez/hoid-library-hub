import JSZip from "jszip"
import fs from "fs"

export default defineEventHandler(async (event) => {
  const formData: FormData = await readFormData(event)

  const requestFile = formData.get("file")



  if (!requestFile) {
    throw new Error("File not found")
  }

  if (typeof requestFile === "string")
    throw new Error("File is a string")

  console.log(requestFile.name);
  const fileBuffer = await requestFile.arrayBuffer()

  const zip = JSZip()

  const zipFile = await zip.loadAsync(fileBuffer)


  zipFile.forEach(async (relativePath, file) => {

    const path = 'epub-folder/' + requestFile.name + '/' + relativePath

    const directory = path.split("/").slice(0, -1).join("/")

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true })
    }

    fs.writeFile(
      path,
      await file.async('nodebuffer'),
      (err) => {
        if (err) {
          console.error(err)
        }
      }
    )
  })

  return {
    "okey": "dokey"
  }

})
