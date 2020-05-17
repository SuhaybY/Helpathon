import React, {useRef, useState, createRef} from 'react';
import QrReader from "react-qr-reader";

export default function User(){
  const [delay, setdelay] = useState(300);
  const [result, setResult] = useState("Unknown");
  const qrReader1 =  useRef();

  const handleScan = data => {
    if (data) {
      setResult(data);
    }
  }
  const handleError = err => {
    console.error(err);
  }


    return (
      <div>
        <QrReader
          ref={qrReader1}
          delay={delay}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "200%" }}
         
        />
        <input type="button" value="Submit QR Code" onClick={() => qrReader1.current.openImageDialog()}/>
        <p>{result}</p>
      </div>
    );
}