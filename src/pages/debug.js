import axios from "axios"
import { useState } from "react"

export default function DebugPage(){

    const [loading,setLoading] = useState("")
    const [content,setContent] = useState()

    const handleCLick = async () => {
        setLoading("đang chạy")
        try {
            const request = await axios.post(`/api/getDoc`,{
                folderName: "1_304438_530266",
                id: 1
            })
            console.log("🚀 ~ handleCLick ~ request:", request?.data)
            setLoading("Thành công")
        } catch (error) {
            setLoading("lỗi rồi")
        }
    }

    return(
        <>
            <button onClick={handleCLick} style={{padding: 20}}>
                click đi chờ gì
            </button>
            <div>
                {loading}
            </div>
        </>
    )
}