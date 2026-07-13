"use client";

import Script from "next/script";

export function NetlifyIdentity() {
  return (
    <>
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" strategy="afterInteractive" />
      <Script id="netlify-identity-redirect" strategy="afterInteractive">
        {`
          if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", function (user) {
              if (!user) {
                window.netlifyIdentity.on("login", function () {
                  document.location.href = "/admin/";
                });
              }
            });
            window.netlifyIdentity.on("open", function () {
              var hash = document.location.hash;
              if (hash && hash.indexOf("invite_token") !== -1) {
                document.location.href = "/admin/";
              }
            });
          }
        `}
      </Script>
    </>
  );
}
