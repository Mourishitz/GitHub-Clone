var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
describe('Test GitHub Repository endpoints', () => {
    const user = "Mourishitz";
    let repos;
    it('should fetch repositories', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://api.github.com/users/${user}/repos?per_page=2&page=1`);
        expect(response.status).toBe(200);
        repos = yield response.json();
    }));
    it('should have only 2 repositories', () => __awaiter(this, void 0, void 0, function* () {
        expect(repos).toHaveLength(2);
    }));
    it('should be instances of repository', () => __awaiter(this, void 0, void 0, function* () {
        repos.forEach((repository) => {
            expect(repository).toHaveProperty("id");
            expect(repository).toHaveProperty("node_id");
            expect(repository).toHaveProperty("name");
            expect(repository).toHaveProperty("full_name");
            expect(repository).toHaveProperty("private");
            expect(repository).toHaveProperty("owner");
            expect(repository).toHaveProperty("html_url");
            expect(repository).toHaveProperty("description");
            expect(repository).toHaveProperty("fork");
            expect(repository).toHaveProperty("url");
            expect(repository).toHaveProperty("forks_url");
            expect(repository).toHaveProperty("keys_url");
            expect(repository).toHaveProperty("collaborators_url");
            expect(repository).toHaveProperty("teams_url");
            expect(repository).toHaveProperty("hooks_url");
            expect(repository).toHaveProperty("issue_events_url");
            expect(repository).toHaveProperty("events_url");
            expect(repository).toHaveProperty("assignees_url");
            expect(repository).toHaveProperty("branches_url");
            expect(repository).toHaveProperty("tags_url");
            expect(repository).toHaveProperty("blobs_url");
            expect(repository).toHaveProperty("git_tags_url");
            expect(repository).toHaveProperty("git_refs_url");
            expect(repository).toHaveProperty("trees_url");
            expect(repository).toHaveProperty("statuses_url");
            expect(repository).toHaveProperty("languages_url");
            expect(repository).toHaveProperty("stargazers_url");
            expect(repository).toHaveProperty("contributors_url");
            expect(repository).toHaveProperty("subscribers_url");
            expect(repository).toHaveProperty("subscription_url");
            expect(repository).toHaveProperty("commits_url");
            expect(repository).toHaveProperty("git_commits_url");
            expect(repository).toHaveProperty("comments_url");
            expect(repository).toHaveProperty("issue_comment_url");
            expect(repository).toHaveProperty("contents_url");
            expect(repository).toHaveProperty("compare_url");
            expect(repository).toHaveProperty("merges_url");
            expect(repository).toHaveProperty("archive_url");
            expect(repository).toHaveProperty("downloads_url");
            expect(repository).toHaveProperty("issues_url");
            expect(repository).toHaveProperty("pulls_url");
            expect(repository).toHaveProperty("milestones_url");
            expect(repository).toHaveProperty("notifications_url");
            expect(repository).toHaveProperty("labels_url");
            expect(repository).toHaveProperty("releases_url");
            expect(repository).toHaveProperty("deployments_url");
            expect(repository).toHaveProperty("created_at");
            expect(repository).toHaveProperty("updated_at");
            expect(repository).toHaveProperty("pushed_at");
            expect(repository).toHaveProperty("git_url");
            expect(repository).toHaveProperty("ssh_url");
            expect(repository).toHaveProperty("clone_url");
            expect(repository).toHaveProperty("svn_url");
            expect(repository).toHaveProperty("visibility");
            expect(repository).toHaveProperty("default_branch");
            expect(repository).toHaveProperty("has_issues");
            expect(repository).toHaveProperty("has_projects");
            expect(repository).toHaveProperty("has_downloads");
            expect(repository).toHaveProperty("has_wiki");
            expect(repository).toHaveProperty("has_pages");
            expect(repository).toHaveProperty("has_discussions");
            expect(repository).toHaveProperty("archived");
            expect(repository).toHaveProperty("disabled");
            expect(repository).toHaveProperty("allow_forking");
            expect(repository).toHaveProperty("is_template");
            expect(repository).toHaveProperty("web_commit_signoff_required");
            expect(repository).toHaveProperty("homepage");
            expect(repository).toHaveProperty("size");
            expect(repository).toHaveProperty("stargazers_count");
            expect(repository).toHaveProperty("watchers_count");
            expect(repository).toHaveProperty("language");
            expect(repository).toHaveProperty("forks_count");
            expect(repository).toHaveProperty("mirror_url");
            expect(repository).toHaveProperty("open_issues_count");
            expect(repository).toHaveProperty("license");
            expect(repository).toHaveProperty("topics");
            expect(repository).toHaveProperty("forks");
            expect(repository).toHaveProperty("open_issues");
            expect(repository).toHaveProperty("watchers");
        });
    }));
    it('should be paginating', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://api.github.com/users/${user}/repos?per_page=2&page=2`);
        expect(response.status).toBe(200);
        const json = yield response.json();
        expect(json).not.toEqual(repos);
    }));
});
