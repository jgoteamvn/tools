import axios from "axios";
import { useEffect, useState } from "react"

const delay = ms => new Promise(res => setTimeout(res, ms));

export default function Doc({id,folderName,action,setAction,stt}){

    const [loading,setLoading] = useState("đang chờ chạy")

    const handleAction = async () => {
        if(action == 0) return
        // if(action < 1000){
        //     setAction(action + 1)
        //     return
        // }
        if(action != stt) return
        // if(action > 1000) return

        setLoading("đang chạy")
        try {

            const request = await axios.post(`/api/getDoc`,{
                folderName: folderName,
                id: id
            })

            // await axios.post(`/api/getDoc`,{
            //     folderName: folderName,
            //     id: id
            // })
            setLoading("Thành công")
        } catch (error) {
            console.log("🚀 ~ handleAction ~ error:", error)
            setLoading("lỗi rồi")
        }

        await delay(500)
        setAction(action + 1)
    }

    useEffect(()=>{
        handleAction()
    },[action])

    return(
        <tr>
            <td>{id}</td>
            <td>{folderName}</td>
            <td>
                {loading}
            </td>
        </tr>
    )
}