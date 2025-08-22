# CI/CD Reflection

1. Research what CI/CD is and why it's used in software development.

   - CI (Continuous Integration): Developers frequently merge code changes into a
     shared repository. Automated builds and tests run to detect issues early.
   - CD (Continuous Delivery/Deployment): Extends CI by automatically deploying
     tested code to staging or production environments.

   - Why it's used:
     - Faster feedback loop.
     - Early bug detection.
     - Reduced manual effort.
     - Consistent deployments.
     - Encourages small, incremental changes (safer and easier to review).

1. Set up a CI workflow that runs Markdown linting and spell checks on PRs in
   your repo.

   - I have set up the CI workflow in GitHub actions that checks for markdown
     linting and spell checks.

1. Experiment with Git Hooks (e.g., Husky) to enforce linting before commits.

   - The Husky script runs properly executing lint and spell check. Refer to .husky/pre-commit

1. Open a test PR in your repository and review the automated checks.

   - "This comment is for the purpose of testing the GitHub Actions Workflow PR Review"

1. Push your CI/CD configuration to your repo.

   -

1. What is the purpose of CI/CD?

   -

1. How does automating style checks improve project quality?

   -

1. What are some challenges with enforcing checks in CI/CD?

   -

1. How do CI/CD pipelines differ between small projects and large teams?

   -
