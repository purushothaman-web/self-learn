# Day 1 Extra Skill: Git Workflows & Merge Conflicts (For Everyone)

Welcome to Day 1 of Extra Skills! Since you are working with Git accounts today, let's master the most important team collaboration skill: **Git Branches and Merge Conflicts**.

---

## 📖 The Big Picture Concepts

### 1. Git Branching (The Multiverse 🌌)
Imagine you are writing a book. You want to try a new idea where the main character goes to space.
* You don't want to mess up the original, good story in your notebook (the **`main`** branch).
* Instead, you make a magic clone of the book and call it the **`space-feature`** branch.
* You write your space chapters here. The original book remains completely safe.
* If you like the space chapters, you combine them back into the original book (**`git merge`**). If you don't, you just throw the clone away.

### 2. What is a Merge Conflict? (The Writer's Clash ⚔️)
Imagine two writers are working on the same page of the book at the same time on their own branches:
* **Writer A** changes Line 5 to: *"The sky was blue."*
* **Writer B** changes Line 5 to: *"The sky was red."*

When they try to merge their work back into `main`, Git gets confused. It asks: *"Which one should I keep? Red or Blue?"* 
Git stops the merge, marks the file, and says: **"Merge Conflict! Please fix this manually."**

---

## 🛠️ The Anatomy of a Merge Conflict

When Git hits a conflict, it writes special conflict markers directly into the file:

```text
<<<<<<< HEAD
The sky was blue. (This is what you have on your current branch)
=======
The sky was red.  (This is what is coming from the branch you are merging)
>>>>>>> feature-branch
```

### How to Fix it:
1. Open the file in your code editor (VS Code makes conflicts look colorful).
2. Choose which line to keep (or write a new one combining both, like *"The sky was purple."*).
3. Delete the conflict markers (`<<<<<<<`, `=======`, and `>>>>>>>`).
4. Stage the file (`git add`) and commit it. The conflict is resolved!

---

## 🚀 Today's Practice Assignment

Let's simulate a real merge conflict locally in this repository so you can resolve it yourself!

### Steps to create a conflict:
1. Open your terminal in this repository.
2. Create and switch to a new branch:
   ```bash
   git checkout -b feature-blue
   ```
3. Open [.gitignore](file:///d:/Purushothaman/git/self-skill/.gitignore) and add a line at the bottom:
   `# Color is blue`
4. Stage and commit it:
   ```bash
   git add .gitignore
   git commit -m "add blue comment"
   ```
5. Go back to main:
   ```bash
   git checkout main
   ```
6. Create another branch:
   ```bash
   git checkout -b feature-red
   ```
7. Open [.gitignore](file:///d:/Purushothaman/git/self-skill/.gitignore) again. In the exact same spot (the bottom line), add:
   `# Color is red`
8. Stage and commit it:
   ```bash
   git add .gitignore
   git commit -m "add red comment"
   ```
9. Go back to main and merge the first branch:
   ```bash
   git checkout main
   git merge feature-blue
   ```
   *(This will succeed easily because there's no conflict yet)*
10. Now, try to merge the second branch:
    ```bash
    git merge feature-red
    ```
    💥 **BOOM! Git will say: "CONFLICT (content): Merge conflict in .gitignore".**
11. Open your [.gitignore](file:///d:/Purushothaman/git/self-skill/.gitignore), resolve the conflict, save it, and run:
    ```bash
    git add .gitignore
    git commit -m "resolved conflict"
    ```

Open [solutions.md](file:///d:/Purushothaman/git/self-skill/extra-skills/day-1/solutions.md) for details on how to inspect your merge history.
