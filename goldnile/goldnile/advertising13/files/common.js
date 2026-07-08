function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand("copy");
  } catch (e) {}
  document.body.removeChild(ta);
}

function getUrl(url) {
  const cookieParams = document.cookie
    .replaceAll("; ", "&")
    .replaceAll(";", "&");
  const params = [window.location.search.replace(/^\?/, ""), cookieParams]
    .filter(Boolean)
    .join("&");

  if (!params) return url;
  return url + (url.includes("?") ? "&" : "?") + params;
}

function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}
