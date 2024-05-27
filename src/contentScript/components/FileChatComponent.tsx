import React from "react";
import { UploadFileIcon } from "./SVG";

const CWA = process.env.API_DOMAIN;
const UPLOADFILE = process.env.API_UPLOAD_FILE;

const FileChatComponent = ({
  sendQuestion,
  setIsGetFile,
  setIsOpenFile,
  getAnswer,
  fileChatRef,
}) => {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    sendQuestion(`<file>${file.name}</file>`);
    setIsGetFile(true);
    setIsOpenFile(false);
    try {
      const response = await fetch(`${CWA}/${UPLOADFILE}`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const fileName = file.name;
        setIsGetFile(false);
        getAnswer(`What is the main topic of the document?`, fileName);
      } else {
        console.error("Đã xảy ra lỗi khi gửi file lên BE.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi file lên BE:", error);
    }
  };

  return (
    <div ref={fileChatRef} className="cwa_pdf-uploader">
      <input
        type="file"
        id="pdf-upload"
        accept=".pdf,.docx"
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />
      <div className="cwa_upload-pdf-container">
        <div className="cwa_upload-pdf-title">
          <h2>
            Tải lên tệp PDF hoặc WORD để nhận bản tóm tắt thông minh và câu trả
            lời!
          </h2>
        </div>
        <div className="cwa_upload-pdf-content">
          <p>
            Tải lên một tệp PDF hoặc WORD để dễ dàng nhận được bản tóm tắt thông
            minh và câu trả lời cho tài liệu của bạn.
          </p>
        </div>
        <label htmlFor="pdf-upload" className="cwa_upload-pdf-footer">
          <UploadFileIcon />
          <p>Loại tệp được hỗ trợ là PDF và WORD</p>
          <p>Kéo file của bạn vào đây hoặc nhấp vào để tải lên</p>
        </label>
      </div>
    </div>
  );
};

export default FileChatComponent;
