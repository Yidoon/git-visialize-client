import QRCode from 'qrcode';
import React, { useEffect, useState } from 'react';
import './index.less';

const MobilePage = () => {
  const [qrcode, setQrcode] = useState('');
  const genQrcode = async () => {
    const res = await QRCode.toDataURL('http://172.18.200.31:3001');
    console.log(res, 'resss');
    setQrcode(res);
  };
  useEffect(() => {
    genQrcode();
  }, []);
  return (
    <div className="mobile-page">
      <div className="qr-code-wrap">
        <img src={qrcode} />
      </div>
    </div>
  );
};

export default MobilePage;
