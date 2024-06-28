export function cleanupResources() {
    if (typeof ws !== 'undefined' && ws) {
        ws.close();
    }
}
