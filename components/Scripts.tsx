"use client";
import { useEffect } from "react";
import Script from "next/script";

export default function Scripts() {
  return (
    <>
      <Script src="/assets/js/jquery.js" strategy="beforeInteractive" />
      <Script src="/assets/js/bootstrap.js" strategy="afterInteractive" />
      <Script src="/assets/js/feather.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/aos.js" strategy="afterInteractive" />
      <Script src="/assets/js/owl.carousel.js" strategy="afterInteractive" />
      <Script src="/assets/js/text-type.js" strategy="afterInteractive" />
      <Script src="/assets/js/jquery-one-page-nav.js" strategy="afterInteractive" />
      <Script src="/assets/js/wow.js" strategy="afterInteractive" />
      <Script src="/assets/js/main.js" strategy="afterInteractive" />
    </>
  );
}
