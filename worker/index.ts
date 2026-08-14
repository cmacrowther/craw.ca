interface ContactPayload {
  email?: unknown;
  message?: unknown;
  name?: unknown;
  source?: unknown;
  subject?: unknown;
  website?: unknown;
}

const MAX_REQUEST_BYTES = 32_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: Record<string, unknown>, status = 200): Response {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function normalized(value: unknown, maximumLength: number): string | null {
  if (!isString(value)) return null;

  const result = value.trim();
  if (!result || result.length > maximumLength) return null;

  return result;
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

async function handleContact(request: Request, env: CloudflareEnv): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(null, {
      status: 405,
      headers: { Allow: "POST", "Cache-Control": "no-store" },
    });
  }

  const requestUrl = new URL(request.url);
  const origin = request.headers.get("Origin");
  if (origin && origin !== requestUrl.origin) {
    return json({ error: "Invalid request origin." }, 403);
  }

  if (!request.headers.get("Content-Type")?.toLowerCase().startsWith("application/json")) {
    return json({ error: "Content-Type must be application/json." }, 415);
  }

  const declaredLength = Number(request.headers.get("Content-Length") ?? 0);
  if (declaredLength > MAX_REQUEST_BYTES) {
    return json({ error: "Request is too large." }, 413);
  }

  const clientKey = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const rateLimit = await env.CONTACT_RATE_LIMITER.limit({ key: clientKey });
  if (!rateLimit.success) {
    return json({ error: "Too many requests. Please try again shortly." }, 429);
  }

  let payload: ContactPayload;
  try {
    const rawBody = await request.text();
    if (rawBody.length > MAX_REQUEST_BYTES) {
      return json({ error: "Request is too large." }, 413);
    }
    const parsedPayload: unknown = JSON.parse(rawBody);
    if (!parsedPayload || typeof parsedPayload !== "object" || Array.isArray(parsedPayload)) {
      return json({ error: "Invalid JSON payload." }, 400);
    }
    payload = parsedPayload as ContactPayload;
  } catch {
    return json({ error: "Invalid JSON payload." }, 400);
  }

  // Bots commonly fill hidden fields. Return success so they do not retry.
  if (isString(payload.website) && payload.website.trim()) {
    return json({ success: true });
  }

  const name = normalized(payload.name, 100);
  const email = normalized(payload.email, 254);
  const subject = normalized(payload.subject, 200);
  const message = normalized(payload.message, 10_000);

  if (!name || !email || !EMAIL_PATTERN.test(email) || !subject || !message) {
    return json({ error: "Please provide valid values for all required fields." }, 400);
  }

  const source = payload.source === "support" ? "Support" : "Contact";
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br>");

  let resendResponse: Response;
  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: [env.CONTACT_TO_EMAIL],
        subject: `[${source}] ${subject.replace(/[\r\n]+/g, " ")}`,
        reply_to: email,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Message:</strong><br>${safeMessage}</p>`,
      }),
    });
  } catch (error) {
    console.error("Resend request could not be completed", error);
    return json({ error: "Unable to send your message right now." }, 502);
  }

  if (!resendResponse.ok) {
    console.error("Resend request failed", {
      status: resendResponse.status,
      requestId: resendResponse.headers.get("x-request-id"),
    });
    return json({ error: "Unable to send your message right now." }, 502);
  }

  return json({ success: true });
}

export default {
  async fetch(request: Request, env: CloudflareEnv): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      return handleContact(request, env);
    }

    if (url.pathname.startsWith("/api/")) {
      return json({ error: "Not found." }, 404);
    }

    return env.ASSETS.fetch(request);
  },
};
