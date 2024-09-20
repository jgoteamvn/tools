import fs from 'fs.promises'
import * as cheerio from 'cheerio';
import _ from 'lodash';
import { cdnUrl, rootDir } from './const'
import { changeBackLink } from './changeBackLink';

export async function checkFileExit(fileName){
    try {
        await fs.readFile(fileName)
        return true
    } catch (error) {
        return false
    }
}

async function getContentComment(folderName){
    try {
        const folders = await fs.readdir(`${folderName}/comment`)
        // lấy file
        let result = ""
        
        if(folders?.length < 1) return result
        
        for(let i=0;i < folders.length; i++){
            const noidungFile = await fs.readFile(`${folderName}/comment/${folders[i]}`)
            const noidungNew = _.replace(noidungFile,new RegExp('href="#"','g'), '')
            const idName = _.split(folders[i],'.',3)[0]
            const resultText = `<div id="${idName}" style="display:none">${noidungNew}</div>`
            result += resultText
        }
        
        return result
        
    } catch (error) {
        return ''
    }
}

async function getContentTooltip(folderName){
    try {
        const folders = await fs.readdir(`${folderName}/tooltip`)
        let result = ""
        if(folders?.length < 1) return result
        
        for(let i=0;i < folders.length; i++){
            const noidungFile = await fs.readFile(`${folderName}/tooltip/${folders[i]}`)
            result += noidungFile
        }
        return result
        
    } catch (error) {
        return ''
    }
}

export async function getDoc(jsonFile,folderName,slug){
    const checkpdf = await checkFileExit(`./${rootDir}/${folderName}/${slug}.pdf`)
    const checkDoc = await checkFileExit(`./${rootDir}/${folderName}/${slug}.doc`)
    
    const title = jsonFile.title
    let doc_pdf = checkpdf ? `${cdnUrl}/${slug}.pdf` : ""
    let doc_word = checkDoc ? `${cdnUrl}/${slug}.doc` : ""

    const noidungFile = await fs.readFile(`./${rootDir}/${folderName}/nộidung.html`)
    const $ = cheerio.load(noidungFile)

    const contentHtml = $('.content1').html()
    
    // lấy comment
    let contentComment = await getContentComment(`${rootDir}/${folderName}`)
    
    // lấy tooltip
    let contentTooltip = await getContentTooltip(`${rootDir}/${folderName}`)
    
    const content = _.trim(`<div>
        ${contentHtml}
        ${contentComment}
        <div class="ui-widget-overlay" style="display: none;position: fixed;top: 0;left: 0;right: 0;bottom: 0;z-index: 0;background: rgb(0,0,0,0.3);"></div>
        ${contentTooltip}
    </div>
    `)

    const contentResult = changeBackLink(content)

    return {
        title,
        doc_pdf,
        doc_word,
        content:contentResult,
    }
}