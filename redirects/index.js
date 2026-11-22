// Look-alike domains we own only so nobody else can: every request 301s to the real domain,
// same subdomain, path and query. threepandalabs.com -> 3pandalabs.com,
// <slug>.threepandasite.com -> <slug>.3pandasite.com. "www." is dropped.
const MAP = { "threepandalabs.com": "3pandalabs.com", "threepandasite.com": "3pandasite.com" };

export default {
  fetch(request) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    for (const [from, to] of Object.entries(MAP)) {
      if (host === from || host.endsWith("." + from)) {
        let sub = host.slice(0, host.length - from.length).replace(/\.$/, "");
        if (sub === "www") sub = "";
        url.hostname = sub ? `${sub}.${to}` : to;
        url.protocol = "https:";
        url.port = "";
        return Response.redirect(url.toString(), 301);
      }
    }
    return new Response("Not found", { status: 404 });
  },
};
