## 2026-01-31 - Optimizing Heavy Three.js Backgrounds
**Learning:** InstancedMesh is essential for large particle systems (3500+ items). Replacing individual Meshes with one InstancedMesh reduced draw calls from ~3500 to 1. Also, baking opacity into vertex colors (blending with background) allows disabling transparency, avoiding alpha sorting overhead.
**Action:** When porting legacy Three.js code, batch geometry with InstancedMesh and bake static effects like opacity into attributes where possible.
