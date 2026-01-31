## 2026-01-31 - Optimizing Heavy Three.js Backgrounds
**Learning:** InstancedMesh is essential for large particle systems (3500+ items). Replacing individual Meshes with one InstancedMesh reduced draw calls from ~3500 to 1. Also, baking opacity into vertex colors (blending with background) allows disabling transparency, avoiding alpha sorting overhead.
**Action:** When porting legacy Three.js code, batch geometry with InstancedMesh and bake static effects like opacity into attributes where possible.

## 2026-01-31 - CSS content-visibility vs Fixed Position
**Learning:** `content-visibility: auto` applies `contain: paint`, which creates a containing block for fixed-position descendants. This causes fixed modals inside the optimized section to be clipped to the section's bounds, breaking their layout.
**Action:** When applying `content-visibility` optimizations, always verify that the target element does not contain fixed-position children (like modals or overlays) that need to break out of the container.
