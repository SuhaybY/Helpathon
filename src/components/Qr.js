import React, {useState} from 'react';
import { useQrEncode, useQrDecode } from 'react-qr-hooks';

export default function User(){
    
  const [users, QRID] = useState([]);
  const encoded = useQrEncode('User QR');
  //const decoded = useQrDecode(encoded);

  return (
    <div>
      <img src={encoded} alt="My QR code" />
    </div>
  );
}

