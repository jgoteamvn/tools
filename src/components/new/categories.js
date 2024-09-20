import fs from 'fs.promises'
import { rootDir } from './const';
import * as cheerio from 'cheerio';
import _ from 'lodash';

export async function getCategoryId(folderName){
    const noidungFile = await fs.readFile(`./${rootDir}/${folderName}/thuộctính.html`)
    const $ = cheerio.load(noidungFile)

    let resultText = ""

    $("table td")?.each(function(i, elem) {
        const text = _.trim($(this).text())

        if(text.includes('Loại văn bản')){
            resultText = _.trim($(this).next().text())
        }

    })
    
    const resultArr = resultText.split(',')

    if(resultArr.length < 1) return 1

    const resultCategoryArr = []

    // đọc file category.json
    const jsonFile = require(`./json/category.json`)

    for(let i = 0; i < resultArr.length; i++){
        // kiểm tra xem đã có chưa
        const check = jsonFile.find(e => e.name == resultArr[i])

        if(check){
            resultCategoryArr.push(check.id)
        }else{
            // nếu chưa có thì thêm mới
            const newId = jsonFile.length + 1
            let newArr = jsonFile
            newArr.push({id: newId,name: resultArr[i]})
            await fs.writeFile(`./src/components/new/json/category.json`, JSON.stringify(newArr))

            resultCategoryArr.push(newId)
        }
    }

    return resultCategoryArr
}