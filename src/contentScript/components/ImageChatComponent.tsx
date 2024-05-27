import React from "react";
import axios from "axios";
import { UploadImageIconInput } from "./SVG";

const ImageChatComponent = ({
  sendQuestion,
  setIsGetImg,
  setIsOpenImg,
  getAnswer,
  inputRefImg,
}) => {
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const imageUrl = URL.createObjectURL(file);
      sendQuestion(`<img>${file.name}</img>`, imageUrl);
      setIsGetImg(true);
      setIsOpenImg(false);
      try {
        const response = await axios.post(
          "http://127.0.0.1:8004/ext/upload_image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const description = response.data.description;
        
        getAnswer(
          `Provide a detailed description of the following description of image: ${description}`
        );
        setIsGetImg(false);
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };

  return (
    <div ref={inputRefImg} className="cwa_img-uploader">
      <input
        type="file"
        id="img-upload"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
      <div className="cwa_upload-img-container">
        <div className="cwa_upload-img-title">
          <h2>Tải lên hình ảnh để nhận mô tả chi tiết và câu trả lời!</h2>
        </div>
        <div className="cwa_upload-img-content">
          <p>
            Tải lên một hình ảnh để dễ dàng nhận được mô tả chi tiết và câu trả
            lời cho hình ảnh của bạn.
          </p>
        </div>
        <label htmlFor="img-upload" className="cwa_upload-img-footer">
          <UploadImageIconInput />
          <p>Loại tệp được hỗ trợ là hình ảnh</p>
          <p>Kéo hình ảnh của bạn vào đây hoặc nhấp vào để tải lên</p>
        </label>
      </div>
    </div>
  );
};

export default ImageChatComponent;
