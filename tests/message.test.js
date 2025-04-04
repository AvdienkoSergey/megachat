// Message handling tests
describe('Message functionality', () => {
  let megaChat;
  
  beforeEach(() => {
    // Create new MegaChat instance before each test
    megaChat = new MegaChat();
    // Clear the message storage
    megaChat.clearMessages();
  });
  
  test('should send a message', () => {
    // When a user sends a message
    const message = "Hello world";
    const result = megaChat.sendMessage(message);
    
    // Then the message should be saved
    expect(result.success).toBe(true);
    expect(result.message.originalText).toBe(message);
    expect(result.message.timestamp).toBeDefined();
    expect(result.message.status).toBe("отправлено");
  });
  
  test('should display message in chat', () => {
    // Given a sent message
    const message = "Test message";
    megaChat.sendMessage(message);
    
    // When getting message list
    const messages = megaChat.getMessages();
    
    // Then the message should be in the list
    expect(messages.length).toBeGreaterThan(0);
    expect(messages[0].text).toBe(message);
  });
  
  test('should show message status', () => {
    // Given a sent message
    const result = megaChat.sendMessage("Status test");
    const messageId = result.message.id;
    
    // When getting message status
    const status = megaChat.getMessageStatus(messageId);
    
    // Then status should be valid
    expect(status).toBeDefined();
    expect(['отправлено', 'обрабатывается', 'обработано', 'ошибка']).toContain(status);
  });
}); 