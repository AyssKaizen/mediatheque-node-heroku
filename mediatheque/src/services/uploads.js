import envVar from "../envVar";
import axios from 'axios'

const cloudinaryUpload = (fileToUpload) => {
    return axios.post(`${envVar.apiUrl}/uploads/cloudinary-upload`, fileToUpload)
    .then(res => res.data)
    .catch(err => console.log(err))
}

export default cloudinaryUpload