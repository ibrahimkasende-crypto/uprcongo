/**
 * Active Netlify Identity, Git Gateway et envoie les invitations admin.
 *
 * Usage:
 *   $env:NETLIFY_AUTH_TOKEN="votre_token"
 *   npm run admin:setup
 */
const INVITED_USERS = [
  "ciakudia@gmail.com",
  "semenceengita@gmail.com",
  "colettebansompili011@gmail.com",
];

const API_BASE = "https://api.netlify.com/api/v1";

async function api(path, options = {}) {
  const token = process.env.NETLIFY_AUTH_TOKEN;
  if (!token) {
    throw new Error("NETLIFY_AUTH_TOKEN manquant. Creez un token sur https://app.netlify.com/user/applications");
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const message = typeof data === "object" && data && data.message ? data.message : text;
    throw new Error(`${options.method || "GET"} ${path} -> ${response.status} ${message}`);
  }

  return data;
}

async function findSite() {
  const sites = await api("/sites?filter=all&per_page=100");
  const candidates = sites.filter((site) => {
    const name = String(site.name || "").toLowerCase();
    const domain = String(site.custom_domain || "").toLowerCase();
    const aliases = (site.domain_aliases || []).map((value) => String(value).toLowerCase());
    return (
      name.includes("uprcongo") ||
      domain === "uprcongo.cd" ||
      aliases.includes("uprcongo.cd") ||
      String(site.url || "").includes("uprcongo")
    );
  });

  if (!candidates.length) {
    throw new Error("Site Netlify UPR Congo introuvable. Verifiez le token et le nom du site.");
  }

  return candidates[0];
}

async function ensureIdentity(siteId) {
  try {
    return await api(`/sites/${siteId}/identity`, { method: "POST" });
  } catch (error) {
    if (String(error.message).includes("422") || String(error.message).includes("409")) {
      return api(`/sites/${siteId}/identity`);
    }
    throw error;
  }
}

async function configureIdentity(siteId, identity) {
  const identityId = identity.id || identity.ID;
  if (!identityId) {
    throw new Error("Instance Identity introuvable pour ce site.");
  }

  await api(`/sites/${siteId}/identity/${identityId}`, {
    method: "PUT",
    body: JSON.stringify({
      disable_signup: true,
      autoconfirm: true,
    }),
  });

  return identityId;
}

async function enableGitGateway(siteId, identityId) {
  try {
    await api(`/sites/${siteId}/identity/${identityId}`, {
      method: "PUT",
      body: JSON.stringify({
        git_gateway_enabled: true,
      }),
    });
    return true;
  } catch (error) {
    console.warn("Git Gateway via API non confirme:", error.message);
    console.warn("Activez-le manuellement: Site configuration > Identity > Services > Git Gateway > Enable");
    return false;
  }
}

async function inviteUsers(siteId, identityId) {
  for (const email of INVITED_USERS) {
    try {
      await api(`/sites/${siteId}/identity/${identityId}/invite`, {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      console.log(`Invitation envoyee: ${email}`);
    } catch (error) {
      if (String(error.message).includes("422") || String(error.message).includes("already")) {
        console.log(`Deja invite ou existant: ${email}`);
      } else {
        console.warn(`Invitation echouee pour ${email}:`, error.message);
      }
    }
  }
}

async function main() {
  console.log("Configuration de l'administration UPR Congo sur Netlify...");

  const site = await findSite();
  console.log(`Site trouve: ${site.name} (${site.ssl_url || site.url})`);

  const identity = await ensureIdentity(site.id);
  const identityId = await configureIdentity(site.id, identity);
  console.log("Identity activee (Invite only).");

  const gitGateway = await enableGitGateway(site.id, identityId);
  if (gitGateway) {
    console.log("Git Gateway active.");
  }

  await inviteUsers(site.id, identityId);

  const adminUrl = `${site.ssl_url || site.url}/admin/`;
  console.log("");
  console.log("Configuration terminee.");
  console.log(`Admin: ${adminUrl}`);
  console.log("Chaque responsable doit ouvrir l'email d'invitation et definir son mot de passe.");
}

main().catch((error) => {
  console.error("Echec de configuration:", error.message);
  process.exit(1);
});