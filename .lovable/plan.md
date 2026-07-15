## Bugs & polish pass

After auditing every page and shared component, here's what I found and want to fix. Nothing is a crash — but several classes are silent no-ops and a few flow details are rough.

### 1. Undefined utility classes (silent no-ops)

These classes are used in the code but not defined in `tailwind.config.ts` or `src/index.css`, so they render nothing:

- `hover-scale` — used on back buttons in LostFlow, FoundFlow, ClaimVerification
- `animate-fade-in` — used on every flow step wrapper
- `animate-scale-in` — used on submitted screens and mobile menu
- `animate-glow-pulse` — hero background blobs
- `animate-shimmer` — hero sparkle icon
- `text-display` — hero H1 (falls back to browser default, breaks intended typography)

Fix: add proper keyframes + utilities in `tailwind.config.ts` (`fadeIn`, `scaleIn`, `glowPulse`, `shimmer`) and register a `text-display` font-size, OR swap to existing Tailwind equivalents (`animate-in fade-in`, `text-5xl md:text-7xl`, `micro-bounce`). I'll add them to the config so existing usage lights up.

### 2. Logic bugs

- **RecoveryFlow reward step**: `disabled={demoItem.finderRewardPref === 'decline' && false}` — always evaluates to `false`. Dead code. Remove.
- **RecoveryFlow reward step**: When the finder declined or chose donate, we still show a "Skip reward" + "Continue" pair. Collapse to a single "Continue" button in that branch.
- **RecoveryFlow verify → recovery transition**: `handleVerificationResult` only advances on `passed`. On fail there's no retry affordance — user is stuck on the results screen inside the quiz. Add a "Try again" reset path.
- **LostFlow `goBack` from `submitted`**: falls through to `navigate('/')` — fine, but the auto-redirect after 3s still fires even if the user already navigated away. Clear the timeout on unmount.
- **VerificationQuiz `handleNext`**: computes `correctCount` twice (once unused). Simplify.

### 3. Design-system violations

- **FoundFlow submitted screen**: `text-white` hard-coded on the check icon (breaks dark mode). Swap to `text-primary-foreground` and use `bg-primary` gradient like LostFlow already does.
- **HeroSection preview cards**: `text-white` on the red/green tiles — acceptable since backgrounds are fixed gradients, but I'll leave as-is unless you want strict tokenization.

### 4. Responsive polish

- **Navigation**: between `sm` (640px) and `md` (768px) both the hamburger and the "Request Demo" CTA show. Hide the CTA until `md` (or hide hamburger until CTA disappears) so the header doesn't feel crowded on small tablets.
- **Flow pages on desktop**: `LostFlow`, `FoundFlow`, `ClaimVerification`, `RecoveryFlow` all constrain content to `max-w-md`. On wide screens the card feels lost in whitespace. Bump to `max-w-lg` and add a bit more vertical padding on `md+`.
- **RecoveryFlow header**: uses a fixed `w-10` spacer to balance the back button, but the progress dots row can wrap on narrow screens (<340px). Constrain with `flex-shrink-0` and shrink dot width slightly.
- **HeroSection headline**: with `text-display` undefined, the H1 currently renders at browser default. After adding the utility it will size correctly across breakpoints.
- **ItemDetailsForm**: color/condition badge rows can overflow horizontally on very small phones. Already uses `flex-wrap`, but the Input below them has no top margin when badges wrap into 3 rows. Add `mt-1`.

### 5. Files touched

```text
tailwind.config.ts                  (add keyframes + utilities + text-display)
src/pages/LostFlow.tsx              (cleanup timeout, max-w-lg, remove hover-scale)
src/pages/FoundFlow.tsx             (submitted colors, max-w-lg, remove hover-scale)
src/pages/ClaimVerification.tsx     (max-w-lg, remove hover-scale)
src/pages/RecoveryFlow.tsx          (reward branch buttons, verify retry, max-w-lg)
src/components/verification-quiz.tsx (simplify handleNext, expose retry)
src/components/navigation.tsx       (CTA breakpoint fix)
```

No new routes, no backend changes, no dependencies added.
