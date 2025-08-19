# Git Understanding

📌 Merge Conflicts & Conflict Resolution

1. Research what causes merge conflicts in Git.

Merge conflicts happen when Git cannot automatically reconcile differences
between two branches you’re trying to merge. This usually occurs when changes
affect the same lines of code or nearby sections in the same file, or when there
are incompatible changes in the project history.

Causes:

- Concurrent edits to the same lines: If two people edit the same line(s) in a
  file differently, Git doesn’t know which change to keep.
- Overlapping changes in nearby lines: Even if edits are not on the exact same
  line, if they’re close enough, Git might not be able to merge them cleanly.
- File deletions and modifications: If one branch deletes a file while another
  modifies it, Git will flag a conflict.
- Different changes to the same file metadata: Changes to file permissions or
  renaming can also cause conflicts.
- Merging unrelated histories: When trying to merge two repos or branches
  without a common ancestor, Git can’t automatically combine the histories.

1. Create a merge conflict in your test repo by:

- Creating a branch and editing a file.
- Switching back to main, making a conflicting edit in the same file, and
  committing it.
- Merging the branch back into main.

"This is the merge conflict - 1" "This is the merge conflict - 2"

1. Use your Git desktop client to resolve the conflict.

1. Write about your experience in git_understanding.md:

- What caused the conflict?

A change in the same line of an md file

- How did you resolve it?

By letting the changes on both branch go through

- What did you learn?

Merge Conflicts are easy to resolve if you are able to understand what's causing
the conflict and what changes are actually needed

📌 Staging vs Committing

- Git Exercise

1. Modify a file and try the following:
1. Stage it but don’t commit (git add <file> or equivalent in your client).
1. Check the status (git status).
1. Unstage the file (git reset HEAD <file> or equivalent).
5. Commit the file and observe the difference.

Summary:

1. What is the difference between staging and committing?

- Staging means selecting specific changes you want to include in your next
  commit. The changes are placed into Git’s staging area, but they aren’t yet
  saved to the repository’s history.
- Committing means taking everything currently staged and creating a permanent
  snapshot in the repository’s history with a commit message.

1. Why does Git separate these two steps?

- Git separates staging and committing so you can:
  - Review and fine-tune exactly which changes go into a commit.
  - Group related changes into one commit and exclude unrelated changes.
  - Avoid committing incomplete or experimental edits accidentally.

1. When would you want to stage changes without committing?

- You might stage without committing when:
  - You want to prepare part of your work for a clean commit but are still
    making more edits.
  - You need to group related file changes together before committing.
  - You’re working on a large feature and want to commit it in logical chunks
    later.

📌 Branching & Team Collaboration

1. Why is pushing directly to main problematic?

- It can introduce bugs directly into the live, production-ready code without
  review.
- It bypasses collaboration checks, meaning mistakes or incomplete features
  could affect everyone.
- It makes tracking changes harder since all edits pile into one branch without
  clear feature separation.

1. How do branches help with reviewing code?

- Branches isolate changes so you can develop features, fixes, or experiments
  without touching main.
- They make it easier to open pull requests (or merge requests) for teammates to
  review before merging.
- They allow discussions, suggestions, and testing to happen before code reaches
  the main branch.

1. What happens if two people edit the same file on different branches?

- When the branches are later merged, Git will try to combine the changes
  automatically.
- If the edits affect the same lines or overlapping parts, Git can’t decide
  which version to keep — this creates a merge conflict.
- The conflict must be resolved manually by choosing, combining, or editing the
  changes.

📌 Advanced Git Commands & When to Use Them

1. What does each command do?

- git checkout main -- <file> This command allows you to restore a specific file
  from the main branch into your current working directory—without impacting
  other changes around it. It’s handy if you need to revert or inspect just one
  file from another branch.

- git cherry-pick <commit> This command applies the changes from a specific
  commit on another branch to your current branch. It’s especially useful when
  you want to integrate a bug fix or small improvement without merging the
  entire branch.

