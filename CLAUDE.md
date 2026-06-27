# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

This is a single-page static marketing site for "BuildWorks Software," a fictional custom software development company. The entire site is one self-contained file: [index.html](index.html). There is no build system, package manager, server, or test suite — just plain HTML, CSS, and vanilla JavaScript inlined in `<style>` and `<script>` tags.

## Working with this codebase

- There is nothing to install, build, or compile. Open [index.html](index.html) directly in a browser to preview changes.
- All styles live in the `<style>` block in `<head>`; all behavior lives in the single IIFE at the bottom of `<body>`. Keep new CSS/JS inline in this same file rather than splitting into separate assets, to stay consistent with the current single-file structure.
- The page is organized into clearly id-tagged `<section>`s (`#home`, `#services`, `#testimonials`, `#contact`) linked from the nav — when adding content, follow this same section + anchor-link pattern.

## Architecture notes

- **Responsive nav**: a hamburger toggle (`#nav-toggle`) shows/hides `#nav-links` below the 768px breakpoint; above it, CSS media queries switch the nav to a horizontal flex row and hide the toggle button.
- **Contact form**: `#enquiry-form` is validated entirely client-side in JS (required name/message, regex-checked email) with inline error messages (`.error-msg`) toggled via the shared `setError()` helper. On success it currently only `console.log`s the form data and shows `#form-success` — there is no real backend submission. A commented-out `fetch(...)` stub in the script shows where a POST to a backend endpoint would go if/when one is added.
