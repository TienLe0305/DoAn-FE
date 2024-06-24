import React, { useEffect, useState } from "react";
import axios from "axios";
import { UploadImageIconInput } from "./SVG";
import { useTranslation } from "react-i18next";

const CWA = process.env.API_DOMAIN;
const UPLOAD_IMG = process.env.API_UPLOAD_IMG;

const ImageChatComponent = ({
  sendQuestion,
  setIsGetImg,
  setIsOpenImg,
  getAnswer,
  inputRefImg,
  language,
}) => {
  const { t, i18n } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const handleImageUpload = async (file) => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const imageUrl = URL.createObjectURL(file);
      sendQuestion(`<img>${file.name}</img>`, imageUrl);
      setIsGetImg(true);
      setIsOpenImg(false);
      try {
        const response = await axios.post(`${CWA}/${UPLOAD_IMG}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const description = response.data.description;
        getAnswer(
          `Please help me write the description inside the quotes a little longer: "${description}"`, null, true
        );
        setIsGetImg(false);
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      setIsDragging(false);
    }
  };

  return (
    <div ref={inputRefImg} className="cwa_img-uploader">
      <input
        type="file"
        id="img-upload"
        accept="image/*"
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      />
      <div
        className={`cwa_upload-img-container ${isDragging ? "dragging" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <div className="cwa_upload-img-title">
          <h2>{t("upload-img-title")}</h2>
        </div>
        <div className="cwa_upload-img-content">
          <p>{t("upload-img-content")}</p>
        </div>
        <label htmlFor="img-upload" className="cwa_upload-img-footer">
          <UploadImageIconInput />
          <p>{t("supported-img-type")}</p>
          <p>{t("upload-instruction")}</p>
        </label>
        <p>{t("drag-and-drop-instruction")}</p>
      </div>
    </div>
  );
};

export default ImageChatComponent;
