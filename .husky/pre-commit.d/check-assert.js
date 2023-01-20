#!/usr/bin/env node
const { execSync } = require('child_process');

const ruleHeading = 'favor-jest-instead-of-mocha';
const codeBlocks = [
  "import { strict as assert } from 'assert';",
  'assert.equal',
  'assert.strictEqual',
  'assert.rejects',
  'assert.deepEqual',
  'sinon.',
];

const relevantFilesInCurrentCommit = execSync(
  `git diff-index --cached --name-only HEAD -- '*.js' '*.ts'`,
)
  .toString()
  .split('\n')
  .filter((file) => file !== '');

if (relevantFilesInCurrentCommit.length === 0) {
  process.exit(0);
}

for (const codeBlock of codeBlocks) {
  console.log(`Checking commited changes for statement "${codeBlock}"...`);

  let numberCurrentOccurences, numberAfterChangesOccurences;
  for (const file of relevantFilesInCurrentCommit) {
    const currentOccurences =
      execSync(`git grep -c "${codeBlock}" $(git rev-parse HEAD):${file} | cat`)
        .toString()
        .trim()
        .split(':')[2] || 0;
    numberCurrentOccurences = Number(currentOccurences);

    const afterChangesOccurences = execSync(
      `grep -o "${codeBlock}" ${file} | wc -l`,
    )
      .toString()
      .trim();
    numberAfterChangesOccurences = Number(afterChangesOccurences);

    if (numberAfterChangesOccurences > numberCurrentOccurences) {
      console.error(
        `...changes have not been committed because the number of occurences (${numberCurrentOccurences}) has increased (${numberAfterChanges}) for this file: ${file}.\nFor more info, see: https://github.com/MetaMask/metamask-extension/blob/develop/docs/testing.md#${ruleHeading}`,
      );
      process.exit(1);
    }
  }
}

console.log(`...number of occurences has not increased for any code block.`);
process.exit(0);
