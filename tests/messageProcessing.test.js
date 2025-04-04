// Message processing by plugins tests
describe('Message processing functionality', () => {
  let megaChat;
  
  beforeEach(() => {
    megaChat = new MegaChat();
    megaChat.clearMessages();
    megaChat.clearPlugins();
  });
  
  test('should process message with plugin', async () => {
    // Given a plugin that converts text to uppercase
    megaChat.createPlugin("Uppercase Plugin", `
      function processMessage(message) {
        return message.toUpperCase();
      }
    `);
    
    // When sending a message
    const result = await megaChat.sendMessage("hello");
    
    // Then message should be processed
    expect(result.message.text).toBe("HELLO");
    expect(result.message.originalText).toBe("hello");
    expect(result.message.processedByPlugins).toBe(true);
  });
  
  test('should handle plugin processing errors', async () => {
    // Given a plugin with an error
    megaChat.createPlugin("Error Plugin", `
      function processMessage(message) {
        throw new Error("Test error");
      }
    `);
    
    // When sending a message
    const result = await megaChat.sendMessage("test");
    
    // Then message should not be changed but marked as processed
    expect(result.message.text).toBe("test");
    expect(result.message.status).toBe("обработано");
    expect(result.message.processedByPlugins).toBe(true);
  });
  
  test('should process message with multiple plugins', async () => {
    // Given multiple plugins
    megaChat.createPlugin("Uppercase Plugin", `
      function processMessage(message) {
        return message.toUpperCase();
      }
    `);
    megaChat.createPlugin("Add Hello Plugin", `
      function processMessage(message) {
        return "Hello, " + message;
      }
    `);
    
    // When sending a message
    const result = await megaChat.sendMessage("world");
    
    // Then message should be processed by both plugins
    expect(result.message.text).toBe("HELLO, world");
    expect(result.message.plugins.length).toBe(2);
  });
}); 