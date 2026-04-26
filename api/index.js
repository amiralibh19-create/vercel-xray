export const config = {
  runtime: "edge",
};

const TARGET = process.env.TARGET_DOMAIN;

export default async function handler(req) {
  const path = req.url.slice(req.url.indexOf("/", 8));
  const targetUrl = TARGET + path;

  const headers = new Headers();
  req.headers.forEach((v, k) => {
    if (!k.startsWith("x-vercel") && k !== "host") {
      headers.set(k, v);
    }
  });

  const res = await fetch(targetUrl, {
    method: req.method,
    headers,
    body: req.body,
    duplex: "half",
    redirect: "manual",
  });

  return new Response(res.body, {
    status: res.status,
    headers: res.headers,
  });
}
