# long-messages
Bookmarklet to let users post messages longer than 2000 characters to discord

# Caveats
- The bookmarklet just splits your text into chunks. You still have to press the enter key to send each chunk
- The bookmarklet will fill the chatbox with each chunk of text, however, in order for discord to register that the text has changed, you must type (and then you can delete) at least one character before pressing enter
- If you do not press the enter key within 5 minutes of the chat box being filled, the bookmarklet will give up.

# Usage
- Create a new bookmark
- Edit bookmark, replace the bookmark's URL with the contents of the file `bookmarklet.min.js`
- Activate the bookmark when you are ready to send a long message
