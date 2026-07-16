export const ADMIN_EMAILS = [
  "ciakudia@gmail.com",
  "semenceengita@gmail.com",
  "colettebansompili011@gmail.com",
] as const;

export function isAuthorizedAdminEmail(email?: string | null) {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.trim().toLowerCase() as (typeof ADMIN_EMAILS)[number]);
}