- git log This command shows the commit history of your repository—displaying
  each commit’s hash, author, date, and message. It’s a powerful way to review
  how the project has evolved and understand the context behind changes.

- git blame <file> The git blame command annotates each line in a file with
  information about who last modified it and when. It helps you trace code
  ownership—great for debugging or understanding code history.

1. When would you use it in a real project (hint: these are all really important
   in long running projects with multiple developers)?

- git checkout main -- <file> If another developer fixed a bug in main and you
  just need that single file’s update without pulling everything else. For
  example, restoring a config file that you accidentally broke while working on
  a feature branch.

- git cherry-pick <commit> When a critical hotfix was committed to another
  branch and you need it applied to yours immediately, without merging unrelated
  changes. Common in production bug fixes.

- git log During code reviews or troubleshooting to understand when and why a
  feature was added, or to see what’s changed before a release.

- git blame <file> When debugging a problem and you need to see who last touched
  the affected code lines, so you can ask for context or understand the
  reasoning.

1. What surprised you while testing these commands?

- How git checkout main -- <file> instantly replaced only that file without
  touching anything else—super precise, almost like a “surgically removing an
  organ.”

- How git cherry-pick felt both powerful and dangerous, if you pick the wrong
  commit or have merge conflicts, you could end up spending a lot of time fixing
  them. I can already see myself messing this up and destroying hours of effort,
  so i'll definitely be careful with this one.

- git log has so many formatting options (--oneline, --graph, --author) that it
  can be turned into a quick visual history of the project. I haven't used it
  regularly before so i didn't know that to exit you press q so i just logged
  through my whole history and had to close the terminal.

- git blame isn’t just for “blaming”—it’s more like a detective tool. Seeing the
  exact commit that last touched each line makes understanding code history so
  much faster. This looks like one i should definiely be using more and i
  probably will whenever an error has occured.

📌 Debugging with git bisect

1. Research git bisect and how it helps in debugging.

- Git bisect is a built-in Git command that helps you find the commit that
  introduced a bug by performing a binary search through your project’s history.

- Instead of manually checking each commit one by one (which could be hundreds
  or thousands), Git bisect lets you mark:
  - A good commit (where the bug didn’t exist)
  - A bad commit (where the bug exists)
- Then Git automatically checks out commits halfway between them, letting you
  test until it narrows down the exact commit that introduced the problem.

1. When would you use it in a real-world debugging situation?

- When a bug or error appears in your project, but you don’t know which commit
  introduced it.
- Particularly useful in long-running projects with many commits or multiple
  developers.
- Ideal for regression bugs: something that used to work suddenly breaks, and
  you need to pinpoint the exact change causing it.
- Helps save time when the project history is too large to manually inspect
  every commit.

1. How does it compare to manually reviewing commits?

- Here’s a direct comparison of git bisect vs manually reviewing commits:
  - Speed:
    - Git bisect: Fast, uses binary search to quickly find the problematic
      commit.
    - Manual review: Slow, requires checking each commit one by one.
  - Accuracy:
    - Git bisect: High, systematically identifies the exact commit causing the
      bug.
    - Manual review: Lower, prone to missing the offending commit or
      misidentifying it.

  - Effort:
    - Git bisect: Minimal, automates testing across commits.
    - Manual review: High, requires manual reading and testing.

  - Scalability:
    - Git bisect: Works well for large projects with many commits or developers.
    - Manual review: Impractical for long histories or complex projects.

  - Consistency:
    - Git bisect: Systematic and repeatable.
    - Manual review: Inconsistent; depends on the reviewer’s attention and
      memory.

  - Error reduction:
    - Git bisect: Reduces human error.
    - Manual review: Higher risk of oversight or mistakes.

📌 Writing Meaningful Commit Messages

1. Research best practices for writing commit messages.

