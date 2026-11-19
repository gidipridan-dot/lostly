# Making the verification quiz more playful, with a light at the end of the tunnel

## What changes for the user
1. **A clear goal from the start.** A short screen opens the quiz: "3 quick questions, then your item is on its way to you." It shows an item icon and a "Let's go" button.
2. **A progress path instead of a thin bar.** Step dots run from left to right and end with an icon of the item heading home. Each correct answer lights up a step and moves the icon forward.
3. **A short message after each answer:**
   - Correct: "Exactly!" and "One more step to your item."
   - Wrong: "That's okay, you can still pass" (no shaming). It says how many correct answers are still needed.
4. **Small touches:** a gentle pop on a correct answer and a soft shake on a wrong one. A counter shows "2/2 correct – you're almost there."
5. **The finish line:**
   - Pass: a celebration screen with small confetti in the brand colours and "Your item is waiting for you". A button leads straight to choosing how to get it back.
   - Fail: an encouraging screen ("It happens, maybe the details came out differently") with "Try again". It also offers "Contact venue staff" as a way out.
6. **Quick and smooth:** an answer can be confirmed in one tap. After a short animation, the next question loads on its own.

The design stays premium and monochrome, with no colourful gradients and no fake numbers.

## Technical details
- Change only `src/components/verification-quiz.tsx`. Add `intro` / `quiz` / `result` steps, feedback copy, and a path of step dots with an icon by category.
- Add `pop`, `shake` and `confetti-fall` animations to `tailwind.config.ts`. The confetti is built from simple divs, with no new package.
- Replace the hardcoded `green-500` colours with existing design tokens (primary/foreground).
- Keep the `onResult` API so the claim and recovery flows don't change.
