import fs from 'fs.promises'
import { rootDir } from './const';
import * as cheerio from 'cheerio';
import _ from 'lodash';
import { changeBackLink } from './changeBackLink';

export async function getDiagrams(item){
    const luocdoFile = await fs.readFile(`./${rootDir}/${item}/lượcđồ.html`)
    const $ = cheerio.load(luocdoFile)

    let result = [];

    $(".ghd")?.each(function(i, elem) {

        let title = _.trim($(this).text())

        if(title.indexOf('đang xem') > 0){
            title = "Văn bản hiện tại"
        }

        let content = $(this).next().html()

        result.push({
            "title": title,
            "content": changeBackLink(content)
        })
    });

    return result
}