# issuee_tracker_frontend
Here’s a ready-to-use **README.md** template for your Angular project:

```markdown
# Issue Tracker Frontend

This is the frontend of the Issue Tracker application built with **Angular 17**. It allows users to view, create, update, and manage issues with filters, sorting, and pagination.

---

## Features

- Display a table of issues with columns: `ID`, `Title`, `Status`, `Priority`, `Assignee`, `Updated At`.
- Create new issues with title, description, status, priority, and assignee.
- Edit existing issues.
- Delete issues.
- Search and filter issues by title, description, status, priority, and assignee.
- Sort by any column.
- Pagination support.
- Click on a row to view issue details.

---

## Project Structure

```

src/
app/
issues-list/       # List and manage issues
issue-detail/      # View issue details
issue-form/        # Create or edit issue form
assets/              # Images, icons, and styles
environments/        # Environment configurations

````

---

## Prerequisites

- Python
- Angular CLI >= 17.x
- Backend API running (FastAPI recommended)

---

## Setup

1. Clone this repository:

```bash
git clone <your-repo-url>
cd <project-folder>
````

2. Install dependencies:

```bash
npm install
```

3. Update the API endpoint in `environment.ts`:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000' // Update with your backend URL
};
```

---

## Running Locally

Start the Angular development server:

```bash
ng serve
```

Open your browser at `http://localhost:4200/`.

---

## Build

Build the application for production:

```bash
ng build --prod
```

The output will be in the `dist/` folder.

---

## Notes

* Make sure the backend API is running and accessible before using the frontend.
* The frontend communicates with the backend using REST APIs.
* Ensure `FormsModule` and `HttpClientModule` are imported in `app.module.ts` for forms and HTTP requests.

---

## Dependencies

* Angular
* RxJS
* Angular Forms
* Angular HTTPClient

---

