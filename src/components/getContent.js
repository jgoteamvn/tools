import { Cheerio } from "cheerio"
import fs from 'fs.promises'

export async function getContent(item){
    const noidungFile = await fs.readFile(`./datas/${item}/nộidung.html`)
    const $ = Cheerio.load(noidungFile)
    const content = $('.content1').html()

    // nho repeat sau
    return content
}