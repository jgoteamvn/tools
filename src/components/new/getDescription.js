import { changeBackLink } from "./changeBackLink"
import { rootDir } from "./const"
import fs from 'fs.promises'
import * as cheerio from 'cheerio';

export async function getDescription(item){
    const noidungFile = await fs.readFile(`./${rootDir}/${item}/thuộctính.html`)
    const $ = cheerio.load(noidungFile)
    const content = $('.Tomtatvanban').html()

    // nho repeat sau
    const repeatContent = changeBackLink(content)
    
    return repeatContent
}