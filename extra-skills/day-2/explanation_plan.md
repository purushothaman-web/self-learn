# Day 2 Extra Skill: Docker Basics (For Everyone)

Welcome to Day 2 of Extra Skills! Today, we are learning about **Docker**. This is the standard tool modern teams use to run and deploy software reliably.

---

## 📖 The Big Picture Concepts

### 1. The Shipping Container Analogy 🚢
Imagine you are shipping various goods across the ocean: a piano, 100 loose apples, a stack of glass plates, and a car.
* **Without shipping containers:** You have to load each item directly onto the ship's deck. The apples roll around, the piano gets wet, and the glass breaks. It's a mess, and every cargo ship needs a different loading method.
* **With shipping containers:** You pack everything into standard metal boxes (containers). The cargo ship doesn't care what is inside. It just loads the metal box. Any ship crane in the world can load it.

**In Software:** Instead of shipping loose files and hoping the server has the right version of Node, Python, or SQL installed, you pack your code and its dependencies into a **Docker Container**. This container runs exactly the same way on your laptop, a staging server, or AWS cloud.

---

## 🏗️ Virtual Machines (VMs) vs. Docker Containers

Many developers ask: *"How is Docker different from a Virtual Machine?"*

* **Virtual Machine (A whole new house 🏠):** A VM bundles your app, the dependencies, and a **complete guest operating system (OS)**. This makes VMs very heavy (gigabytes in size), slow to boot (minutes), and demanding on computer hardware.
* **Docker Container (An apartment room 🏢):** A container bundles only your app and its dependencies. It **shares the host operating system kernel**. This makes containers extremely lightweight (megabytes in size) and instant to boot (milliseconds).

---

## 🔑 Key Docker Terms

1. **Dockerfile:** A text file containing a list of instructions to build your container. It's like a **recipe**.
2. **Image:** A read-only template built from the Dockerfile. It's like the **unopened cake mix box**.
3. **Container:** A running instance of an Image. It's the **baked, ready-to-eat cake**.
4. **Registry (Docker Hub):** A cloud library where developers share images. It's like **Github but for images**.

---

## 🛠️ Typical Dockerfile Structure

Here is a simple Dockerfile for a Node.js Express application (similar to our dashboard!):

```dockerfile
# 1. Start with a pre-configured Node image from Docker Hub
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy dependency lists and install them
COPY package*.json ./
RUN npm install

# 4. Copy the rest of the application files
COPY . .

# 5. Specify the port the container will listen to
EXPOSE 5000

# 6. Command to start the application
CMD ["node", "server.js"]
```

---

## 🚀 Basic Docker Commands

| Command | Action |
| :--- | :--- |
| **`docker build -t my-app .`** | Build a Docker Image named `my-app` using the recipe in the current folder (`.`). |
| **`docker run -p 5000:5000 my-app`** | Start a container from the `my-app` image and map port 5000 of your computer to port 5000 of the container. |
| **`docker ps`** | List all currently running containers (like Task Manager). |
| **`docker stop <container_id>`** | Stop a running container. |

---

## 🚀 Today's Practice Assignment
Open [solutions.md](file:///d:/Purushothaman/git/self-skill/extra-skills/day-2/solutions.md) to test your conceptual knowledge with common interview questions.
