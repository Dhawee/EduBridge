async function apiRequest(url, data) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return { ok: res.ok, data: json };
  } catch (err) {
    return { ok: false, data: { message: "Network error" } };
  }
}
