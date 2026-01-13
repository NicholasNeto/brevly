export async function copyToClipboard(text: string): Promise<boolean> {
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API not supported");
      }
  
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error("Failed to copy:", error);
      return false;
    }
  }
  