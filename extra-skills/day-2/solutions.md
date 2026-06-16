# Day 2 Extra Skill: Solutions & Concept Review

Use this check sheet to review common Docker conceptual questions asked in junior/intermediate developer interviews.

---

## 🧩 Question 1: What is the difference between an Image and a Container?
* **Answer:** An **Image** is a read-only blueprint (a static file) containing the application code, runtime libraries, environment settings, and system tools. A **Container** is the live, active running instance of that image. You can run multiple identical containers from a single image.

---

## 🧩 Question 2: In a Dockerfile, what is the difference between `RUN` and `CMD`?
* **Answer:**
  * **`RUN`** is executed **during the build process** of the image. It is used to install packages, compile code, or configure settings inside the image layers (e.g. `RUN npm install`).
  * **`CMD`** is executed **when the container starts running**. It defines the default startup command for the container (e.g. `CMD ["node", "server.js"]`). A Dockerfile should only have one active `CMD`.

---

## 🧩 Question 3: Why do we write `EXPOSE 5000` but also need `-p 5000:5000` when running?
* **Answer:** 
  * `EXPOSE 5000` is **documentation**. It tells developers (and Docker) that the app inside the container listens to port 5000. It does not open the port to the host computer.
  * `-p 5000:5000` is the actual **port mapping** action. It connects port 5000 of your local host computer to port 5000 inside the isolated container, making the app reachable from your browser (at `http://localhost:5000`).

---

## 💡 Key Interview Takeaway
If an interviewer asks: **"Why would a team choose to use Docker?"**
You can answer:
> "Docker eliminates the 'it works on my machine' problem. By containerizing our applications, we guarantee that the code, dependencies, and environment configurations are identical across every developer's machine, staging environments, and production servers, which simplifies deployment and scaling."
