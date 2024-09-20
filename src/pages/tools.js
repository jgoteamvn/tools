import axios from "axios"
import { useState } from "react"

const getAllFolder = async () => {

}
export default function ToolPage(){

    const [loading,setLoading] = useState("")

    const handleAgency = async() => {
        setLoading("đang tải")
        try {
            const request = await axios.get('/api/getAgency')
            console.log(request.data)
            setLoading("xong")
        } catch (error) {
            setLoading("lỗi")
        }
        
    }
    const handleCategory = async() => {

        setLoading("đang tải")
        try {
            const request = await axios.get('/api/getCategory')
            console.log(request.data)
            setLoading("xong")
        } catch (error) {
            setLoading("lỗi")
        }

    }
    const handlePerson = async() => {
        setLoading("đang tải")
        try {
            const request = await axios.get('/api/getPerson')
            console.log(request.data)
            setLoading("xong")
        } catch (error) {
            setLoading("lỗi")
        }
    }

    return(
        <>
            <div><button onClick={handleAgency}>Lấy Agency</button></div>
            <div><button onClick={handleCategory}>Lấy Category</button></div>
            <div><button onClick={handlePerson}>Lấy Person</button></div>
            <div>{loading}</div>
        </>
    )
}