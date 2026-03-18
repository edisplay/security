---
name: dependency-manager
description: Safely resolve and install isolated dependencies for isolated sandboxes (PoC execution).
---

Proceed with these steps to ensure isolated execution while bypassing full installer locks.

**Instructions:**

1.  **Locate and Read Dependency Files**:
    *   Use an MCP read_file tool to locate and read the closest dependency manifest files walking up from the `targetFile` coordinate.
    *   **TypeScript/Node.js**: Grab `package.json` and `package-lock.json`.
    *   **Python**: Grab `requirements.txt` or `Pipfile.lock`.
    *   **C++**: Check for `conanfile.txt` or `CMakeLists.txt`.
2.  **Extract Version Constraints**:
    *   Read the manifest files to find the exact version constraints for packages used in the PoC/verification code.
3.  **Bypass Full Installs (Node.js)**:
    *   Instruct commands to utilize prefixes like `npm_config_cache=.npx_cache` so downloads bypass global proxy auth locks.
4.  **Write Deterministic Running Script**:
    *   Generate a standalone dependency runner file on disk named deterministically e.g., `install_deps_<target_file_base>.sh` (or `.js`/`.py`).
5.  **Trigger Isolated Execute**:
    *   Call the `install_dependencies` Tool passing the generated script string block AND providing `targetFile` as an argument to let the tool calculate isolated execution contexts.
