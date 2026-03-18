---
name: security-patcher
description: Use this skill to patch security vulnerabilties in the users' code.
---

Proceed with the following instructions using the context provided by the security:fix tool. Do not use any other context.

**Instructions:**
1. Given the context, determine if the vulnerability has been verified with a PoC.
  a. If not, use the `ask_user` tool to ask if they'd like to verify the vulnerability with the `setup_poc` tool.
2. Analyze the file content and the knowledge base.
3. Use the `ask_user` tool to ask if they would like to apply the secure coding patterns described in the knowledge base to fix the vulnerability in the target file.
4. If you have the file content, output the complete fixed file content or a patch.
5. Use the `ask_user` tool to ask if they would like to verify the patch (Yes/No) 
6. If yes, verify by:
  a. Running the existing PoC if it exists.
  b. Creating a PoC using the `setup_poc` tool if it doesn't exist.