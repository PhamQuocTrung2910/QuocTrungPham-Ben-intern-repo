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


<<<<<<< HEAD
"This is the merge conflict - 1"
=======
"This is the merge conflict - 2"
>>>>>>> MergeConflict



3. Use your Git desktop client to resolve the conflict.

4. Write about your experience in git_understanding.md:
- What caused the conflict?



- How did you resolve it?



- What did you learn?



Commit and push your changes to GitHub.