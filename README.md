# herdr-fzf-tab-switcher

A Herdr plugin that opens an fzf picker in a floating popup. Entries are sorted alphabetically and shown as `space > tab`; selecting one focuses that tab.

## Requirements

- Herdr 0.9.0 or newer
- Node.js
- `fzf` on `PATH`

## Install

```sh
herdr plugin install trebsoj/herdr-fzf-tab-switcher
```

## Open the picker manually

If you have not configured a keyboard shortcut, open the picker on demand with:

```sh
herdr plugin pane open --plugin herdr-fzf-tab-switcher --entrypoint tab-picker
```

To develop locally, clone this repository and link the working directory:

```sh
git clone https://github.com/trebsoj/herdr-fzf-tab-switcher.git
cd herdr-fzf-tab-switcher
herdr plugin link .
herdr plugin pane open --plugin herdr-fzf-tab-switcher --entrypoint tab-picker
```

Press Enter to switch to the selected tab; Escape closes the picker.

## Optional keyboard shortcut

Add a custom command to `~/.config/herdr/config.toml` to open the picker with a key chord. For example, this binds it to `prefix+t` (press your Herdr prefix, then `t`):

```toml
[[keys.command]]
key = "prefix+t"
type = "shell"
command = "herdr plugin pane open --plugin herdr-fzf-tab-switcher --entrypoint tab-picker"
description = "switch tab with fzf"
```

Choose a chord that is not already bound in your config. Herdr's default prefix is `ctrl+b`; if you use `prefix+b`, note that Herdr binds it to the sidebar by default, so move `toggle_sidebar` to another chord first.

## License

[BSD Zero Clause License (0BSD)](LICENSE) — use, copy, modify, and distribute it for any purpose, with or without a fee, without an attribution requirement. It is provided without warranty.
