#!/usr/bin/env node
// PreToolUse hook: blocks Edit/Write to index.html if the change would
// remove client-side validation for the #enquiry-form name/email/phone fields.
const fs = require('fs');
const path = require('path');

let input = '';
process.stdin.on('data', (chunk) => { input += chunk; });
process.stdin.on('end', () => {
  let payload;
  try {
    payload = JSON.parse(input);
  } catch {
    process.exit(0);
  }

  const toolName = payload.tool_name;
  const toolInput = payload.tool_input || {};
  const filePath = toolInput.file_path;

  if (!filePath || path.basename(filePath).toLowerCase() !== 'index.html') {
    process.exit(0);
  }

  let prospective;
  try {
    if (toolName === 'Write') {
      prospective = toolInput.content || '';
    } else if (toolName === 'Edit') {
      const current = fs.readFileSync(filePath, 'utf8');
      const oldStr = toolInput.old_string || '';
      const newStr = toolInput.new_string || '';
      if (toolInput.replace_all) {
        prospective = current.split(oldStr).join(newStr);
      } else {
        const idx = current.indexOf(oldStr);
        if (idx === -1) process.exit(0); // let Edit tool report the no-match error itself
        prospective = current.slice(0, idx) + newStr + current.slice(idx + oldStr.length);
      }
    } else {
      process.exit(0);
    }
  } catch {
    process.exit(0);
  }

  const checks = [
    { label: 'name input field (#name)', test: /id=["']name["']/ },
    { label: 'name required check (nameField.value.trim())', test: /nameField\.value\.trim\(\)/ },
    { label: 'email input field (#email)', test: /id=["']email["']/ },
    { label: 'email format check (emailRegex.test)', test: /emailRegex\.test\(/ },
    { label: 'phone input field (#phone)', test: /id=["']phone["']/ },
    { label: 'phone format check (phoneRegex.test)', test: /phoneRegex\.test\(/ },
  ];

  const failed = checks.filter((c) => !c.test.test(prospective));

  if (failed.length > 0) {
    console.error(
      'Blocked edit to index.html: contact form validation is incomplete.\n' +
      'Missing: ' + failed.map((f) => f.label).join(', ') + '.\n' +
      'The #enquiry-form must keep client-side validation for name, email, and phone ' +
      '(see emailRegex/phoneRegex and the setError() calls in the submit handler).'
    );
    process.exit(2);
  }

  process.exit(0);
});
