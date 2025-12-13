import React from 'react';


export default function PaymentPreview() {
  const html = sessionStorage.getItem("payment_html");

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}
