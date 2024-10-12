# Writora AI
Writora AI is a powerful tool that transforms your video or audio content into a blog post in seconds, powered by cutting-edge AI technology. It’s designed to streamline your content creation process and generate high-quality blog posts effortlessly.

![thumbnails](https://github.com/user-attachments/assets/5b796811-502e-463e-adc0-b2fd494378f1)

## Features

- 🚀 AI-Powered Conversion: Convert audio or video into a blog post within seconds using AI.
- 🔐 Authentication: Secure user authentication via Clerk
- 🔐 Authentication with Clerk (Passkeys, Github, and Google Sign-in)
- 📝 Blog Post Generation: Automatically generate blog posts based on audio or video transcriptions.
- 💳 Payment Integration: Fully integrated with Stripe for handling payments, custom pricing, and subscription management.
- 💾 Database Management: Efficient data management with NeonDb.
- 📤 File Uploads: Seamless file uploads using UploadThing.
- 🎙️ Audio and video file processing (up to 25MB)
- 🖋️ Markdown Editor: Edit your blog posts with a built-in Markdown editor.
- 💅 TailwindCSS for styling
- 🔒 Secure file handling and processing
- 🪝 Webhook implementation for Stripe events
- 🔍 SEO-friendly blog post generation

## Built with

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Magic UI](https://magicui.design)
- [Clerk](https://clerk.com/)
- [Stripe](https://stripe.com/)
- [Neon](https://neon.tech/)
- [Upload things](https://uploadthing.com/)
- [Open AI](https://openai.com/)

### Tools
- [Biome](https://biomejs.dev/)
- [Husky](https://typicode.github.io/husky/)

## Feature Requests

To request a feature open a [GitHub issue](https://github.com/anayatkhan1/Writora-AI/issues).

 ## Contribution Guidelines

Thank you for considering contributing to our AI-powered blog generator project! Please follow these guidelines to ensure smooth collaboration:

1. Fork the repository to your GitHub account.
2. Clone the forked repository to your local machine:

3. Create a new branch for your changes:

    ```bash
    git checkout -b feature/your-feature-name
    ```

4. Make your changes and ensure they adhere to the project's coding style and guidelines.
5. Test your changes thoroughly to avoid introducing bugs.
6. Commit your changes with clear and descriptive commit messages:

    ```bash
    git commit -m 'feat: Add your descriptive commit message'
    ```
    ``Note:`` Before committing changes, ensure you include one of these tags in your commit message: ```feat, fix, wip, patch, build```.

7. Push your changes to your forked repository:

    ```bash
    git push origin feature/your-feature-name
    ```

8. Open a pull request against the `main` branch of the original repository.
9. Provide a clear and concise description of your changes in the pull request, along with any relevant information.
10. Ensure your pull request passes all checks and tests before requesting a review.

### Setting Up Environment Variables

To run the project locally, you need to set up the following environment variables:

Clerk Authentication
- ``NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY``: Publishable key for integrating Clerk authentication.
- ``CLERK_SECRET_KEY``: Secret key for Clerk authentication.

Stripe Payments
- ``STRIPE_SECRET_KEY``: Secret key for authenticating with Stripe’s API for payment processing.
- ``STRIPE_WEBHOOK_SECRET``: Webhook secret for verifying that events sent to your endpoint by Stripe are authentic.

NeonDB Database
- ``DATABASE_URL``: The connection string for your NeonDB database, used by the application to interact with the database.

UploadThing
- ``UPLOADTHING_SECRET``: Secret key for authenticating with UploadThing, used for securely handling file uploads.
- ``UPLOADTHING_APP_ID``: Application ID for identifying your app with UploadThing services.

OpenAI API
- ``OPENAI_API_KEY``: API key for accessing OpenAI’s models, enabling AI-driven functionalities such as text generation.

You can set these environment variables by creating a `.env.local or .env` file in the root directory of the project and adding the variables with their respective values:

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/anayatkhan1/Writora-AI/blob/main/LICENSE) file for details.

---

Built with ❤️ by [Anayat](https://anayat.xyz)
