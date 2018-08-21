/**
 * Entry point
 */

/**
 * Called when bookmarklet cannot continue
 * @param msg error message
 */
function fail(msg: string): never {
    alert("The long-messages bookmarklet has failed :(");
    throw new Error(msg);
}

/**
 * Locate the DOM textarea element that users enter messages into
 */
function findMessageElement(): HTMLTextAreaElement {
    const ele = document.querySelector("textarea[placeholder^='Message']");
    if (ele === null) { fail("Could not find textarea"); }
    return ele as HTMLTextAreaElement;
}

/**
 * Splits a large amount of text into chunks of 1800 or less characters
 */
function chunkText(text: string): string[] {
    const chunks = text.split(/(.{1800})/);
    return chunks.filter(Boolean);
}

/**
 * Returns a promise that resolves next time Discords chat box is empty
 */
function readyForNextChunk(): Promise<void> {
    // 5 minutes
    let timeout = 100000;
    const chat = findMessageElement();
    return new Promise((resolve, reject) => {
        const handle = setInterval(() => {
            if ((--timeout) === 0) { clearInterval(handle); reject(); fail("Timeout"); }
            if (chat.value.length === 0) { resolve(); clearInterval(handle); }
        }, 100);
    });
}

/**
 * Prompt the user for text then send it with several enter presses
 */
async function promptForLongtext(): Promise<void> {
    const longtext = prompt("Paste your long text here. Then press enter as" +
        "you see each chunk appear in Discord's chat box");
    const chat = findMessageElement();
    if (longtext === null) { fail("No text pasted in prompt"); } else {
        const chunked = chunkText(longtext);
        for (const chunk of chunked) {
            await readyForNextChunk();
            chat.value = chunk;
        }
    }
}

promptForLongtext();
