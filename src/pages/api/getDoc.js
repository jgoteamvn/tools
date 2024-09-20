import fs from 'fs.promises'
import * as cheerio from 'cheerio';
import axios from 'axios';
import _ from 'lodash';
import { getSlug } from '@/components/getSlug'
import { docTypes, docEffect,rootDir,token,cdnUrl } from '@/components/new/const'
import { getDoc } from '@/components/new/getDoc';
import { getDescription } from '@/components/new/getDescription';
import { getAttribute } from '@/components/new/attribute';
import { getPersonId } from '@/components/new/signPerson';
import { getAgencyId } from '@/components/new/agency';
import { getStatusId } from '@/components/new/status';
import { getCategoryId } from '@/components/new/categories';
import { getDiagrams } from '@/components/new/diagram';
import { format } from 'date-fns';
import { formatDate } from '@/components/formatDate';

function getTypeId(type){

    let result = 1

    docTypes?.map(e => {
        if(type.includes(e.name)) result = e.id
    })

   return result
}

function getEffectId(effect){
    let result = 1

    docEffect?.map(e => {
        if(effect.includes(e.name)) result = e.id
    })

   return result
}

export default async function handler(req, res) {
    const {folderName, id} = req.body

    if(!folderName) return res.status(400).json("loi")

    try {
        // đọc file json
        const jsonFile = require(`../../../${rootDir}/${folderName}/general_information.json`)

        // lấy slug, nhớ khi result ra phải set lại
        let slug = getSlug(jsonFile)
        let slugForApi = slug + '-' + jsonFile.law_id

        // lấy tiêu đề, file, nội dung
        const {
            title,
            doc_pdf,
            doc_word,
            content
        } = await getDoc(jsonFile,folderName,slug)

        // lấy description
        const description = await getDescription(folderName)

        // lấy dc attribute
        const {
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
        } = await getAttribute(folderName)

        // Lấy người ký
        const personId = await getPersonId(sign_person)

        // lấy agency id
        const agencyId = await getAgencyId(agency)

        // lấy status id
        const status_id = getStatusId(status)

        // lấy categories
        const category_id = await getCategoryId(folderName)

        // lấy diagrams
        const diagrams = await getDiagrams(folderName)


        // gọi api đẩy dữ liệu
        let data = JSON.stringify({
            "id": id,
            "title": title,
            "slug": slugForApi,
            "doc_word": doc_word,
            "doc_pdf": doc_pdf,
            "law_id": jsonFile.law_id,
            "attribute": {
              "id": id,
              "num_code": num_code,
              "is_outstanding": 0,
              "agency_id": agencyId,
              "type": getTypeId(type),
              "effect": getEffectId(effect),
              "date_issued": format(formatDate(date_issued),'yyyy-MM-dd'),
              "date_effective": format(formatDate(date_effective),'yyyy-MM-dd'),
              "date_published": format(formatDate(date_published),'yyyy-MM-dd'),
              "sign_person_id": personId,
              "status_id": status_id,
              "num_gazette":num_gazette
            },
            "diagrams":diagrams,
            "categories": category_id,
            "description": description,
            "content": content
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api-tvpl.jgoteam.com/api/backend/documents',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${token}`
            },
            data : data
        };

        const request = await axios.request(config)
        console.log("🚀 ~ handler ~ request:", request?.data)
        return res.status(200).json(data)

    } catch (error) {
        console.log("🚀 ~ handler ~ error:", error?.response?.data)
        return res.status(400).json(error?.response?.data)
    }
    
    
}