# Architecture
- Keep venue-specific demo presentation scoped to its own route family and CSS theme so the default Lostly experience remains unchanged.
- Use /festival as the single public demo entrance; redirect legacy demo URLs to the corresponding festival journey so visitors never encounter competing demos.
- Reuse item-detail capture, camera capture, and verification components in venue demos; keep illustrative reports in React state and clearly identify the demo as non-live.
- Keep the festival reunion journey in a shared component with explicit state transitions so reported items and direct sample matches share the same notification-to-handover flow; notifications are in-app simulations, not messaging workers.
- Share the festival quest trail across reporting and reunion, and opt into festival quiz presentation with a prop so classic verification stays unchanged.
- Show festival progression through the shared light-path visual driven by the reunion stage index, replacing duplicate progress displays so the light grows consistently from report to reunion.
- When the chosen category is the catch-all "Other", the item-name field is the first thing to fill and the typed name replaces "Other" in every flow string; keep that rule in src/lib/item-naming.ts so all flows (classic and venue demos) behave the same.
