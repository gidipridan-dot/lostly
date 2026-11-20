# Architecture
- Keep venue-specific demo presentation scoped to its own route family and CSS theme so the default Lostly experience remains unchanged.
- Reuse item-detail capture, camera capture, and verification components in venue demos; keep illustrative reports in React state and clearly identify the demo as non-live.
- Keep the festival reunion journey in a shared component with explicit state transitions so reported items and direct sample matches share the same notification-to-handover flow; notifications are in-app simulations, not messaging workers.