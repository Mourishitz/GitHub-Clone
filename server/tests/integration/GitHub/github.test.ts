test('GitHub API is up', async () => {
    const response = await fetch('https://api.github.com');
    expect(response.status).toBe(200);
});
