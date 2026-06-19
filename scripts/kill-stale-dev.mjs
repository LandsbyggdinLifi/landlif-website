// Runs automatically via the `predev` npm hook before `next dev`.
// On Windows, stopping `npm run dev` (Ctrl+C / closing the terminal) often
// leaves the `next-server` child process orphaned — still watching files and
// holding ~1.4 GB of RAM. Repeated restarts accumulate these and can exhaust
// memory. This clears any stale Next dev processes before starting a fresh one.
//
// It ONLY targets Next's own processes (the `next/dist/bin/next` launcher and
// the `next-server` child), never your editor or other Node processes. On
// non-Windows platforms it is a no-op. It never fails the dev start.

import { spawnSync } from "node:child_process";

if (process.platform !== "win32") {
  process.exit(0);
}

const ps = [
  "Get-CimInstance Win32_Process -Filter \"Name='node.exe'\"",
  "| Where-Object { $_.CommandLine -match 'next-server|next[\\\\/]dist[\\\\/]bin[\\\\/]next' }",
  "| ForEach-Object {",
  "    Write-Output ('Cleared stale Next dev process PID ' + $_.ProcessId);",
  "    Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue",
  "  }",
].join(" ");

try {
  spawnSync("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", ps], {
    stdio: "inherit",
  });
} catch {
  // Never block `npm run dev` on cleanup failure.
}

process.exit(0);
