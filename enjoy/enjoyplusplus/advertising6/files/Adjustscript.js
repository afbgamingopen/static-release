function buildURL(p0, p1, p2, p3, p4, p5, p6, fbclid, fbpid) {
  if (!p0) {
    return "";
  }
  tracker_token = p0;
  if (p1 || p2) {
    campaign = p1 + " (" + p2 + ")";
  } else {
    campaign = "";
  }
  if (p3 || p4) {
    adgroup = p3 + " (" + p4 + ")";
  } else {
    adgroup = "";
  }
  if (p5 || p6) {
    creative = p5 + " (" + p6 + ")";
  } else {
    creative = "";
  }
  if (!fbclid) {
    fbclid = "";
  }
  if (!fbpid) {
    fbpid = "";
  }

  let params = { campaign, adgroup, creative, fbclid, fbpid };
  let newURL =
    "https://app.adjust.com/" +
    tracker_token +
    "?" +
    Object.keys(params)
      .map((key) => key + "=" + encodeURIComponent(params[key]))
      .join("&");
  return newURL;
}

function getFbPid() {
  let fbPid = document.cookie.match(/(^|;) ?_fbp=([^;]*)(;|$)/);
  if (fbPid) {
    return fbPid[2];
  } else {
    return null;
  }
}
