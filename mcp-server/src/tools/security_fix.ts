/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from 'zod';
import { loadKnowledge, VulnerabilityType } from '../knowledge.js';
import { promises as fs } from 'fs';

export const SECURITY_FIX_TOOL_NAME = 'security:fix';
export const SECURITY_FIX_TOOL_DESCRIPTION = 'Fixes a security vulnerability in a given file using best practices from the knowledge base. You MUST call this tool BEFORE attempting to fix any vulnerabilities.';

export const SecurityFixArgsSchema = z.object({
  vulnerability: z.nativeEnum(VulnerabilityType).describe('The type of vulnerability to fix. You must infer this from the user\'s request or the problem context.'),
  filePath: z.string().describe('The absolute path to the file that needs fixing. You must provide the exact path.'),
  pocFilePath: z.string().describe('The absolute path to the PoC file that demonstrates the vulnerability. You must provide the exact path, or an empty string if the PoC does not exist.'),
  vulnerabilityContext: z.string().describe('A description of the vulnerability and where it occurs (line numbers, etc). You must extract this from the context.'),
});

export type SecurityFixArgs = z.infer<typeof SecurityFixArgsSchema>;

export async function getSecurityFixContext(args: SecurityFixArgs) {
  const { vulnerability, filePath, pocFilePath, vulnerabilityContext } = args;
  const knowledge = await loadKnowledge(vulnerability);
  let fileContent = '';

  if (filePath) {
    try {
      fileContent = await fs.readFile(filePath, 'utf-8');
    } catch (e) {
      fileContent = `Error reading file: ${(e as Error).message}`;
    }
  }

  return {
    content: [
      {
        type: 'text',
        text: `## Patch Context:
**Knowledge Base:**
${knowledge}

**Context:**
${vulnerabilityContext || 'No specific context provided.'}

**Target File:**
${filePath || 'No file provided.'}

**PoC File:**
\`\`\`
${pocFilePath || 'No content available.'}
\`\`\`

**File Content:**
\`\`\`
${fileContent || 'No content available.'}
\`\`\`

**Next Steps:**
Invoke the security-patcher skill to apply the fix.
`,
      },
    ],
  };
}