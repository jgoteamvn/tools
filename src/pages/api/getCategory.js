import { getAttribute } from "@/components/new/attribute"
import { getCategoryId } from "@/components/new/categories"
import { getPersonId } from "@/components/new/signPerson"
import fs from 'fs.promises'
const rootDir = './datas'

export default async function handler(req, res) {

    try {
        const folders = await fs.readdir(rootDir) 

        let agencyIds = []

        for(let i =0;i< folders.length;i++){

            // Lấy người ký
            const category_id = await getCategoryId(folders[i])

            // agencyIds.push(agencyId)
        }

        return res.status(200).json(agencyIds)
    } catch (error) {
        console.log("🚀 ~ handler ~ error:", error)
        return res.status(400).json("loi")
    }
    
}