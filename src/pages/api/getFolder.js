import fs from 'fs.promises'

const rootDir = './datas'

export default async function handler(req, res) {

    const folders = await fs.readdir(rootDir)

    res.status(200).json(folders);
}
  