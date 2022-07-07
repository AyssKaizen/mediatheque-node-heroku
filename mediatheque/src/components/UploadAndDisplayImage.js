import React, { useState } from "react";
import cloudinaryUpload from "../services/uploads";

const UploadAndDisplayImage = ({setImage}) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleFileUpload = async e => {
        const uploadData = new FormData();
        uploadData.append("file", e.target.files[0], "file");
        const res = await cloudinaryUpload(uploadData)
        console.log(res.secure_url)
        setImage(res.secure_url)
    }
    return (
        <div>
            {selectedImage && (
                <div>
                    <img
                        alt="not fount"
                        width={"100px"}
                        src={URL.createObjectURL(selectedImage)}
                    />
                    <br/>
                    <button className="button is-small" onClick={() => setSelectedImage(null)}>supprimer l'image</button>
                </div>
            )}
            <br />
            <input
                disabled={selectedImage}
                type="file"
                onChange={ event => {
                    handleFileUpload(event)
                    setSelectedImage(event.target.files[0]);
                }}
            />
        </div>
    );
};

export default UploadAndDisplayImage;
