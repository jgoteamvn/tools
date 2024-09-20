import { getAttribute } from "@/components/new/attribute"
import { getPersonId } from "@/components/new/signPerson"
import fs from 'fs.promises'
const rootDir = './datas'

export default async function handler(req, res) {

    try {
        const folders = await fs.readdir(rootDir) 

        let agencyIds = []

        for(let i =0;i< folders.length;i++){
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
            } = await getAttribute(folders[i])

            // Lấy người ký
            const personId = await getPersonId(sign_person)

            agencyIds.push(personId)
        }

        return res.status(200).json(agencyIds)
    } catch (error) {
        console.log("🚀 ~ handler ~ error:", error)
        return res.status(400).json("loi")
    }
    
}