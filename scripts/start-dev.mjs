import { execSync, spawn } from "child_process";
import { existsSync, rmSync } from "fs";

const PORT = 3000;

function killPort(port) {
  if (process.platform !== "win32") {
    try {
      execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: "ignore" });
    } catch {}
    return;
  }

  try {
    const lines = execSync("netstat -ano", { encoding: "utf8" }).split(/\r?\n/);
    const pids = new Set();
    for (const line of lines) {
      if (!line.includes("LISTENING") || !line.includes(`:${port}`)) continue;
      const pid = line.trim().split(/\s+/).at(-1);
      if (pid && /^\d+$/.test(pid)) pids.add(pid);
    }
    for (const pid of pids) {
      try {
        execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
      } catch {}
    }
  } catch {}
}

const clean = process.argv.includes("--clean");
killPort(PORT);

if (clean && existsSync(".next")) {
  rmSync(".next", { recursive: true, force: true });
  console.log("[dev] Cache .next supprime");
}

console.log(`[dev] Demarrage sur http://localhost:${PORT}`);
const cmd = process.platform === "win32" ? "npx.cmd" : "npx";
const child = spawn(cmd, ["next", "dev", "-p", String(PORT)], {
  stdio: "inherit",
  shell: false,
});

child.on("exit", (code) => process.exit(code ?? 0));