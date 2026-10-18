# herdr-fzf-tab-switcher

A Herdr plugin that opens an fzf picker in a floating popup. Entries are sorted alphabetically and shown as `space > tab`; selecting one focuses that tab.

## Requirements

- Herdr 0.9.0 or newer
- Node.js
- `fzf` on `PATH`

## Install

```sh
herdr plugin install trebsoj/herdr-fzf-tab-switcher
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
