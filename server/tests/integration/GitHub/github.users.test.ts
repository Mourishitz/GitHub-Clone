describe('Test GitHub User endpoints', () => {
    let users;

    it('should fetch users', async () => {
        const response = await fetch('https://api.github.com/users?per_page=5&since=0');
        expect(response.status).toBe(200);
    
        users = await response.json();
    });

    it('should have only 5 users', async () => {
        expect(users).toHaveLength(5);
    });

    it('should be instances of user', async () => {
        users.forEach((user) => {
            expect(user).toHaveProperty("id");
            expect(user).toHaveProperty("login");
            expect(user).toHaveProperty("node_id");
            expect(user).toHaveProperty("avatar_url");
            expect(user).toHaveProperty("gravatar_id");
            expect(user).toHaveProperty("url");
            expect(user).toHaveProperty("html_url");
            expect(user).toHaveProperty("followers_url");
            expect(user).toHaveProperty("following_url");
            expect(user).toHaveProperty("gists_url");
            expect(user).toHaveProperty("starred_url");
            expect(user).toHaveProperty("subscriptions_url");
            expect(user).toHaveProperty("organizations_url");
            expect(user).toHaveProperty("repos_url");
            expect(user).toHaveProperty("events_url");
            expect(user).toHaveProperty("received_events_url");
            expect(user).toHaveProperty("type");
            expect(user).toHaveProperty("site_admin");
        });
    });

    it('should be paginating', async () => {
        const response = await fetch('https://api.github.com/users?per_page=5&since=5');
        expect(response.status).toBe(200);

        const json = await response.json();

        expect(json).not.toEqual(users);
    });
});
