# Work on Human Engineering with Codex

[Agent instructions](AGENTS.md) · [Repository map](docs/codex/REPO_MAP.md) · [Setup state](docs/codex/STATUS.md)

## Phone workflow
A private multi-repository Aviation environment can include all three repositories. Select that environment, then name the repository in your request. Separate environments are optional for focused work.

Use a published Codex Cloud environment for this repository. Tasks run on managed computers and can continue while your laptop is asleep. On mobile, select Codex, choose the published environment, and describe the result you want. Continue the same task for follow-ups; a new task has a separate workspace.

Suggested short prompt:
> Read AGENTS.md. <Describe the change>. Complete it, run the relevant checks, and give me a PR with a concise summary. For a long task, save a handoff so it can be resumed.

For unfinished work:
> Resume <PR/branch/task handoff>. Inspect current state and complete its next action, then verify the result.

A GitHub issue is a task specification, not an automatic Codex trigger. Creating an issue alone does not run an agent. GitHub-connected ChatGPT access also does not publish a Codex environment.

## Prepare a cloud environment once
1. On desktop/web, open [Codex Cloud](https://chatgpt.com/codex/cloud) and choose Create environment (or Settings > Codex Cloud > Environments).
2. Include steven-ford2/human-engineering and name it Human Engineering. Use Python 3.12 and Node 22 (Node is optional until an app needs it).
3. Ask the environment preparation task to run `python tools/codex/setup.py`, then `python tools/codex/check.py tooling`.
4. Publish the prepared environment, then select it on your phone. Keep it private to your account; no additional API key is needed for ChatGPT-plan Codex access.
5. Dependency downloads need package-registry access during preparation. For source research, configure network access appropriate to that task; code/test tasks can run without source browsing.

These files do not create or publish the account-side environment. Test the prepared environment before treating it as ready.
In a legacy environment's setup-script field use `python tools/codex/setup.py`; do not put API keys or GitHub tokens into this repository.

## Local or Codespaces fallback
The devcontainer installs Python 3.12 and Node 22, runs the setup script, and forwards port 8000 privately. Open the repo in GitHub Codespaces if you need an editor/terminal in a phone browser. Codespaces billing and quotas are separate from ChatGPT.
Install Codex CLI from its official npm package with `npm install -g @openai/codex`, run `codex`, and choose ChatGPT sign-in. A GitHub/Copilot subscription does not replace ChatGPT authentication. Codex CLI is deliberately not installed automatically by this repo.

The repository includes a static Human Engineering site. Build it with `python platform/build.py --profile pages`, serve `platform/dist` on port 8000, and preview it at the forwarded address.

## Efficient execution
- Use the repository map and scope searches to one course/domain before widening.
- `python tools/codex/context.py "helmet" --path docs --limit 20` returns bounded file/line snippets. It does not create a second full-text corpus.
- `python tools/codex/check.py tooling` validates the portable workflow.
- `python tools/codex/check.py platform` validates the application and corpus; `full` runs the complete configured profile.
- Do not rerun a full source conversion for a wording change. For source edits run the affected validators and inspect citations/locators; UI edits also require browser QA at desktop and phone widths.
- For parallel work use separate tasks and branches. Git commits/PRs carry durable state across devices; uncommitted files from one task are not present in a new task.

## Reference documentation
Verified 2026-10-14; interfaces and availability can change.
- [Using Codex Cloud](https://help.openai.com/en/articles/20001545-using-codex-cloud)
- [Codex Cloud setup](https://developers.openai.com/codex/cloud)
- [Repository instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- [Codex CLI](https://developers.openai.com/codex/cli)
