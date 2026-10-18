#!/usr/bin/env node

const { spawnSync } = require("node:child_process");

const herdr = process.env.HERDR_BIN_PATH || "herdr";

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    stdio: ["pipe", "pipe", "inherit"],
    ...options,
  });

  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
  return result.stdout || "";
}

try {
  const response = JSON.parse(run(herdr, ["tab", "list"]));
  const tabs = response?.result?.tabs ?? response?.tabs ?? [];
  const workspaceResponse = JSON.parse(run(herdr, ["workspace", "list"]));
  const workspaces = workspaceResponse?.result?.workspaces ?? workspaceResponse?.workspaces ?? [];
  const workspaceNames = new Map(
    workspaces.map((workspace) => [workspace.workspace_id, workspace.label]),
  );

  if (!Array.isArray(tabs) || tabs.length === 0) {
    console.error("No Herdr tabs found.");
    process.exit(0);
  }

  // Keep the stable tab id hidden in column one; show space and tab names in fzf.
  const choices = tabs.map((tab) => {
    const space = String(workspaceNames.get(tab.workspace_id) || tab.workspace_id || "(unknown space)").replace(/[\t\r\n]/g, " ");
    const label = String(tab.label || "(unnamed)").replace(/[\t\r\n]/g, " ");
    return `${tab.tab_id}\t${space} > ${label}`;
  }).sort((a, b) =>
    a.slice(a.indexOf("\t") + 1).localeCompare(
      b.slice(b.indexOf("\t") + 1),
      undefined,
      { sensitivity: "base", numeric: true },
    ),
  );

  const selected = run(
    "fzf",
    ["--delimiter=\t", "--with-nth=2", "--prompt=Tab> ", "--layout=reverse", "--border"],
    { input: `${choices.join("\n")}\n` },
  ).trim();

  // fzf exits nonzero on Escape; this is a normal cancellation.
  if (!selected) process.exit(0);

  const tabId = selected.split("\t", 1)[0];
  if (!tabId) throw new Error("fzf returned a selection without a tab id");
  run(herdr, ["tab", "focus", tabId]);
} catch (error) {
  console.error(`herdr-fzf-tab-switcher: ${error.message}`);
  process.exit(1);
}
