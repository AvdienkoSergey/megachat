// Plugin management tests
describe('Plugin functionality', () => {
  let megaChat;
  
  beforeEach(() => {
    megaChat = new MegaChat();
    megaChat.clearPlugins();
  });
  
  test('should create a plugin', () => {
    // Given plugin data
    const pluginName = "Test Plugin";
    const pluginCode = `
      function processMessage(message) {
        return message.toUpperCase();
      }
    `;
    
    // When creating a plugin
    const result = megaChat.createPlugin(pluginName, pluginCode);
    
    // Then plugin should be created
    expect(result.success).toBe(true);
    expect(result.plugin.name).toBe(pluginName);
    expect(result.plugin.createdAt).toBeDefined();
  });
  
  test('should delete a plugin', () => {
    // Given an existing plugin
    const { plugin } = megaChat.createPlugin("Delete Test", "// code");
    
    // When deleting the plugin
    const result = megaChat.deletePlugin(plugin.id);
    
    // Then plugin should be deleted
    expect(result.success).toBe(true);
    
    // And plugin should not be in the list
    const plugins = megaChat.getPlugins();
    const deletedPlugin = plugins.find(p => p.id === plugin.id);
    expect(deletedPlugin).toBeUndefined();
  });
  
  test('should find plugin by name', () => {
    // Given multiple plugins
    megaChat.createPlugin("First Plugin", "// code");
    megaChat.createPlugin("Second Plugin", "// code");
    
    // When searching for a plugin
    const results = megaChat.findPlugin("First");
    
    // Then correct plugin should be found
    expect(results.length).toBe(1);
    expect(results[0].name).toBe("First Plugin");
  });
}); 