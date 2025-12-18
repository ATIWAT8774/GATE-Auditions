export default async function handler(req, res) {
  const GAS_URL = "https://script.google.com/macros/s/AKfycbzF5t3pt3kuSeqkOohfmw2uYfkWmwxYt5DBCk7XtLwGUO_uexzqWundp3MlBBdqoJaj/exec";

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  try {
    const url = new URL(GAS_URL);
    for (const [k, v] of Object.entries(req.query || {})) {
      url.searchParams.set(k, v);
    }

    const opt = {
      method: req.method || "GET",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      redirect: "follow",
    };

    if (opt.method !== "GET" && opt.method !== "HEAD") {
      opt.body = typeof req.body === "string"
        ? req.body
        : JSON.stringify(req.body || {});
    }

    const r = await fetch(url.toString(), opt);
    const text = await r.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ status: "error", message: String(err) });
  }
}
