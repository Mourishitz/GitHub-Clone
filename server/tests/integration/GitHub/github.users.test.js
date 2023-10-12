var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
describe('Test GitHub User endpoints', () => {
    let users;
    it('should fetch users', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('https://api.github.com/users?per_page=5&since=0');
        expect(response.status).toBe(200);
        users = yield response.json();
    }));
    it('should have only 5 users', () => __awaiter(this, void 0, void 0, function* () {
        expect(users).toHaveLength(5);
    }));
    it('should be instances of user', () => __awaiter(this, void 0, void 0, function* () {
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
    }));
    it('should be paginating', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('https://api.github.com/users?per_page=5&since=5');
        expect(response.status).toBe(200);
        const json = yield response.json();
        expect(json).not.toEqual(users);
    }));
});
