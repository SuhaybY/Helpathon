import React, {useState} from 'react';
import QrReader from "react-qr-reader";

export default function User(){
  const [delay, setdelay] = useState(300);
  const [result, setResult] = useState("No result");

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
          delay={delay}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
        <p>{result}</p>
      </div>
    );
}