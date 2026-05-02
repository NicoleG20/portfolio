function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function onRequestPost({ request, env }) {
  let body;

  try {
    body = await request.json();
  } catch (error) {
    return json({ error: "Invalid JSON body." }, 400);
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const subject = String(body.subject || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !isValidEmail(email) || !subject || message.length < 10) {
    return json({ error: "Please complete every field with valid details." }, 400);
  }

  if (!env.CONTACT_WEBHOOK_URL) {
    return json({ error: "Contact service is not configured." }, 503);
  }

  const response = await fetch(env.CONTACT_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      source: "nicole-portfolio",
    }),
  });

  if (!response.ok) {
    return json({ error: "Contact service failed." }, 502);
  }

  return json({ ok: true });
}
