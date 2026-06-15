# Day 1 Extra Skill: Solutions & Verification

Here is how you can verify your merge conflict resolution and view your Git history.

---

## 🔍 How to Verify the Resolution
After resolving the conflict, you can run:
```bash
git status
```
It should say:
```text
On branch main
nothing to commit, working tree clean
```
This means the merge is successfully completed and the conflict is resolved!

---

## 📊 Viewing the Multiverse History
To see how the branches split and merged in your terminal, run this visual command:

```bash
git log --oneline --graph --all
```

You should see a graph output that looks like this:
```text
*   d4a2b1c (HEAD -> main) resolved conflict
|\  
| * 7b8a9c0 (feature-red) add red comment
* | 3e2d1c0 (feature-blue) add blue comment
|/  
* 3f0e372 Initial commit
```

### What this graph shows:
1. `Initial commit` is the base root.
2. The lines split into two paths: one for `feature-blue` and one for `feature-red`.
3. The lines merge back together at `resolved conflict` on the `main` branch.

---

## 💡 Key Interview Takeaway
If an interviewer asks: **"How do you handle merge conflicts?"**
You can answer:
> "When Git detects a merge conflict, I open the affected files to examine the conflict markers. I compare the changes from our current branch (`HEAD`) against the incoming branch, coordinate with my teammate if necessary to understand the business logic, choose the correct lines (or merge them logically), delete the conflict markers, stage the resolved files, and make a merge commit."
