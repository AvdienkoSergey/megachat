// IndexDB storage tests
describe('Storage functionality', () => {
  let storage;
  
  beforeEach(async () => {
    // Initialize storage
    storage = new Storage();
    await storage.clear();
  });
  
  test('should save message to IndexDB', async () => {
    // Given a message
    const message = {
      id: "test-id-1",
      text: "Test storage",
      originalText: "Test storage",
      timestamp: Date.now(),
      status: "отправлено",
      processedByPlugins: false,
      plugins: []
    };
    
    // When saving to storage
    await storage.saveMessage(message);
    
    // Then message should be retrievable
    const savedMessage = await storage.getMessage(message.id);
    expect(savedMessage).toEqual(message);
  });
  
  test('should save plugin to IndexDB', async () => {
    // Given a plugin
    const plugin = {
      id: "plugin-id-1",
      name: "Test Plugin",
      code: new Blob(["function test() {}"], {type: 'text/javascript'}),
      createdAt: Date.now(),
      lastUsed: Date.now()
    };
    
    // When saving to storage
    await storage.savePlugin(plugin);
    
    // Then plugin should be retrievable
    const savedPlugin = await storage.getPlugin(plugin.id);
    expect(savedPlugin.id).toEqual(plugin.id);
    expect(savedPlugin.name).toEqual(plugin.name);
  });
}); 