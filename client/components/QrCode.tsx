import React, { useRef } from "react";
import QRCode from "react-qr-code";

const qrCodeRef = useRef(null);

  // Function to trigger the download
  const downloadQRCode = (_link : string) => {
    const canvas = qrCodeRef.current?.getElementsByTagName('canvas')[0];

    if (canvas) {
      const url = canvas.toDataURL(); // Convert canvas to data URL
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qrcode.png'; // Set the filename for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <QRCode value={_link} ref={qrCodeRef} />
      <button onClick={downloadQRCode}>Download QR Code</button>
    </div>
  );
};

export default QrCode;
