import React, { useEffect } from "react";
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

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

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
        const response = await axios.post(`${CWA}/${UPLOAD_IMG}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const description = response.data.description;
        console.log("description: ", description);

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
      </div>
    </div>
  );
};

export default ImageChatComponent;
