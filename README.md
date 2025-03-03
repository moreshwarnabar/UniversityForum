# University Forum

This project is a full-stack web application designed as a university forum, inspired by platforms like Quora. It allows students, faculty, alumni, and administrators to ask questions, provide answers, and participate in discussions relevant to the university community.

## Features

*   **User Authentication and Authorization:** Secure login and registration system with different roles (Admin, Student, Faculty, Alumni) and appropriate access control.
*   **Question and Answer Management:**
    *   Users can ask questions categorized by relevant topics.
    *   Users can post answers to questions.
    *   Upvoting/Downvoting answers. (Future Enhancement)
    *   Reporting inappropriate answers for moderation.
*   **Category Management:** Admins can create and manage categories for organizing questions.
*   **User Management:** Admins can manage user accounts, including blocking/unblocking users.
*   **Profile Management:** Users can view and edit their profile information.
*   **Subscription to Categories:** Users can subscribe to categories to stay updated on relevant discussions.
*   **Search Functionality:** Users can search for questions within specific categories.
*   **Admin Reporting:** Admins can view and moderate reported answers.

## Technologies

*   **Backend:**
    *   Java
    *   Spring Boot
    *   Spring Data JPA
    *   MySQL
    *   Maven
    *   Lombok
*   **Frontend:**
    *   React
    *   Redux
    *   React Router
    *   Bootstrap
    *   Axios

## Setup Instructions

To run this project locally, follow these steps:

1.  **Clone the Repository:**

    ```bash
    git clone <repository_url>
    ```

2.  **Backend Setup:**

    *   Navigate to the `QuoraClone` directory.
    *   Ensure you have MySQL installed and configured with a database named `university_forum`. Update the database credentials in `src/main/resources/application.properties` if needed.
    *   Run the Spring Boot application using Maven:

        ```bash
        ./mvnw spring-boot:run
        ```

3.  **Frontend Setup:**

    *   Navigate to the `frontend` directory.
    *   Install the dependencies:

        ```bash
        npm install
        ```

    *   Start the React development server:

        ```bash
        npm start
        ```

4.  **Access the Application:**

    *   Open your browser and go to `http://localhost:3000`.

## API Endpoints
The Spring Boot application exposes RESTful APIs following REST conventions. Refer to the backend code or Swagger documentation to access list of endpoints.

## Redux State Management
This project uses Redux as the frontend state management system. You can consult the Redux dev tool to debug or inspect the state of the application.

## Contributing

Contributions are welcome! Please feel free to submit pull requests with bug fixes, new features, or improvements to the documentation.

## License

This project is licensed under the [MIT License](LICENSE).

## Team

*   Moreshwar Nabar
*   Nikhil More

## Contact

For any questions or inquiries, please contact moreshwarnabar@gmail.com
