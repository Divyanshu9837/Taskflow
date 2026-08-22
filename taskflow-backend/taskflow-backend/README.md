# TaskFlow Backend

A Task Management REST API built with **Java, Spring Boot, and MongoDB**, following a clean Controller → Service → Repository architecture with JWT-based authentication.

## Tech Stack
- Java 17
- Spring Boot 3.3.4
- Spring Data MongoDB
- Spring Security + JWT (jjwt)
- Lombok
- JUnit 5 + Mockito (unit tests)
- Maven

## Project Structure
```
src/main/java/com/taskflow/
├── TaskFlowApplication.java   # entry point
├── config/                    # security & CORS configuration
├── controller/                # REST controllers (AuthController, TaskController)
├── service/                   # business logic (AuthService, TaskService)
├── repository/                # MongoRepository interfaces
├── model/                     # MongoDB @Document entities (User, Task)
├── dto/                       # request/response objects
├── security/                  # JwtUtil, JwtAuthFilter
└── exception/                 # custom exceptions + global handler
```

## Prerequisites
- Java 17+ installed (`java -version`)
- Maven installed (`mvn -version`)
- MongoDB running locally OR a free MongoDB Atlas cluster

## Setup

### 1. Install MongoDB (choose one)
**Option A – Local MongoDB**
Install MongoDB Community Edition and run it on the default port `27017`.

**Option B – MongoDB Atlas (cloud, free tier)**
1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Get your connection string
3. Update `src/main/resources/application.properties`:
   ```
   spring.data.mongodb.uri=mongodb+srv://<username>:<password>@<cluster-url>/taskflow?retryWrites=true&w=majority
   ```

### 2. Run the application
```bash
mvn spring-boot:run
```
The API will start on `http://localhost:8080`

### 3. Run tests
```bash
mvn test
```

## API Endpoints

### Auth (public)
| Method | Endpoint             | Description         |
|--------|-----------------------|----------------------|
| POST   | `/api/auth/register`  | Register new user   |
| POST   | `/api/auth/login`     | Login, returns JWT   |

**Register example:**
```json
POST /api/auth/register
{
  "name": "Kriti Jaiswal",
  "email": "kriti@example.com",
  "password": "secret123"
}
```

**Login example:**
```json
POST /api/auth/login
{
  "email": "kriti@example.com",
  "password": "secret123"
}
```
Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "userId": "66f...",
  "name": "Kriti Jaiswal",
  "email": "kriti@example.com"
}
```

### Tasks (require `Authorization: Bearer <token>` header)
| Method | Endpoint                             | Description                  |
|--------|----------------------------------------|-------------------------------|
| POST   | `/api/tasks`                          | Create task                  |
| GET    | `/api/tasks`                          | Get all tasks for user       |
| GET    | `/api/tasks/{id}`                     | Get task by id               |
| PUT    | `/api/tasks/{id}`                     | Update task                  |
| DELETE | `/api/tasks/{id}`                     | Delete task                  |
| GET    | `/api/tasks/filter/status/{status}`   | Filter by status (TODO/IN_PROGRESS/DONE) |
| GET    | `/api/tasks/filter/priority/{priority}` | Filter by priority (LOW/MEDIUM/HIGH) |
| GET    | `/api/tasks/search?keyword=xyz`       | Search tasks by title        |

**Create task example:**
```json
POST /api/tasks
Authorization: Bearer <token>
{
  "title": "Finish resume",
  "description": "Add TaskFlow project",
  "priority": "HIGH",
  "status": "TODO",
  "dueDate": "2026-08-25"
}
```

## Notes
- Passwords are hashed using BCrypt before storing.
- Each task is tied to the `userId` extracted from the JWT — users can only access their own tasks.
- CORS is pre-configured for `http://localhost:5173` and `http://localhost:3000` (adjust in `SecurityConfig.java` to match your frontend's URL, e.g. your Lovable-generated frontend).
- Change `jwt.secret` in `application.properties` before deploying to production.

## Connecting a Frontend (e.g. Lovable / React)
Point your frontend's API base URL to `http://localhost:8080/api`. Store the JWT token returned from login/register (e.g. in memory or localStorage) and send it as `Authorization: Bearer <token>` on every request to `/api/tasks/**`.
