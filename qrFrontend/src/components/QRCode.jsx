import React, { useState, useEffect } from "react";
import QRCode from "qrcode";

function Qrcode({ url }) {
  const [qr, setQr] = useState(""); // Initially empty QR code

  useEffect(() => {
    generateQRCode();
  }, [url]);

  const generateQRCode = () => {
    QRCode.toDataURL(
      url,
      {
        width: 200,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      },
      (err, url) => {
        if (err) {
          console.error(err);
          return;
        }
        setQr(url);
      }
    );
  };

  const handleDownloadQRCode = () => {
    let downloadLink = document.createElement("a");
    downloadLink.href = qr;
    downloadLink.download = "qrcode.png";
    downloadLink.click();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {qr != null ? (
        <div className="mb-4">
          <img src={qr} alt="QR Code" />
        </div>
      ) : null}
      <button
        onClick={handleDownloadQRCode}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
      >
        Download QR Code
      </button>
    </div>
  );
}

export default Qrcode;
