Merge Conflicts & Conflict Resolution

1. Research what causes merge conflicts in Git.

Merge conflicts happen when Git cannot automatically reconcile differences between two branches you’re trying to merge. This usually occurs when changes affect the same lines of code or nearby sections in the same file, or when there are incompatible changes in the project history.

Causes:
- Concurrent edits to the same lines: If two people edit the same line(s) in a file differently, Git doesn’t know which change to keep.
- Overlapping changes in nearby lines: Even if edits are not on the exact same line, if they’re close enough, Git might not be able to merge them cleanly.
- File deletions and modifications: If one branch deletes a file while another modifies it, Git will flag a conflict.
- Different changes to the same file metadata: Changes to file permissions or renaming can also cause conflicts.
- Merging unrelated histories: When trying to merge two repos or branches without a common ancestor, Git can’t automatically combine the histories.

2. Create a merge conflict in your test repo by:
- Creating a branch and editing a file.
- Switching back to main, making a conflicting edit in the same file, and committing it.
- Merging the branch back into main.


"This is the merge conflict - 1"
"This is the merge conflict - 2"



3. Use your Git desktop client to resolve the conflict.

4. Write about your experience in git_understanding.md:
- What caused the conflict?

A change in the same line of an md file

- How did you resolve it?

By letting the changes on both branch go through

- What did you learn?

Merge Conflicts are easy to resolve if you are able to understand what's causing the conflict and what changes are actually needed








Staging vs Committing

- Git Exercise
1. Modify a file and try the following:
2. Stage it but don’t commit (git add <file> or equivalent in your client).
3. Check the status (git status).
4. Unstage the file (git reset HEAD <file> or equivalent).
5. Commit the file and observe the difference.

Summary:
1. What is the difference between staging and committing?

- Staging means selecting specific changes you want to include in your next commit. The changes are placed into Git’s staging area, but they aren’t yet saved to the repository’s history.
- Committing means taking everything currently staged and creating a permanent snapshot in the repository’s history with a commit message.

2. Why does Git separate these two steps?

- Git separates staging and committing so you can:
  - Review and fine-tune exactly which changes go into a commit.
  - Group related changes into one commit and exclude unrelated changes.
  - Avoid committing incomplete or experimental edits accidentally.

3. When would you want to stage changes without committing?

- You might stage without committing when:
  - You want to prepare part of your work for a clean commit but are still making more edits.
  - You need to group related file changes together before committing.
  - You’re working on a large feature and want to commit it in logical chunks later.





Branching & Team Collaboration

1. Why is pushing directly to main problematic?
- It can introduce bugs directly into the live, production-ready code without review.
- It bypasses collaboration checks, meaning mistakes or incomplete features could affect everyone.
- It makes tracking changes harder since all edits pile into one branch without clear feature separation.

2. How do branches help with reviewing code?

- Branches isolate changes so you can develop features, fixes, or experiments without touching main.
- They make it easier to open pull requests (or merge requests) for teammates to review before merging.
- They allow discussions, suggestions, and testing to happen before code reaches the main branch.

3. What happens if two people edit the same file on different branches?

- When the branches are later merged, Git will try to combine the changes automatically.
- If the edits affect the same lines or overlapping parts, Git can’t decide which version to keep — this creates a merge conflict.
- The conflict must be resolved manually by choosing, combining, or editing the changes.

