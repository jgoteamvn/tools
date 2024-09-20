import fs from 'fs.promises'
import { rootDir } from './const';
import * as cheerio from 'cheerio';
import _ from 'lodash';

export async function getAttribute(folderName) {
    const noidungFile = await fs.readFile(`./${rootDir}/${folderName}/thuộctính.html`)
    const $ = cheerio.load(noidungFile)

    let num_code;
    let agency;
    let effect;
    let type;
    let is_outstanding = 0;
    let date_issued;
    let date_effective;
    let date_published;
    let sign_person;
    let status;
    let num_gazette;
    let created_at = "2024-07-22 10:47:04";
    let updated_at = "2024-07-22 10:47:04";

    $("table td")?.each(function(i, elem) {
        if(i == 1) num_code = _.trim($(this).text())
        if(i == 6) agency = _.trim($(this).text())
        if(i == 4) type = _.trim($(this).text())
        if(i == 11){
            date_issued = _.trim($(this).text())
            date_published = _.trim($(this).text())
        }
        if(i == 14) date_effective = _.trim($(this).text())
        if(i == 16) num_gazette = _.trim($(this).text())
        if(i == 9) sign_person = _.trim($(this).text())
        if(i == 22) {
            status = _.trim($(this).text())
            effect = _.trim($(this).text())
        }
    });

    return{
        num_code,
        agency,
        effect,
        type,
        is_outstanding,
        date_issued,
        date_effective,
        date_published,
        sign_person,
        status,
        num_gazette,
        created_at,
        updated_at
    }
}