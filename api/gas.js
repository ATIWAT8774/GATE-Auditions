export async function GET(req) {
  return proxy(req);
}
export async function POST(req) {
  return proxy(req);
}

async function proxy(req) {
  const GAS_EXEC_URL = https://script.google.com/macros/s/AKfycbzF5t3pt3kuSeqkOohfmw2uYfkWmwxYt5DBCk7XtLwGUO_uexzqWundp3MlBBdqoJaj/exec;
  if (!GAS_EXEC_URL) return new Response("Missing GAS_EXEC_URL", { status: 500 });

  const url = new URL(GAS_EXEC_URL);
  const { searchParams } = new URL(req.url);
  searchParams.forEach((v, k) => url.searchParams.set(k, v));

  const bodyText = (req.method === "GET" || req.method === "HEAD") ? null : await req.text();

  const r = await fetch(url.toString(), {
    method: req.method,
    headers: { "Content-Type": req.headers.get("content-type") || "text/plain;charset=utf-8" },
    body: bodyText,
    redirect: "follow",
  });

  const text = await r.text();
  return new Response(text, { status: r.status, headers: { "Content-Type": r.headers.get("content-type") || "application/json; charset=utf-8" } });
}
