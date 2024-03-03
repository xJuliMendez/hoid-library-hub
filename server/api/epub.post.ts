import JSZip from "jszip"
import fs from "fs"

export default defineEventHandler(async (event) => {
  const formData: FormData = await readFormData(event)

  const file = formData.get("file")

  if (!file) {
    throw new Error("File not found")
  }

  if (typeof file === "string")
    throw new Error("File is a string")

  const fileBuffer = await file.arrayBuffer()

  const zip = JSZip()

  const zipFile = await zip.loadAsync(fileBuffer)


  zipFile.forEach(async (relativePath, file) => {


    fs.writeFile(
      `${relativePath}`,
      await file.async('nodebuffer'),
      (err) => {
        if (err) {
          console.error(err)
        }
      }
    )
  })

  // const oebpsFile = zipFile.file("OEBPS/content.opf")

  // console.log(await oebpsFile?.async('string'));

  // fs.writeFileSync("content.opf", await oebpsFile?.async('string') as string)


  // const uint8Array = await zipFile.generateAsync({ type: "uint8array" })

  // fs.writeFileSync("epub-folder", uint8Array)


  // const zip = JSZip()

  // const file = zip.file("hello.txt", body)

  // file.generateAsync({ type: "nodebuffer" }).then((content) => {
  //   fs.writeFileSync("epub.zip", content)
  // })

  // fs.writeFileSync("image.jpeg", body, 'binary')

  return {
    "okey": "dokey"
  }

})
