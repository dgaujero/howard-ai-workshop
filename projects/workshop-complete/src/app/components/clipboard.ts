/** Resolve only after the browser confirms a write; callers must offer a manual fallback. */
export async function writePrompt(text: string): Promise<void> {
  if (!navigator.clipboard?.writeText) {
    throw new Error('Clipboard writing is unavailable.');
  }
  await navigator.clipboard.writeText(text);
}
