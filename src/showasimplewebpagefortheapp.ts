```typescript
import express, { Request, Response } from 'express';

/**
 * @class AppController
 */
class AppController {
  /**
   * @public
   * @static
   * @async
   * @function showHomePage
   * @description Function to show a simple webpage for the app
   * @param {Request} req - Express framework request object
   * @param {Response} res - Express framework response object
   * @returns {Promise<Response>} - Express framework response object
   */
  public static async showHomePage(req: Request, res: Response): Promise<Response> {
    try {
      // Render the home page view
      return res.status(200).render('home');
    } catch (error) {
      // Log the error and return a server error response
      console.error(`Error occurred while rendering home page: ${error}`);
      return res.status(500).json({
        status: 'error',
        message: 'An error occurred while rendering the home page. Please try again later.',
      });
    }
  }
}

// Create a new express application instance
const app: express.Application = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Define the home page route
app.get('/', AppController.showHomePage);

// Start the server
app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
```
Note: This code assumes that you have a view named 'home' in your views directory.