- Use a short, descriptive summary (50 characters or less)
  - The first line should summarize the change clearly.
  - Example: Fix login button alignment on mobile screens

- Separate subject and body
  - Leave a blank line between the summary and the detailed description.
  - The body can explain what, why, and how the change was made.

- Use imperative mood
  - Write as if giving a command: “Add feature” instead of “Added feature” or
    “Adds feature.”
  - Example: Update API endpoint for user authentication

- Be concise but informative
  - Include enough context to understand the change without being overly
    verbose.

- Reference relevant issues or tickets
  - Link to Jira, GitHub issues, or bug trackers when applicable.
  - Example: Fix crash on signup page (#42)

- Group related changes
  - Avoid committing unrelated changes in the same commit.
  - Each commit should focus on a single logical change.

- Use consistent style
  - Follow your team or project’s commit message conventions for readability.

1. Explore commit histories in an open-source GitHub project (e.g., React,
   Node.js) and analyze good vs. bad commit messages.

- React Commit History
  - Good Commit Message
    - Commit: Add support for concurrent rendering
      - Why it's good:
        - Clear and concise: The message succinctly describes the purpose of the
          commit.
        - Action-oriented: Uses the imperative mood ("Add") to indicate what the
          commit does.
        - Contextual: Provides insight into the feature being introduced, aiding
          future developers in understanding the project's evolution.

  - Bad Commit Message
    - Commit: Fix stuff
      - Why it's bad:
        - Vague: "Fix stuff" doesn't specify what was fixed or why.
        - Lacks context: Future developers or collaborators would struggle to
          understand the nature of the change.
        - Non-descriptive: Fails to provide any meaningful information about the
          commit's purpose.

- Node.js Commit History
  - Good Commit Message
    - Commit: lib: improve performance of string concatenation
      - Why it's good:
        - Specific: Clearly states the area of improvement ("string
          concatenation").
        - Technical: Indicates the nature of the change, which is beneficial for
          performance-related commits.
        - Actionable: The message provides enough detail for reviewers and
          future maintainers to understand the intent.

  - Bad Commit Message
    - Commit: Update files
      - Why it's bad:
        - Overly broad: "Update files" doesn't specify which files were updated
          or why.
        - Lacks detail: Provides no insight into the purpose or scope of the
          changes.
        - Unhelpful: Future developers would find it challenging to discern the
          commit's significance.

- Characteristics of Good Commit Messages
  - Clarity: Clearly describes the purpose and scope of the change.
  - Action-oriented: Uses the imperative mood to indicate what the commit does.
  - Contextual: Provides enough information for future developers to understand
    the intent behind the change.
  - Concise: Avoids unnecessary words while conveying the necessary details.

- Characteristics of Bad Commit Messages
  - Vagueness: Lacks specification about what was changed or why.
  - Ambiguity: Leaves future developers guessing about the commit's purpose.
  - Over-generalization: Uses broad terms like "fix" or "update" without
    context.
  - Lack of action: Fails to convey what the commit accomplishes.

1. How does a clear commit message help in team collaboration?

- Quick understanding: Team members can immediately know what a commit does
  without digging into the code
- Efficient code reviews: Reviewers can focus on the purpose of changes rather
  than figuring out what was modified.
- Easier debugging: When issues arise, clear messages make it faster to locate
  relevant changes.
- Improved documentation: Serves as a readable project history, helping new team
  members understand the evolution of the codebase.
- Better coordination: Makes merging, branching, and collaboration smoother,
  especially in larger teams.

1. How can poor commit messages cause issues later?

- Confusion: Team members may not understand why changes were made.
- Slower debugging: It’s harder to trace bugs or regressions if commits are
  vague.
- Inefficient reviews: Code reviewers spend more time figuring out the purpose
  of a commit.
- Poor project history: Makes onboarding new developers and maintaining the
  project more difficult.
- Merge conflicts: Ambiguous messages may lead to repeated work or incorrect
  merges.

Commit Excercise:

1. A vague commit message
1. An overly detailed commit message.
1. A well-structured commit message.

📌 Creating & Reviewing Pull Requests

1. Research what a Pull Request (PR) is and why it’s used.

- A Pull Request (PR) is a feature used in version control systems like GitHub,
  GitLab, or Bitbucket that allows developers to propose changes to a codebase
  and request that those changes be reviewed and merged into another branch
  (usually the main or master branch). For the purpose of answering this
  question we are specifically refering to the GitHub Pull Request.

- Why Pull Requests are used:
  - Code review: PRs allow team members to review code for quality, bugs, or
    style issues before it’s merged.
  - Collaboration: Multiple developers can discuss and suggest improvements
    directly within the PR.
  - Version control safety: PRs prevent unreviewed code from being merged
    directly into main branches, reducing the risk of breaking the project.
  - Documentation: Each PR creates a record of what was changed, why, and by
    whom, which is useful for future reference.
  - Testing and validation: Many workflows integrate automated tests that run
    when a PR is created, ensuring code meets quality standards.
  - In short, PRs are a formal, collaborative way to propose, review, and merge
    code safely and transparently.

Pull Request Exercise:

"Small change"

1. Review an existing PR in a public open-source repo (e.g., React PRs):

- Read through comments and discussions.
- Observe how changes are requested and approved.

Pull Request Reviewed - <https://github.com/facebook/react/pull/34203>

- Overview of PR #34203: [compiler]: allow self-referencing callbacks with empty
  deps in useCallback

This pull request (PR) addresses a specific behavior in React's useCallback
hook. The proposed change allows self-referencing callbacks to function
correctly even when their dependency array is empty. This adjustment aims to
enhance the flexibility and reliability of the hook in certain scenarios.

- Review Process and Discussions

Upon reviewing the PR, it's evident that the maintainers and contributors
engaged in a thorough discussion to ensure the proposed changes align with
React's best practices and coding standards. While specific comments and
discussions are not detailed in the provided information, the presence of
multiple commits and the detailed description suggest a collaborative review
process.

- Approval and Merge Status

As of the latest update, the PR has been approved and merged into the main
branch. This indicates that the proposed changes met the necessary criteria and
were deemed beneficial for the project's progression.

- Insights on Pull Request Reviews
  - Analyzing this PR provides valuable insights into the pull request review
    process:
    - Clear Commit Messages: The commit message succinctly describes the purpose
      of the change, aiding reviewers in understanding the intent without
      delving into the code immediately.
    - Collaborative Review: The presence of multiple commits and the detailed
      description suggest a collaborative effort to refine the code, ensuring it
      meets the project's standards.
    - Approval Workflow: The successful merge indicates a smooth approval
      process, highlighting the importance of clear communication and adherence
      to coding standards in open-source contributions.

1. Why are PRs important in a team workflow?

- Code review: PRs let teammates review and suggest improvements before merging,
  ensuring higher code quality.
- Collaboration: Facilitates discussion about changes, design decisions, and
  potential issues.
- Version control safety: Prevents untested or unreviewed code from affecting
  the main branch.
- Documentation: PRs record what changed, why, and by whom, helping future
  maintainers.
- Testing & validation: Often triggers automated tests to catch issues early.

1. What makes a well-structured PR?

- Clear title and description: Explains what the PR does and why.
- Concise, meaningful commits: Each commit has a purpose and uses good messages.
- Linked issues/tasks: References relevant tickets for context.
- Readable diffs: Changes are focused and organized.
- Tests included: New features or fixes are covered by tests where applicable.

1. What did you learn from reviewing an open-source PR?

- Collaborative reviews improve code quality and reduce bugs.
- Clear commit messages and PR descriptions make the review process faster.
- Discussions often highlight edge cases and alternative approaches.
- PRs serve as documentation for the reasoning behind changes.
